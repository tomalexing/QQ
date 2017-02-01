

import React from 'react';
import Q from './../../components/Q'
import Layout from "./../../components/Layout"


export default class Quest extends React.Component{


    constructor(props){
        super(props)
    }

    render(){

        var quizTest = {
            'cartQuest': {
                question: "хороший",
                 cartId: '-KPs0qRtYWworeGt1WD-'
            },
            'qwe5f': {
                ans: "admission",
                hindImg:  "img/1.jpg",
                hintText: "признание/вход",
                isAnswer: false
            },
            'qwef': {
                ans: "accelerate",
                hindImg:  "img/3.jpg",
                hintText: "ускорять",
                isAnswer: false
            },
             'qwfe': {
               
                ans: "poll",
                hindImg:  "img/4.jpg",
                hintText: "голосование",
                isAnswer: false
            },
             'qf': {
                
                ans: "chip",
                hindImg:  "img/5.png",
                hintText: "чип",
                isAnswer: false
            },
             'qfqfwe': {
                
                ans: "good",
                hindImg:  "img/1.jpg",
                hintText: "Congradulations",
                isAnswer: true
            }
            }
        return (
            <Layout>
                <Q q={quizTest}/>
            </Layout>
        );
    }


}