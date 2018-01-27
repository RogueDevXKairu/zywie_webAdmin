importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyCCluMaWBRVBDbhRNrOgFScGBcQLcsqBus",
    authDomain: "zywie-2b7c2.firebaseapp.com",
    databaseURL: "https://zywie-2b7c2.firebaseio.com",
    projectId: "zywie-2b7c2",
    storageBucket: "zywie-2b7c2.appspot.com",
    messagingSenderId: "758045763954"
};
firebase.initializeApp(config);
