import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import firebase from "firebase"
import {getQuizByID } from "./../actionCreators"
import store from "./../store"
import { connect } from 'react-redux'

class Quiz extends React.Component {
    get db() {
         return firebase.database()
    }

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.route.params.id,
            stateId: null,
            quiz: null
        }
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.route.params.id)
        if(typeof this.state.stateId && nextProps.route.params.id != this.state.stateId ){
            this.state.id = nextProps.route.params.id;
        }
        return typeof this.state.stateId == null || nextProps.route.params.id != this.state.stateId
    }   

    renewQuiz(){
        this.db.ref(`quiz/${this.state.id}`).once("value").then((quiz) => {
            return quiz.val();
        }).then((quiz, err) => {
            if (quiz) {
                console.log('step4')
                this.setState({ quiz: quiz, stateId: this.props.route.params.id });
            }
            if (err) console.log(err);
        })
    }

    componentWillUpdate(){
        let { getQuizByID } = this.props;
        
         console.log('componentWillUpdate $1 -- $2 ',this.state.id, this.props.route.params.id)
    }

    componentWillMount() {
        let { getQuizByID } = this.props;
        getQuizByID(this.state.id)
        console.log('componentWillMount $1 state -- $2 props',this.state, this.props)
        
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    render() {
        let that = this;
        let color = this.getRandomColor();
        let loaded = this.props.quiz && this.props.quiz[`${this.props.route.params.id}`]
        return (

            <Layout>
                <div style={{background: color}}>{color}</div>
                {
                    (loaded)
                        ?
                        <Cart quiz={{
                            question: this.props.quiz[`${this.props.route.params.id}`]['question'],
                            q1: Object.values(this.props.quiz[`${this.props.route.params.id}`]['answers'])[0],
                            q2: Object.values(this.props.quiz[`${this.props.route.params.id}`]['answers'])[1],
                            cartId: this.props.route.params.id,
                            leftCartUID: Object.entries(this.props.quiz[`${this.props.route.params.id}`]['answers'])[0][0],
                            rightCartUID: Object.entries(this.props.quiz[`${this.props.route.params.id}`]['answers'])[1][0]
                        }} />
                        :
                        <div className="preloading__cart">
                            <p>Quiz Is Starting!!!</p>
                            <p>Pick That You Like More</p>
                        </div>
                }
            </Layout>
        );
    }


}

export default connect(
    (state) => {    // mapStateToProps
        return { quiz: state.quiz }
    },
    { getQuizByID })  // mapDispatchToProps
(Quiz)