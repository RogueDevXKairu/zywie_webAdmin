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

$('body').on('click','#deletebutton',function(){
  var dialog = document.querySelector('#deleteDialog');
  dialog.showModal();
  var value = $(this).val();
  // Yes
  dialog.querySelector('.agree-del').addEventListener('click', function nothing() {
      firebasedatabase.child("food_exchange_list_tag").child(category.innerHTML).child(value).remove();
      firebaseQuery(category.innerHTML);
      alert("Successfully deleted "+value.toUpperCase()+".");
      dialog.querySelector('.agree-del').removeEventListener('click',nothing,false);
      dialog.close();
  });
  // No
  dialog.querySelector('.close-del').addEventListener('click', function() {
      dialog.close();
  });
});

$('body').on('click','#editButton',function(){
  var dialog = document.querySelector('#editDialog');
  var value = $(this).val();
  dialog.querySelector('.mdl-dialog__content').innerHTML = '<input type="text" class="form-control" id="edit-food-item" value="'+value+'">';
  dialog.showModal();
  var edit = dialog.querySelector('#edit-food-item').value;
  // Yes
  dialog.querySelector('.agree-edit').addEventListener('click', function nothing() {
      var editnew = dialog.querySelector('#edit-food-item').value;
      if(editnew!=""){
        firebasedatabase.child("food_exchange_list_tag").child(category.innerHTML).child(edit).remove();
        firebasedatabase.child("food_exchange_list_tag").child(category.innerHTML).child(editnew).set(true);
        alert("Successfully edited");
        dialog.querySelector('.agree-edit').removeEventListener('click',nothing,false);
        dialog.close();
      }else{
        alert("Empty field");
      }
  });
  // No edit
  dialog.querySelector('.close-edit').addEventListener('click', function() {
      dialog.close();
  });
});



function firebaseQuery(category){
	var cnt=0;
	firebasedatabase.child("food_exchange_list_tag").child(category).on('value', function(snapshot){
		display_table_items.innerHTML = "";
		cnt = 0;
		snapshot.forEach(function(childSnapshot) {
			cnt++;
		    var childData = childSnapshot.key.toUpperCase();
            var row ="";
		    row += '<tr><td class="col-xs-2">' + cnt + '</td><td class="col-xs-6 center-text">' + childData + '</td><td class="col-xs-2"><button id="editButton" value="'+ childData.toLowerCase() +'" class="mdl-button mdl-js-button mdl-button--colored">Edit</button></td><td class="col-xs-2"><button id="deletebutton" value="'+ childData.toLowerCase() +'" class="mdl-button mdl-js-button mdl-button--colored">Delete</button></td></tr>';
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
		firebasedatabase.child("food_exchange_list_tag").child(document.getElementById("spinerAddInput").innerHTML)
		.child(document.getElementById('food-item').value.toLowerCase()).set(true);
		alert("Food list update success");
    firebaseQuery(category.innerHTML);
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
