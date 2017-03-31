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

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { 
      openMenu: false,
      cat: null
    };
  }

  componentDidMount() {


  }
  componentWillReceiveProps(nextProps){
      this.state = {
          cat: nextProps.cat || null
      }
      console.log(this.state);
  }

  componentWillMount() {
    let { getCat } = this.props;
    getCat();
  }

  
  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }
  handleToggle = () => this.setState({ open: !this.state.openMenu });
  getChildContext() {
    return { muiTheme: getMuiTheme(myTheme) };
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout quiz-out" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header handleToggle={this.handleToggle}/>
          <IconMenu 
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            onChange={this.handleToggle}
            value={this.state.valueSingle}

            className="quiz-sidebar"
          >
            <h2 className={"quiz-sidebar__title"}>All VS</h2>
            <IconButton className={"quiz-sidebar__close"} onTouchTap={this.handleToggle}>
              <Close />
            </IconButton>
            {
             
              this.state.cat
                ?
                  Object.entries(this.state.cat).map((cat, index) => {
                    console.log(cat);
                    return <MenuItem key={index} className={'quiz-sidebar__item'}>
                              <Link to={`/`} onClick={this.handleToggle}>  
                                    <img width="60px" height="60px" src={'./' + cat[1]['srcImg']} />
                                    <span>{cat[0]}</span>
                              </Link> 
                            </MenuItem>
                  })
                :
                <div className="quiz-menu_placeholder"></div>
              
            }
          </IconMenu>
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
export default 
connect(
  state => ({cat: state.cat}),
  {getQuizAll, getMeta, getCat}
)(Layout);
