import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import firebase from "firebase"
import { getQuizAll, getQuizByID } from "./../middleware"
import store from "./../store"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
         console.log('componentWillUpdate $1 -- $2 ',this.state.id, this.props.route.params.id)
    }

    componentWillMount() {
        let { dispatch, getQuizByID } = this.props;
        getQuizByID(this.state.id).then(
             q =>  console.log('componentWillMount $1 -- $2 ',this.state.id, this.props.route.params.id)
        )
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
        
        return (

            <Layout>
                <div style={{background: color}}>{color}</div>
                {
                    (this.state.quiz)
                        ?
                        <Cart quiz={{
                            question: this.state.quiz['question'],
                            q1: Object.values(this.state.quiz['answers'])[0],
                            q2: Object.values(this.state.quiz['answers'])[1],
                            cartId: this.props.route.params.id,
                            leftCartUID: Object.entries(that.state.quiz['answers'])[0][0],
                            rightCartUID: Object.entries(that.state.quiz['answers'])[1][0]
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


function mapStateToProps(state) {
  return { quiz: state.quiz }
}

function mapDispatchToProps(dispatch) {
  return {
    getQuizByID: bindActionCreators(getQuizByID, dispatch),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)