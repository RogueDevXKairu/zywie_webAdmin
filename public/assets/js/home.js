firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
  	$("#security-wrapper").hide();
  	window.location="/login.html";
  }
});

var food_item = document.getElementById("food-item");
var spiner_item = document.getElementById("food-item-spiner");
var btn_submit = document.getElementById("submitBtn");

var display_table_items = document.getElementById("display-table-item");

var firebasedatabase = firebase.database().ref();
var category = document.getElementById("category");

firebaseQuery(category.innerHTML);

function firebaseQuery(category){
	var cnt=0;
	firebasedatabase.child("food_exchange_list_tag").child(category).on('value', function(snapshot){
		display_table_items.innerHTML = "";
		cnt = 0;
		snapshot.forEach(function(childSnapshot) {
			cnt++;
		    var childData = childSnapshot.val().toUpperCase();
		    var row = "";
		    row += '<tr><td class="col-xs-2">' + cnt + '</td><td class="col-xs-10">' + childData + '</td></tr>';
		    var html = display_table_items.innerHTML + row;
		    display_table_items.innerHTML = html;
	  });
		document.getElementById("numItems").innerHTML = "Total item(s): "+cnt;
		document.getElementById('loadingSpiner').style.display = 'none';
	});
	return cnt;
}



function submitClick(){
	
	if(document.getElementById('food-item').value != "" && document.getElementById("spinerAddInput").innerHTML != ""){
		var num = firebaseQuery(document.getElementById("spinerAddInput").innerHTML);
		firebasedatabase.child("food_exchange_list_tag").child(document.getElementById("spinerAddInput").innerHTML)
		.child(num).set(document.getElementById('food-item').value);
		alert("Food list update success");
		document.getElementById('food-item').value = "";
	}else{
		alert("Please fill up all fields");
	}
}


$("#btnSignOut").click(function(){
	firebase.auth().signOut().then(function() {
 		window.location="/login.html";
	}).catch(function(error) {
	  	alert(error.message);
	});
});

$("#spinerADDul li").click(function(e){
	$("#spinerAddInput").text($(this).text());
});

$('#selectCat').on('change', function() {
	category.innerHTML = this.value;
  	firebaseQuery(this.value);
})



function filterTable() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("food-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}