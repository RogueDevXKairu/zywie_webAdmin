firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	var firebasedatabase = firebase.database().ref();
  	firebasedatabase.child("users").child(user.uid).child("role").once('value').then(function(snapshot) {
	  if(snapshot.val() == "admin"){
	  	window.location="/home.html";
	  }else{
	  	alert("Your credentials do match any admin account.");
	  	firebase.auth().signOut().then(function() {
		}).catch(function(error) {
		  	alert(error.message);
		});
		window.location="/login.html";
	  }
	});
	$("#p2").hide();
  }else{
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    
    dialog.showModal();

  }
});

$("#p2").hide();

$("#loginBtn").click(function(){
	$("#p2").show();
	var email = $("#email").val();
	var password = $("#password").val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert(errorMessage);
	});
});