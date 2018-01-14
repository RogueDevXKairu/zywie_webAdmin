var food_item = document.getElementById("food-item");
var spiner_item = document.getElementById("food-item-spiner");
var btn_submit = document.getElementById("submitBtn");

var display_table_items = document.getElementById("display-table-item");

var firebasedatabase = firebase.database().ref();

firebasedatabase.child("food_exchange_list_tag").child("Fat").on('value', function(snapshot){
	display_table_items.innerHTML = "";
	var cnt = 0;
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

function submitClick(){
	firebasedatabase.child("webadmin").update({
		"food": null,
		"cat": spiner_item.value
	});
}