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

//Edit Filipino name
$('body').on('click','#editFilipinoButton',function(){
  var dialog = document.querySelector('#filipinoAlt');
  var value = $(this).val();
  // dialog.querySelector('.mdl-dialog__content').innerHTML = '<label>Alternative Name 1</label><input type="text" class="form-control" id="edit-food-item" value="'+value+'"><br><label>Alternative Name 2</label><input type="text" class="form-control" id="edit-food-item" value="'+value+'">';
  firebasedatabase.child("alternative_food_name").child(value).once('value', function(snapshot){
    var alternative_name = new Array();
    snapshot.forEach(function(childSnapshot) {
      alternative_name.push(childSnapshot.key.toUpperCase());
    });
    alternative_name.reverse();
    var name1 = (alternative_name[0]!=null) ? alternative_name[0] : "";
    var name2 = (alternative_name[1]!=null) ? alternative_name[1] : "";
    dialog.querySelector('.mdl-dialog__content #filipino-field').innerHTML = '<label>Filipino Alternative Name 1</label><input type="text" class="form-control" id="first-food-name" placeholder="1st Name (Optional)" value="'+name1+'"><br><label>Filipino Alternative Name 2</label><input type="text" class="form-control" id="second-food-name" placeholder="2nd Name (Optional)" value="'+name2+'">';
    var editName1 = dialog.querySelector('#first-food-name').value.toLowerCase();
    var editName2 = dialog.querySelector('#second-food-name').value.toLowerCase();
    // Yes
    dialog.querySelector('.agree-filipino').addEventListener('click', function nothing() {
        var editnewName1 = dialog.querySelector('#first-food-name').value;
        var editnewName2 = dialog.querySelector('#second-food-name').value;

        //first name
        if(editnewName1!=""){
          if(editName1!=""){
            firebasedatabase.child("alternative_food_name").child(value).child(editName1).remove();
          }
          firebasedatabase.child("alternative_food_name").child(value).child(editnewName1.toLowerCase()).set(true);
          alert('Successfully saved "'+editnewName1.toUpperCase()+'" as 1st alternative');
        }else{
          if(editName1!=""){
            firebasedatabase.child("alternative_food_name").child(value).child(editName1).remove();
            alert('Successfully deleted "'+editName1.toUpperCase()+'" as 1st alternative');
          }
        }
        dialog.querySelector('.agree-filipino').removeEventListener('click',nothing,false);

        //second name
        if(editnewName2!=""){
          if(editName2!=""){
            firebasedatabase.child("alternative_food_name").child(value).child(editName2).remove();
          }
          firebasedatabase.child("alternative_food_name").child(value).child(editnewName2.toLowerCase()).set(true);
          alert('Successfully saved "'+editnewName2.toUpperCase()+'" as 2nd alternative');
        }else{
          if(editName2!=""){
            firebasedatabase.child("alternative_food_name").child(value).child(editName2).remove();
            alert('Successfully deleted "'+editName1.toUpperCase()+'" as 2nd alternative');
          }
        }


        dialog.close();
        firebasedatabase.off();
        dialog.querySelector('.agree-filipino').removeEventListener('click',nothing,false);
    });
  });
  dialog.showModal();


  // No edit
  dialog.querySelector('.close-filipino').addEventListener('click', function() {
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
		    row += '<tr><td class="col-xs-2">' + cnt + '</td><td class="col-xs-6 center-text">' + childData + '</td><td class="col-xs-4"><div class="row"><button id="editFilipinoButton" value="'+ childData.toLowerCase() +'" class="mdl-button mdl-js-button mdl-button--colored">Filipino Name</button><button id="editButton" value="'+ childData.toLowerCase() +'" class="mdl-button mdl-js-button mdl-button--colored">Edit</button><button id="deletebutton" value="'+ childData.toLowerCase() +'" class="mdl-button mdl-js-button mdl-button--colored">Delete</button></div></td></tr>';
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
