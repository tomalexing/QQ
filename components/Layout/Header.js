/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import Login from './Login';
import Button from './../Button';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuIcon from 'material-ui/svg-icons/navigation/apps';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cx from 'classnames';
import myTheme, { customStyles } from "./../../src/theme";
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { getQuizAll, getMeta, getCats } from "./../../src/actionCreators"
import { connect } from 'react-redux'

const {alterBtnStyle, dropDownMenu, dropDownMenuItem} =  customStyles

const requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
const transitionEndPromise = elem => new Promise(resolve => {
        elem.addEventListener('transitionend', resolve , {once: true});
    })

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      cats: null,
      menuOpen: false
    }
  }
  getHost(){
    return window.location.origin
  }
  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  
  getChildContext() {
    return { muiTheme: getMuiTheme(myTheme) }
  }
  componentWillReceiveProps(nextProps){
      this.state = {
          cats: nextProps.cats || null
      }
  }
  componentWillMount() {
    let { getCats } = this.props;
    getCats();
  }
  tootleMenuClass() {
    this.setState({menuOpen: !this.state.menuOpen }, () => {
          !this.state.menuOpen?
          (
          requestAnimationFramePromise()
              .then( _ => requestAnimationFramePromise())
              .then( _ => {
                  return transitionEndPromise(this.node)
              })
              .then( _ => {
                  this.node.style.visibility = `hidden`; 
              })
          ):

          this.node.style.visibility = `visible`
        });
  }
  render() {
    return (
      <header className={`quiz-header`}>
        <div className={`quiz-header__row`}>
          <Link className={`quiz-header__logo`} to="/">
            <img className="logo" src={`${ this.getHost() }/img/quiz-logo.png`} />
          </Link>
          <div className="quiz-header__spacer"></div>
          <div  className={cx('quiz-header__btn', this.state.menuOpen?'active':'')} 
            onClick={this.tootleMenuClass.bind(this)}
          >
            Polls
          {
             
              this.state.cats
                ?
                  <div ref={(node)=>this.node=node} className={'quiz-header__menu__items'} >
                    {Object.values(this.state.cats).map((cat, index) => {
                      let catName = cat[0];
                      return <div key={index} className={'quiz-header__menu__item'} >
                                <Link className={'quiz-header__menu__item-link'} to={`/cat/${Object.entries(this.state.cats)[index][0]}/`} onClick={this.handleToggle}>  
                                      <img className={'quiz-header__menu__item-catpic'}  width="60px" height="48px" src={Array.join([this.getHost(),'/' ,cat['srcImg']],'')} />
                                      <div className={'quiz-header__menu__item-infogroup'}>  
                                          <span className={'quiz-header__menu__item-title'} >{cat.title}</span>
                                          <span className={'quiz-header__menu__item-quantity'} >{cat.quantity} {cat.quantity==1?'card':'cards'}</span>
                                      </div>
                                </Link> 
                              </div>
                    })} 
                  </div>
                :
                <div className="quiz-menu_placeholder"></div>
              
            }
           
          </div>
          <RaisedButton
              className={cx('quiz-btn', 'quiz-header__create')}
              style={alterBtnStyle.style}
              buttonStyle={alterBtnStyle.buttonStyle}
              onTouchTap={this.handleOpen}
              labelStyle={alterBtnStyle.labelStyle}
            
              label="CREATE QUIZ" />


          <Dialog
              title="Is Needed?"
              actions={[  
                <RaisedButton
                  label="Close"
                  secondary={true}
                  className={"quiz-btn"}
                  style={alterBtnStyle.style}
                  buttonStyle={alterBtnStyle.buttonStyle}
                  onTouchTap={this.handleClose}
                  />
              ]}
              
              modal={false}
              open={this.state.open || false}
              onRequestClose={this.handleClose}
              bodyStyle={{marginTop: 20}}
              contentClassName="mdl-dialog"
              titleClassName="mdl-dialog__title"
              titleStyle={{ color: "white" }}
              contentStyle={{ maxWidth: '320px' }}
            >
            <span> You can connect with us by email</span> <address>support@iondigi.com</address> <span> to share you vision of project or just subsribe and We'll consider such kind of functionallity.</span>
          </Dialog>
        </div>
      </header>


    );
  }

}
Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default 
  connect(
  state => ({cats: state.cats}),
  {getQuizAll, getMeta, getCats}
)(Header);
