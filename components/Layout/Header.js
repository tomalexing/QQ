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

import { getQuizAll, getMeta, getCat } from "./../../src/actionCreators"
import { connect } from 'react-redux'

const {alterBtnStyle} =  customStyles
 
class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      cat: null
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
          cat: nextProps.cat || null
      }
  }
  componentWillMount() {
    let { getCat } = this.props;
    getCat();
  }

  render() {
    return (
      <header className={`quiz-header`}>
        <div className={`quiz-header__row`}>
          <Link className={`quiz-header__logo`} to="/">
            <img className="logo" src={`${ this.getHost() }/img/quiz-logo.png`} />
          </Link>
          <div className="quiz-header__spacer"></div>
          <IconMenu 
            iconButtonElement={                 
                <IconButton   >
                      <MenuIcon color={"#fff"}/> 
                      </IconButton>
            }
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            value={1}
          > 
              <h2 className={"quiz-sidebar__title"}>
                 <Link to={`/cats/`} > Categories </Link> 
              </h2>
            {
             
              this.state.cat
                ?
                  Object.entries(this.state.cat).map((cat, index) => {
                    let catName = cat[0];
                    return <MenuItem key={index} className={'quiz-sidebar__item'}>
                              <Link to={`/cat/${catName}/`} onClick={this.handleToggle}>  
                                    <img width="60px" height="60px" src={Array.join([this.getHost(),'/' ,cat[1]['srcImg']],'')} />
                                    <span>{cat[0]}</span>
                              </Link> 
                            </MenuItem>
                  })
                :
                <div className="quiz-menu_placeholder"></div>
              
            }
          </IconMenu>
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
  state => ({cat: state.cat}),
  {getQuizAll, getMeta, getCat}
)(Header);
