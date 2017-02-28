
export function autorized(user){
    return{
      type: 'AUTHORIZE',
      user
    }
}

export function noAutorized(){
    return{
      type: 'NOT_AUTHORIZE'
    }
}

export function quizLoaded(quiz){
    return{
      type: 'QUIZ_LOADED',
      quiz
    }
}

export function quizNotLoaded(){
    return{
      type: 'QUIZ_NOT_LOADED'
    }
}

export function quizLoadedByID(quiz){
    return{
      type: 'QUIZ_LOADED',
      quiz
    }
}

export function quizNotLoadedByID(){
    return{
      type: 'QUIZ_NOT_LOADED'
    }
}