import firebase from 'firebase'

export const AUTHORIZE          = 'AUTHORIZE'
export const NOT_AUTHORIZE      = 'NOT_AUTHORIZE'
export const QUIZ_LOADED        = 'QUIZ_LOADED'
export const QUIZ_NOT_LOADED    = 'QUIZ_NOT_LOADED'
export const CLEAR_STORE        = 'CLEAR_STORE'
export const QUIZ_LOADED_BY_ID  = 'QUIZ_LOADED_BY_ID'
export const QUIZ_LOADED_ALL    = 'QUIZ_LOADED_ALL'

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


export function getQuizAll(number = 10) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return dispatch => {

    return   firebase.database()
                .ref()
                .child('quiz')
                .limitToLast(number)
                .once("value")
                .then((quiz) => {return quiz.val()})
                .then(
                    quiz => dispatch( quizLoaded(quiz) ),
                    err =>  dispatch( quizNotLoaded() )
                )
  }
}

export function getQuizByID(id) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.


  return dispatch => {

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