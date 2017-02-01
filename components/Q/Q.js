import React, { PropTypes } from 'react';
import {addClass, hasClass, each, delegate} from './../../src/helper'
import cx from 'classnames';

class Q extends React.Component {

    constructor(props) {
        super(props);
        this.ansList = null;
            console.time( 'start' );
        this.state ={
            successAns : null,
            pickedAns: null
        }
    }
    componentWillMount() {
        let {cartQuest, ...answers} = this.props.q;

        let successAns = ""
        each(answers,(key, val, i)=>{
            if( val.isAnswer ) successAns = key
           
        });
        this.setState({
            successAns
        })
    }
    componentDidMount(){
        delegate.call(this, this.ansList, 'click', 'a.qCart-simple__ans-link', this._inspectAns)
       
        console.timeEnd( 'start' );
    }

    _inspectAns(e){
    
        let pickedId = e.delegateTarget.getAttribute('data-idQuestion')
    
        this.setState({
             pickedAns :  pickedId
        })
        
    }



    render(){
        let {cartQuest, ...answers} = this.props.q;
        let successAns = this.state.successAns;
        let pickedAns =  this.state.pickedAns;

        let ansToRender = []
  
        each(answers,(key, val, i)=>{
            
            let classLi = cx(
                'qCart-simple__ans',
                 this.state.pickedAns && this.state.successAns == key  ? "is_true": "",
                 this.state.pickedAns == key && this.state.successAns != this.state.pickedAns? "is_false": ""
            )

            ansToRender.push( 
                <li key={i} onClick={this.inspectAns}  className={classLi}>
                    <a href="#"  className="qCart-simple__ans-link" data-idQuestion={key}><b>{val.ans}</b></a>
                    <span className="qCart-simple__ans-number" >{i+1}</span>
                </li> )
        });

        return(
            <article className="qCart" >
                <div className="qCart-title" >{cartQuest.question}</div>
                <div className="qCart-img">{ pickedAns && <img src={answers[pickedAns].hindImg } /> }</div>
                <ul className="qCart-list__ans" ref={node => {this.ansList = node}}>{ ansToRender }</ul>
                <div className="qCart-result">
                    {pickedAns && successAns == pickedAns &&
                        <div className="qCart-result__success"><h4>Success:</h4> {answers[pickedAns].hintText }</div>
                    }
                    {pickedAns && successAns != pickedAns &&
                         <div className="qCart-result__failure"><h4>Failure:</h4> {answers[pickedAns].hintText }</div>
                    }
                </div>
            </article>
        )
    
    }
}
export default Q