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
import thunk from 'redux-thunk';

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { user: {}, loaded : 0, quiz : {} };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'AUTHORIZE':
      return { ...state, user: action.user  };
    case 'NOT_AUTHORIZE':
      return { ...state, user: {}  };
    case 'LOADED' :
      return { ...state, loaded: (state.loaded) + 1  };
    case 'QUIZ_LOADED' :
      return { ...state, quiz: [...state.quiz, action.quiz ]};
    case 'QUIZ_NOT_LOADED' :
      return { ...state, quiz: {...state.quiz}};
    default:
      return state;
  }
}, applyMiddleware(...[thunk, logger ]));


function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)
    
    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


export default store;
