import firebase from 'firebase';

let config = {
    apiKey: "",
    authDomain: "niveltanque-17dc5.firebaseapp.com",
    databaseURL: "https://niveltanque-17dc5.firebaseio.com",
    projectId: "niveltanque-17dc5",
    storageBucket: "niveltanque-17dc5.appspot.com",
    messagingSenderId: "",
    appId: ""
};

let app = firebase.initializeApp(config);
export const db = app.database();
