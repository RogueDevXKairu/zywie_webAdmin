firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $("#security-wrapper").hide();
        window.location="/login.html";
    }
});
document.getElementById('loadingSpiner').style.display = 'none';

function pushNotification() {
    var title = document.getElementById("notif-title");
    var description = document.getElementById("notif-description");
    if(title.value!="" && description.value!=""){
        document.getElementById('loadingSpiner').style.display = 'block';
        var json = {
            "to": "/topics/logged_users",
            "data": {
              "title": title.value,
              "desc": description.value
            },
            "time_to_live" : 259200
          };
       
          $.ajax({
           url: 'https://fcm.googleapis.com/fcm/send',
           type: "POST",
           processData : false,
           beforeSend: function (xhr) {
             xhr.setRequestHeader('Content-Type', 'application/json');
             xhr.setRequestHeader('Authorization', 'key=' + 'AAAAsH8MaXI:APA91bESFUHg1RPaKsA8BNY6F4TxRnQvskRQNlLoYvKXvcIf3G84Kkm7bPHNRBfbc718QgMQdWgYqBx2dlyyWc8P-yI9d5JvK9kLrSAHJykB_CpInwxewgfer9SQg6SsZW2xJ7rr6MQD');
           },
           data: JSON.stringify(json),
           success: function () {
             alert("Sent notifications to all devices!");
             title.value ="";
            description.value ="";
           },
           error: function(error) {
            alert("Error Notifications to Users");
           }
         });
         document.getElementById('loadingSpiner').style.display = 'none';
    }else{
        alert("Fill out all fields");
    }
    
}

$("#btnSignOut").click(function(){
	firebase.auth().signOut().then(function() {
 		window.location="/login.html";
	}).catch(function(error) {
	  	alert(error.message);
	});
});