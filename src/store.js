/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { user: {}, loaded : 0 };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'AUTHORIZE':
      return { ...state, user: action.user  };
    case 'NOT_AUTHORIZE':
      return { ...state, user: {}  };
    case 'LOADED' :
      return { ...state, loaded: (state.loaded) + 1  };
    default:
      return state;
  }
}, initialState, applyMiddleware(getQuizFromFirebase));


function getQuizFromFirebase({ getState }) {

  const dbRef = firebase.database().ref()

  return (next) => (action) => {

    dbRef.child('quiz').limitToLast(10).once("value").then((quiz) => {
      return quiz.val();
    }).then((quiz, err) => {
      if (quiz) {
        let returnValue = next(action)
        console.log(returnValue)
        return  { quiz: quiz };

      }

      if (err) return undefined;
    })
  }
}

export default store;
