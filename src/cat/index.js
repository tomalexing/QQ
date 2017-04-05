import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import Link from './../../components/Link'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { connect } from 'react-redux'
import { getQuizByID, clearStore, getCat, getCats } from './../actionCreators'
import myTheme, { customStyles } from "./../theme";
import onlyUpdateForKeys from "recompose/onlyUpdateForKeys";

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';


class Categoty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: this.props.route.params.cat,
            quiz: {},
            loading: false,
            finished: false,
            stepIndex: 0,
        }

    }


    componentWillReceiveProps(nextProps) {

        if(this.state.cat !== nextProps.route.params.cat){
            this.state = {
                ...this.state,
                loading: false,
                finished: false,
                stepIndex: 0,
            }
        }

        this.state.cat =  nextProps.route.params.cat || 'default';

        let realIndexs = [], iter = 0, sortedQuiz = {}, quantityOfCat = 0;
        

        if (nextProps.quizs) {
            if(Object.entries(this.props.cats).length == 0){
                let {getCats} = this.props;
                getCats();
            }else{
                quantityOfCat = this.getQuantityOfCat();
            }
           
              
            Object.values(nextProps.quizs).map( (q, index) => {if (q.category === this.state.cat) realIndexs.push(index) });
            for (let q in nextProps.quizs) {
                if (nextProps.quizs.hasOwnProperty(q) && iter++ == realIndexs[0]) {
                    let innerObj = nextProps.quizs[q];
                    sortedQuiz[q] = innerObj;
                    realIndexs.shift();
                }
            }
        }
        if(Object.entries(sortedQuiz).length < quantityOfCat){
            let { getCat } = this.props;
            let query = {
                cat: this.state.cat
            }
            getCat(query);
        }else{
            this.setState({
                quiz: sortedQuiz
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        return ( true )
    }
    
    getQuantityOfCat(){
        let quantityOfCat = 0;
        Object.entries(this.props.cats).map(c => { if( c[0] == this.state.cat) quantityOfCat =  c[1]['quantity']});
        return quantityOfCat;
    }

    componentWillUmount(){

        this.state = {
            ...this.state,
            loading: false,
            finished: false,
            stepIndex: 0
        }
        
    }
    componentWillMount() {
        let { getCat, getCats } = this.props;
        let query = {
            cat: this.state.cat

        }  
        getCats();
        getCat(query);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(myTheme) }
    }

    dummyAsync = (cb) => {
        this.setState({ loading: true }, () => {
            this.asyncTimer = setTimeout(cb, 0);
        });
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= this.getQuantityOfCat() - 1,
            }));
        }
    }

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    }

    getQuizByIndex(index){

        let indexedQuizId = Object.entries( this.state.quiz )[index][0];
        return { id: indexedQuizId, stepperQuiz: this.state.quiz[indexedQuizId] }

    }
    
    getStepContent(stepIndex) {

        let {id, stepperQuiz} =  this.getQuizByIndex(stepIndex);

        const param = {
                    question: stepperQuiz['question'],
                    q1: Object.values(stepperQuiz['answers'])[0],
                    q2: Object.values(stepperQuiz['answers'])[1],
                    cartId: id,
                    leftCartUID: Object.entries(stepperQuiz['answers'])[0][0],
                    rightCartUID: Object.entries(stepperQuiz['answers'])[1][0]
                }
        return (
                <Cart quiz={param} />
            );
        
    }

    renderContent() {
        const { finished, stepIndex } = this.state;
        const contentStyle = { margin: '0 16px', overflow: 'hidden' };

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({ stepIndex: 0, finished: false });
                            }}
                         >
                            Click here
                        </a> to reset the example.
                    </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{ marginTop: 24, marginBottom: 12 }}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onTouchTap={this.handlePrev}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        primary={true}
                        onTouchTap={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    
    render() {
        let that = this;
        let color = this.getRandomColor();
        const style = {
            marginRight: 20,
        };
        const { loading, stepIndex } = this.state;
        return (

            <Layout>
                <div className={"quiz-container"}>
                    <div style={{ background: color }}>{color}</div>
                    {
                        (Object.entries(this.state.quiz).length > 0 )
                            ?
                            <div className={'quiz'}>
                                <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
                                    <Stepper activeStep={stepIndex}>
                                        {Array.from(Array(this.getQuantityOfCat()).keys()).map(i=>{
                                            return (
                                                 <Step key={i}>
                                                    <StepLabel> </StepLabel>
                                                </Step>
                                            )
                                        })}
                                         <Step >
                                            <StepLabel> </StepLabel>
                                        </Step>
                                    </Stepper>
                                    {this.renderContent()}
                                </div> 
                            </div>
                            :
                            <div className="preloading__cart">
                                <p>Quiz Is Loading!!!</p>
                                <p>Pick That You Like More</p>
                            </div>
                    }
                </div>
            </Layout>
        );
    }


}
Categoty.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(
        state => ({ 
            quizs: state.quiz,
            cats: state.cats
         }),
        { getQuizByID, clearStore, getCat, getCats }
    )(Categoty)

