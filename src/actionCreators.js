import firebase from 'firebase'
import store from './store'
export const AUTHORIZE           = 'AUTHORIZE'
export const NOT_AUTHORIZE       = 'NOT_AUTHORIZE'
export const QUIZ_LOADED         = 'QUIZ_LOADED'
export const QUIZ_NOT_LOADED     = 'QUIZ_NOT_LOADED'
export const CLEAR_STORE         = 'CLEAR_STORE'
export const QUIZ_LOADED_BY_ID   = 'QUIZ_LOADED_BY_ID'
export const QUIZ_LOADED_ALL     = 'QUIZ_LOADED_ALL'
export const META_LOADED         = 'META_LOADED'
export const CATS_LOADED         = 'CAT_LOADED'
export const QUIZ_LOADING        = 'QUIZ_LOADING';
let lastKey = '-';

window.firebase = firebase;
export function autorized(user){
    return{
      type: AUTHORIZE,
      user
    } 
}

export function noAutorized(){
    return{
      type: NOT_AUTHORIZE
    }
}

export function quizLoaded(quiz){
 
    return{
      type: QUIZ_LOADED_ALL,
      quiz
    }
}

export function quizNotLoaded(){
    return{
      type: QUIZ_NOT_LOADED
    }
}

export function clearStore(){
    return{
      type: CLEAR_STORE
    }
}

export function quizLoadedByID(quiz, id){
    

    return {
      type: QUIZ_LOADED_BY_ID,
      payload: {
          quiz,
          id
      }
    }
}

export function quizNotLoadedByID(){
    return {
      type: QUIZ_NOT_LOADED
    }
}

export function metaLoaded(meta){
 
    return {
      type: META_LOADED,
      payload: {
        meta
      }
    }

}

export function catsLoaded(cats){

   return {
    type: CATS_LOADED,
    payload: {
        cats
      }
   }

}

export function quizLoading(){

   return {
    type: QUIZ_LOADING,
   }

}
export function getQuizAll({perQuery = 3} = {}) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return dispatch => {
    dispatch( quizLoading());
    return   firebase.database()
                .ref()
                .child('quiz')
                .orderByKey()
                .startAt(lastKey)
                .limitToFirst(perQuery)
                .once("value")
                .then((quiz) => {return quiz.val()})
                .then(
                    quiz => {
                      Object.entries(quiz).map(q=>lastKey = q[0])
                      dispatch( quizLoaded(quiz));
                    },
                    err =>  dispatch( quizNotLoaded() )
                )
  }
}

export function getQuizByID(id) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.


  return dispatch => {
            dispatch( quizLoading());
            if(!id)
              dispatch (quizNotLoadedByID())

            firebase.database()
              .ref(`quiz/${id}`)
              .once("value")
              .then((quiz) => { return quiz.val()})
              .then(
                quiz => dispatch( quizLoadedByID(quiz, id) ),
                err =>  dispatch( quizNotLoadedByID() )
              )
  }
}


export function getMeta(){

  return dispatch => {
            firebase.database()
              .ref(`quiz-meta`)
              .once("value")
              .then(value => { return value.val()})
              .then(meta => dispatch( metaLoaded(meta) ))
  }
}


export function getCats(){

  return dispatch => {
            firebase.database()
              .ref(`categories`)
              .once("value")
              .then(value => {return value.val()})
              .then(cat => dispatch( catsLoaded(cat) ))
  }
}


export function getCat({perQuery = 3} = {}){
     // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.


  
   return dispatch =>{  
        dispatch( quizLoading());
        firebase.database()
                .ref()
                .child('quiz')
                .orderByKey()
                .startAt(lastKey)
                .limitToFirst(perQuery)
                .once("value")
                .then((quiz) => {return quiz.val()})
                .then(  
                    quiz => {
                      Object.entries(quiz).map(q=>lastKey = q[0])
                      dispatch( quizLoaded(quiz));
                    },
                    err =>  dispatch( quizNotLoaded() )
                )
  }
}