

import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import firebase from "firebase";

export default class Quiz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quiz: null,
            id: this.props.route.params.id
        }
      
    }
    componentWillReceiveProps(nP){
         this.state = {
            id: this.props.route.params.id
        }
        return true
    }
    shouldComponentUpdate(){
        console.log(this.props.route.params.id)
        return  false
    }
    
    componentWillUpdate(){
        const db = firebase.database()
        db.ref(`quiz/${this.state.id}`).once("value").then((quiz) => {
            return quiz.val();
        }).then((quiz, err) => {
            if (quiz) {
                this.setState({ quiz: quiz });
            }
            if (err) console.log(err);

        })
         console.log('componentWillUpdate $1 -- $2',this.state.id, this.props.route.params.id)
    }
    componentWillMount() {
        console.log("componentWillMount")
        const db = firebase.database()
        db.ref(`quiz/${this.state.id}`).once("value").then((quiz) => {
              console.log('step1')
            return quiz.val();
        }).then((quiz, err) => {
            if (quiz) {
                 console.log('step2')
                this.setState({ quiz: quiz });
            }

            if (err) console.log(err);

        })
          console.log('step0')
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