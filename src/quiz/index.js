

import React from 'react';
import Cart from './../../components/Cart'
import Layout from "./../../components/Layout"
import Link from './../../components/Link'
import { connect } from 'react-redux'
import { getQuizByID, clearStore } from './../actionCreators'

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
    }

    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }   


    componentWillUpdate() {
        let {getQuizByID} = this.props;
        if( !this.state.quiz )
            getQuizByID(this.state.id);
        console.log('componentWillUpdate $1 -- $2 ',this.state.id, this.props.route.params.id)
    }

    componentWillMount() {
        let {getQuizByID} = this.props;
        getQuizByID(this.state.id);
        console.log('componentWillMount $1 -- $2 ',this.state, this.props)
    }
    componentWillUnmount(){
        let {clearStore } = this.props;
        clearStore();
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
                        <div>
                            <Cart quiz={{
                                question: this.state.quiz['question'],
                                q1: Object.values(this.state.quiz['answers'])[0],
                                q2: Object.values(this.state.quiz['answers'])[1],
                                cartId: this.props.route.params.id,
                                leftCartUID: Object.entries(that.state.quiz['answers'])[0][0],
                                rightCartUID: Object.entries(that.state.quiz['answers'])[1][0]
                            }} />
                            <Link to={`/quiz/${'-KaJ0ieqwWworeX91WD-'}`}> Next </Link>
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
  

export default connect(
    state => ({quizs: state.quiz}),
    {getQuizByID, clearStore}
)(Quiz)