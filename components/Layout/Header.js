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
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const actions = [
      <RaisedButton
        label="Close"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        className="mdl-button"
        />
    ];
    return (
      <header className={`mdl-layout__header quiz-header`}>
        <div className={`mdl-layout__header-row quiz-header__row`}>
          <Link className={`mdl-layout-title quiz-header__logo`} to="/">
            <img className="logo" src="./img/quiz-logo.png" />
          </Link>
          <div className="mdl-layout-spacer"></div>

          <RaisedButton className="quiz-header__create" label="CREATE QUIZ" onTouchTap={this.handleOpen} />
          <Dialog
            title="Is Needed?"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentClassName="mdl-dialog"
            titleClassName="mdl-dialog__title"
            titleStyle={{color: "white"}}
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
