firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     window.location="/home.html";
  }else{
  	window.location="/login.html";
  }
});