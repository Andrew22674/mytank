import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDF3_-QOhYNjiOZguvMSKAzNTJh2e1WPq0",
    authDomain: "niveltanque-17dc5.firebaseapp.com",
    databaseURL: "https://niveltanque-17dc5.firebaseio.com",
    projectId: "niveltanque-17dc5",
    storageBucket: "niveltanque-17dc5.appspot.com",
    messagingSenderId: "381208732354",
    appId: "1:381208732354:web:7142efc0303c93bfee115b"
};

let app = firebase.initializeApp(config);
export const db = app.database();