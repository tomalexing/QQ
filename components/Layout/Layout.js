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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import firebase from 'firebase'
import Link from '../Link'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import myTheme from "./../../src/theme" 

import { getQuizAll, getMeta, getCat } from "./../../src/actionCreators"
import { connect } from 'react-redux'
import createFragment from 'react-addons-create-fragment'

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }




  getChildContext() {
    return { muiTheme: getMuiTheme(myTheme) };
  }

  render() {
    const { children } = this.props;
  
    return (
      <div className="mdl-layout mdl-js-layout quiz-out" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header />
          <main className="mdl-layout__content">
            {children}
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
export default Layout
