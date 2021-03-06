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
import { AUTHORIZE, NOT_AUTHORIZE, QUIZ_LOADED, 
  QUIZ_NOT_LOADED, QUIZ_LOADED_BY_ID,
  QUIZ_LOADED_ALL,
   CLEAR_STORE, META_LOADED, CATS_LOADED, QUIZ_LOADING }  from './actionCreators'

// Centralized application state
// For more information visit http://redux.js.org/

const initialState = { user: {}, quiz : {}, meta: {}, cats:{}, cat: {}, quizLoading: false };

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case AUTHORIZE :
      return { ...state, user: action.user  };
    case NOT_AUTHORIZE :
      return { ...state, user: {}  };
    case QUIZ_LOADED_BY_ID :
      return { ...state, quiz: Object.assign({}, state.quiz, { [`${action.payload.id}`] : action.payload.quiz}  ), quizLoading: false };
    case QUIZ_LOADED_ALL :
    return { ...state, quiz:  Object.assign({}, state.quiz, action.quiz  ), quizLoading: false};
    case QUIZ_NOT_LOADED :
      return { ...state, quiz: {...state.quiz}};
    case CLEAR_STORE :
      return { ...state, quiz: {}};
    case META_LOADED :
      return { ...state, meta: action.payload.meta};
    case CATS_LOADED :
      return { ...state, cats: action.payload.cats};
    case QUIZ_LOADING :
      return  { ...state, quizLoading: true};
    default:
      return state;
  }
}, applyMiddleware(thunk, logger));


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
