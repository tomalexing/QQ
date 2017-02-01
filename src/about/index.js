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
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
  import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
    import getMuiTheme from 'material-ui/styles/getMuiTheme';
class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }
  getChildContext() {
                return { muiTheme: getMuiTheme(baseTheme) };
            }
  render() {
    return (
    <div>
      <Badge
        badgeContent={4}
        primary={true}
      >
        <NotificationsIcon />
      </Badge>
      <Badge
        badgeContent={10}
        secondary={true}
        badgeStyle={{top: 12, right: 12}}
      >
        <IconButton tooltip="Notifications">
          <NotificationsIcon />
        </IconButton>
      </Badge>
    </div>
    );
  }

}
 AboutPage.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };
export default AboutPage;
