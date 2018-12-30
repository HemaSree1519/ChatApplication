import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyALXl9iaBRKnPscmT-df6MJ05RanY_LcOY",
    authDomain: "chatbook-e5d99.firebaseapp.com",
    databaseURL: "https://chatbook-e5d99.firebaseio.com",
    projectId: "chatbook-e5d99",
    storageBucket: "chatbook-e5d99.appspot.com",
    messagingSenderId: "623361853537"
};
export default firebase.initializeApp(config);