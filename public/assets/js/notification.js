firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $("#security-wrapper").hide();
        window.location="/login.html";
    }
});

const FIREBASE_MESSAGING = firebase.messaging();

function pushNotification() {
    var title = document.getElementById("notif-title");
    var description = document.getElementById("notif-description");

}