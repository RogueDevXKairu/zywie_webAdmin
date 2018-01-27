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
            "notification": {
              "title": title.value,
              "body": description.value
            }
          };
       
          $.ajax({
           url: 'https://fcm.googleapis.com/fcm/send',
           type: "POST",
           processData : false,
           beforeSend: function (xhr) {
             xhr.setRequestHeader('Content-Type', 'application/json');
             xhr.setRequestHeader('Authorization', 'key=' + 'AIzaSyATWCd5Xv6LmePoQI_yiPco_pzDIdEuz4A');
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