import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import Link from './../../components/Link'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { connect } from 'react-redux'
import { getQuizByID, clearStore, getQuizAll } from './../actionCreators'
import myTheme, { customStyles } from "./../theme";

 
class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.route.params.id,
            quiz: null
        }
        
    }
    componentWillReceiveProps(nextProps){
        this.state = {
            id: nextProps.route.params.id,
            quiz: nextProps.quizs[`${nextProps.route.params.id}`] || null
        }
        getQuizByID(this.state.quiz.next);
        getQuizByID(this.state.quiz.prev);
    }

    getNextAndPrevIDs(id) { 
        let {quizs, getQuizAll, getQuizByID} = this.props;
        if ( !Object.entries(quizs).length ) { return {prev: null, next: null}};
     
        let Ids;
        Object.entries(quizs).map(q=>q[0]).reduce((prev, cur, ind, arr) => { 
            if(prev === id)  {Ids = { prev: null , next: arr[ind] || null } }
            if(cur && cur === id) { Ids = { prev: arr[ind-1] || null , next: arr[ind+1] || null } 

        }});
        return Ids || {prev: null, next: null}
    }

    componentWillUpdate(){
        let {getQuizByID} = this.props;
        if( !this.state.quiz )
            getQuizByID(this.state.id);
    }

    componentWillMount() {
        let {getQuizByID} = this.props;
        getQuizByID(this.state.id);
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

    render() {
        let that = this;
        let color = this.getRandomColor();
        let {prev, next} = this.getNextAndPrevIDs(that.state.id);
        const style = {
            marginRight: 20,
        };
        return (

            <Layout  className={"quiz-container"}>
                <div style={{background: color}}>{color}</div>
                {
                    (this.state.quiz)
                        ?
                        <div className={'quiz'}>
                            <Cart quiz={{
                                question: this.state.quiz['question'],
                                q1: Object.values(this.state.quiz['answers'])[0],
                                q2: Object.values(this.state.quiz['answers'])[1],
                                cartId: this.props.route.params.id,
                                leftCartUID: Object.entries(that.state.quiz['answers'])[0][0],
                                rightCartUID: Object.entries(that.state.quiz['answers'])[1][0]
                            }} />
                            {(prev)?<div className={'quiz-btn__prev'}><Link to={`/quiz/${prev}`}> <FloatingActionButton 
                                backgroundColor="hsla(0,0%,100%,.5)">
                                <FontIcon color="#fff"  className="material-icons" >keyboard_arrow_left</FontIcon>
                                </FloatingActionButton></Link></div>
                                :""}
                            {(next)?<div className={'quiz-btn__next'}><Link to={`/quiz/${next}`}> <FloatingActionButton 
                                backgroundColor="hsla(0,0%,100%,.5)" >
                                <FontIcon color="#fff"  className="material-icons"  >keyboard_arrow_right</FontIcon>
                                </FloatingActionButton></Link></div>
                                :""}
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
Quiz.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};  

export default connect(
    state => ({quizs: state.quiz}),
    {getQuizByID, clearStore, getQuizAll}
)(Quiz)