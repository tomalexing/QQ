import firebase from 'firebase'
import {quizLoaded, quizNotLoaded, quizLoadedByID ,quizNotLoadedByID} from './actionCreators' 

export function getQuizAll(number) {

  const dbRef = firebase.database().ref();

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function(dispatch){

    return dbRef.child('quiz').limitToLast(number).once("value").then((quiz) => {
      return quiz.val();
    }).then(
        quiz => dispatch( quizLoaded(quiz)),
        err =>  dispatch(quizNotLoaded())
    )
  }
}

export function getQuizByID(id) {

  const db = firebase.database();

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function(dispatch){
    db.ref(`quiz/${id}`).once("value").then((quiz) => {
      return quiz.val();
    }).then(
        quiz => dispatch(quizLoadedByID(quiz)),
        err =>  dispatch(quizNotLoadedByID())
    )
  }
}