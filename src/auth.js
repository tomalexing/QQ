import firebase from "firebase"
import config from "./config"
import store from "./store"
import {autorized, noAutorized} from "./actionCreators"

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    store.dispatch(autorized(user));

  } else {
    // User is signed out.
    store.dispatch(noAutorized());
  }

});



var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithRedirect(provider);

function isAdminArea(component) {
  if (/admin/.test(component.props.route.path) /* admin in route  */) {
    const user = firebase.auth().currentUser;
    if (!user) /* If a user isn't signed in, currentUser is null */
      return true

    return false

  }
  return false
}
export { isAdminArea, provider }

const unsubsribe = firebase.auth().onAuthStateChanged(() => {

  unsubsribe();
});
