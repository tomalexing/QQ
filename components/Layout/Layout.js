/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react'
import cx from 'classnames'
import Header from './Header'
import Footer from '../Footer'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import Link from '../Link'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import myTheme from "./../../src/theme"
import { connect } from 'react-redux'
import {getQuizAll, clearStore } from "./../../src/actionCreators" 

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      quizs: null 
    };
  }

  componentDidMount() {


  }
  componentWillReceiveProps(nextProps){
    this.state = {
       quizs: nextProps.quizs
     }
  }

  componentWillUpdate() {
     let {getQuizAll} = this.props;
     if( !this.state.quizs )
       getQuizAll(15)

     
  }
  componentWillMount() {

    let {getQuizAll } = this.props;

    getQuizAll(10);

  }
  handleToggle = () => this.setState({ open: !this.state.open });
  getChildContext() {
    return { muiTheme: getMuiTheme(myTheme) };
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout quiz-out" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header handleToggle={this.handleToggle}/>
          <Drawer 

            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            className="quiz-sidebar"
          >
            <h2 className={"quiz-sidebar__title"}>All VS</h2>
            <IconButton className={"quiz-sidebar__close"} onTouchTap={this.handleToggle}>
              <Close />
            </IconButton>
            {
              this.state.quizs
                ?
                
                Object.keys(this.state.quizs).map((q, index) => {
                  return <MenuItem key={index} className={'quiz-sidebar__item'}>
                            <Link to={`/quiz/${q}`} onClick={this.handleToggle}> 
                              { <span className={'quiz-sidebar__votes'}>{
                                  Object.values(this.state.quizs[q]['answers'])[0].quantity +  
                                  Object.values(this.state.quizs[q]['answers'])[1].quantity 
                                  }
                                  { <small>votes</small> 
                                }</span> 
                              }
                              { 
                                Object.values(this.state.quizs[q]['answers'])[0].value 
                              }
                              { <i> vs </i> }
                              {
                                Object.values(this.state.quizs[q]['answers'])[1].value
                              }
                            </Link> 
                          </MenuItem>
                })
                :
                <div className="quiz-menu_placeholder"></div>
            }
          </Drawer>
          <main className="mdl-layout__content">
            <div {...this.props}  className={cx(this.props.className)} />
            <Footer />
          </main>
        </div>
      </div>

    );
  }
}
Layout.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default connect(
    state => ({quizs: state.quiz}),
    {getQuizAll, clearStore}
)(Layout)
