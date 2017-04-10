import React, { PropTypes } from 'react';
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
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import shortid from 'shortid';
import cx from 'classnames';


const {alterBtnStyle} =  customStyles

class Category extends React.Component {

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

    componentWillMount() {
        let { getCat, getCats } = this.props;
        let query = {
            cat: this.state.cat

        }  
        getCats();
        getCat(query);
    }

    componentWillReceiveProps(nextProps) {

        if(this.state.cat !== nextProps.route.params.cat){
            this.setState({
                loading: false,
                finished: false,
                stepIndex: 0
            });
        }

        if(this.state.cat !==  nextProps.route.params.cat){
             this.state.cat = nextProps.route.params.cat
        }

        let sortedQuiz = {}, quantityOfCat = 0;
        
        if (nextProps.quizs) {
            quantityOfCat = this.getQuantityOfCat()
            sortedQuiz = this.filterQuizByCat(nextProps.quizs, this.state.cat)
        }

        if(!this.props.quizLoading ){
            if(Object.entries(sortedQuiz).length < quantityOfCat ){
                let { getCat } = this.props;
                let lastKey = '-';
                Object.entries( nextProps.quizs ).map(q => lastKey = q[0])
                let query = {
                    cat: this.state.cat,
                    startFrom:  lastKey
                }
                getCat(query);
            }else{

                this.setState({
                    quiz: sortedQuiz
                })
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){

        if( nextState === this.state ) {
            return false;
        }
        return true;
    }

    componentWillUmount(){

        this.state = {
            ...this.state,
            loading: false,
            finished: false,
            stepIndex: 0
        }
        
    }

    getQuantityOfCat(){
        let quantityOfCat = 0;
        if(Object.entries(this.props.cats).length == 0){  // get Categoties info 
                let {getCats} = this.props;
                getCats();
            }else{
                 Object.entries(this.props.cats).map(c => { if( c[0] == this.state.cat) quantityOfCat =  c[1]['quantity']});
            }  
        return quantityOfCat;
    }

    filterQuizByCat(quizs, cat){

        let realIndexs = [], iter = 0, sortedQuiz = {};
        Object.values(quizs).map( (q, index) => {if (q.category === cat) realIndexs.push(index) }); // get category` carts from store
        for (let q in quizs) {
            if (quizs.hasOwnProperty(q) && iter++ == realIndexs[0]) {
                let innerObj = quizs[q];
                sortedQuiz[q] = innerObj;
                realIndexs.shift();
            }
        }
        return sortedQuiz

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

    requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
    transitionEndPromise = elem => new Promise(resolve => {
        setTimeout(_=>{elem.addEventListener('transitionend', resolve , {once: true})}, 1000); // Lag of applying CSS
    })
    transitionEndPromiseSetTimeout = (elem, time) => new Promise(resolve => {
        elem.addEventListener('transitionend', setTimeout(resolve, time) , {once: true})
    })
  
    dummyAsync = (cb) => {

        let requestAnimationFramePromise = this.requestAnimationFramePromise,
            quizRef                      = this.quizRef,
            transitionEndPromise         = this.transitionEndPromise;

        this.setState({ loading: true }, () => {
            // this.fake.style.transition = `transform 2s ease-in-out`; 
            // this.fake.style.transform = `translateX(0px)`;
            // this.norm.style.transform = `translateX(1000px)`;
            // requestAnimationFramePromise()
            //     .then( _ => requestAnimationFramePromise())
            //     .then( _ => {
            //         cb();
            //         this.fake.style.transform = `translateX(-1000px) scale(.4)`;
            //         this.norm.style.transition = `transform 2s ease-in-out`;
            //         this.norm.style.transform = `translateX(0)`;
            //         return this.transitionEndPromise(quizRef)
            //     })
             cb();
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

    getQuizByIndex(index) {

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
                <Cart  quiz={param} />
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
                <div className={'quiz-pagination__group__btn'} >
                    
                    <button className={cx('quiz-btn','quiz-pagination__btn')} onTouchTap={this.handlePrev}>Back</button>
                    <button className={cx('quiz-btn','quiz-pagination__btn')} onTouchTap={this.handleNext}>{stepIndex === 2 ? 'Finish' : 'Next'}</button>
                 
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

            <Layout className={"quiz-container"}>
                    {
                        (Object.entries(this.state.quiz).length > 0 )
                            ?
                            <div className={'quiz'} ref={node => (this.quizRef = node)}>
                                <div  className={'quiz-stepper'} >
                                    {Array.from(Array(stepIndex+1).keys()).map(i=>{
                                        return (
                                            <div className={'quiz-stepper__in active'} key={shortid.generate()}></div>
                                        )
                                    })}
                                    {Array.from(Array(this.getQuantityOfCat()-stepIndex).keys()).map(i=>{
                                        return(
                                             <div className={'quiz-stepper__in'} key={shortid.generate()}> </div>
                                        )
                                    })}
                                </div>
                                {this.renderContent()} 
                            </div>
                            :
                            <div className="preloading__cart">
                                <p>Quiz Is Loading!!!</p>
                                <p>Pick That You Like More</p>
                            </div>
                    }
              
            </Layout>
        );
    }


}

Category.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

Category.propTypes = {
    getCat: PropTypes.func.isRequired,
    getCats: PropTypes.func.isRequired,
    quizs: PropTypes.array.isRequired,
    cats: PropTypes.object.isRequired, 
    quizLoading: PropTypes.bool.isRequired
};

function mapStatetoProps( state, props ) { 

    let realIndexs = [], sortedQuiz = [], iter = 0;
    Object.values(state.quiz).map( (q, index) => {if (q.category === props.route.params.cat) realIndexs.push(index) }); // get category` carts from store
    for (let q in state.quiz) {
        if (state.quiz.hasOwnProperty(q) && iter++ == realIndexs[0]) {
            let innerObj = state.quiz[q];
            sortedQuiz[q] = innerObj;
            realIndexs.shift();
        }
    }
    

    return {
            quizs: sortedQuiz,
            cats: state.cats,
            quizLoading: state.quizLoading
    }
}

export default connect(
        mapStatetoProps,
        { getCat, getCats }
    )(Category)

