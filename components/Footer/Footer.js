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
import firebase from 'firebase';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import cx from 'classnames';
import myTheme from "./../../src/theme";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const dbRef = firebase.database().ref(`subscribers`)
const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class Footer extends React.Component {

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      emailNotRecognized: false,
      open: false
    }
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
   
  }

  onSubmit(e) {
    e.preventDefault();
    let email = document.querySelector('#subscribe')
    if(EMAIL_RE.test(email.value)){
      dbRef.once('value').then(snap => {
        let Emails = snap.val() || {}
        let id = generateID('email-')
        Emails[id] = email.value
        dbRef.set(Object.assign(Emails))
        this.setState({emailNotRecognized: false})
        this.setState({ open: true });
        email.value = ""

      })
    }else{
        this.setState({ open: true });
        this.setState({emailNotRecognized: true})
    }
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
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">© 2017 ION DIGITAL</div>
          <ul className="mdl-mini-footer__link-list">
            <span className="quiz-footer__devider" >·</span>
            <li><Link to="/about">TERMS OF SERVICE</Link></li>
          </ul>
        </div>
        <div className="mdl-mini-footer__right-section">
          <form className="quiz-subscribe" onSubmit={this.onSubmit}>
            
              <fieldset className="quiz-subscribe__cover__input">
                <input id="subscribe" type="email" placeholder="Email" name="subscribe" />
                <RaisedButton
                  type="submit"
                  label="subscribe"
                  secondary={true}
                  className={"quiz-btn quiz-submit"}
                  style={{ borderRadius: "20px" }}
                  buttonStyle={{ borderRadius: "20px", zIndex: 1, overflow: 'hidden' }}
                  />
              </fieldset>
          </form>

          <Dialog
              title={this.state.emailNotRecognized ? "Denied" : "Success!!!" } 
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
            { this.state.emailNotRecognized
              ?
               <p>Check email and try again.</p>
              :
               <p>Your subscription was accepted </p>}
          </Dialog>
        </div>
      </footer>

    );
  } 
}
Footer.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Footer;
