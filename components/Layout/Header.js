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
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cx from 'classnames';
import myTheme from "./../../src/theme";


class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
    
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getChildContext() {
    return { muiTheme: getMuiTheme(myTheme) };
  }

  render() {

    return (
      <header className={`quiz-header`}>
        <div className={`quiz-header__row`}>
          <Link className={`quiz-header__logo`} to="/">
            <img className="logo" src={`http://${ window.location.host}/img/quiz-logo.png`} />
          </Link>
          <div className="quiz-header__spacer"></div>
           <RaisedButton
            label="Toggle Drawer"
            onTouchTap={this.props.handleToggle}
          />
          <RaisedButton
              className={cx('quiz-btn', 'quiz-header__create')}
              style={{ borderRadius: "20px"}}
              buttonStyle={{ borderRadius: "20px", zIndex: 1, overflow: 'hidden' }}
              onTouchTap={this.handleOpen}
              labelStyle={{ color: '#474e65', fontWeight: 600, fontSize: 15 }}
              rippleStyle={{ color: '#474e65'}}
              label="CREATE QUIZ" />
          <Dialog
              title="Is Needed?"
              actions={[  
                <RaisedButton
                  label="Close"
                  secondary={true}
                  className={"quiz-btn"}
                  style={{ borderRadius: "20px" }}
                  buttonStyle={{ borderRadius: "20px", zIndex: 1, overflow: 'hidden' }}
                  onTouchTap={this.handleClose}
                  />
              ]}
              modal={false}
              open={this.state.open}
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
export default Header;
