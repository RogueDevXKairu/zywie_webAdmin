firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $("#security-wrapper").hide();
        window.location="../login.html";
    }
});


var firebasedatabase = firebase.database().ref();
var display_table_items = document.getElementById("display-table-item");
var category = document.getElementById("category");
var selectOptionTable = document.getElementById("selectCat");

// firebaseQuery(category.getAttribute("energy-value"));

firebasedatabase.child("food_exchange").on('value', function(snapshot){
    selectOptionTable.innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.key;
        var option = '';
        option += '<option value="'+childData+'">'+childData+' KCal</option>';
        var html = selectOptionTable.innerHTML + option;
        selectOptionTable.innerHTML = html;
    });
    document.getElementById('loadingSpiner').style.display = 'none';
});

$('body').on('click','#editButton',function(){
    var dialog = document.querySelector('#editDialog');
    var value = $(this).val();
    var keyValue = $(this).attr("value-key");
    var energy = $(this).attr("category");
    dialog.querySelector('.mdl-dialog__content').innerHTML = '<input type="number" min="0" pattern="^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$" class="form-control" id="edit-food-item" value="'+value+'">';
    dialog.showModal();
    // Yes
    dialog.querySelector('.agree-edit').addEventListener('click', function nothing() {
        var editnew = dialog.querySelector('#edit-food-item').value;
        var convertedData = parseFloat(editnew);
        if(editnew!=""){
            if(editnew>=0){
                var toFloat = parseFloat(editnew);
                var dataEdit={}
                dataEdit[keyValue] = toFloat;
                firebasedatabase.child("food_exchange").child(energy).update(dataEdit);
                alert("Successfully edited");
                dialog.querySelector('.agree-edit').removeEventListener('click',nothing,false);
                dialog.close();
            }else{
                alert("Value must not be less than zero!");
            }
        }else{
            alert("Error in the fields. Please make sure it is not empty or the value is a correct float type!");
        }
    });
    // No edit
    dialog.querySelector('.close-edit').addEventListener('click', function() {
        dialog.close();
    });
});

function firebaseQuery(energy){
    firebasedatabase.child("food_exchange").child(energy).on('value', function(snapshot){
        display_table_items.innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            var childDatakey = childSnapshot.key;
            var data = childSnapshot.val();
            var row ="";
            row += '<tr><td class="col-xs-6">' + childDatakey.toUpperCase() + '</td><td class="col-xs-2 center-text">' + data + '</td><td class="col-xs-2"><button id="editButton" value="'+ data +'" value-key="'+childDatakey+'" category="'+energy+'" class="mdl-button mdl-js-button mdl-button--colored">Edit</button></td></tr>';
            var html = display_table_items.innerHTML + row;
            display_table_items.innerHTML = html;
        });
        document.getElementById('loadingSpiner').style.display = 'none';
    });
}


$('#selectCat').on('change', function() {
    category.innerHTML = this.value + ' KCal';
    category.setAttribute("energy-value",this.value);
    firebaseQuery(""+this.value);
});

function deleteEnergy() {
    var dialog = document.querySelector('#deleteDialog');
    dialog.showModal();
    var value = category.getAttribute("energy-value");
    dialog.querySelector('.mdl-dialog__content').innerHTML="This will permanently delete meal plan of "+value+" KCals";
    // Yes
    dialog.querySelector('.agree-del').addEventListener('click', function nothing() {
        if(value!=""){
            firebasedatabase.child("food_exchange").child(value).remove();
            firebaseQuery(category.innerHTML);
            alert("Successfully deleted "+value.toUpperCase()+" KCal Plan.");
            dialog.querySelector('.agree-del').removeEventListener('click',nothing,false);
            dialog.close();
        }else{
            alert("You have not selected any meal plan yet!");
        }
    });
    // No
    dialog.querySelector('.close-del').addEventListener('click', function() {
        dialog.close();
    });
}

function submitClick() {
    var totalenergy = document.getElementById('food-item').value;
    var fat = document.getElementById('food-item-fat').value;
    var fruit = document.getElementById('food-item-fruit').value;
    var meat_low = document.getElementById('food-item-meat-low').value;
    var meat_med = document.getElementById('food-item-meat-med').value;
    var milk = document.getElementById('food-item-milk').value;
    var rice = document.getElementById('food-item-rice').value;
    var sugar = document.getElementById('food-item-sugar').value;
    var vega = document.getElementById('food-item-vega').value;
    var vegb = document.getElementById('food-item-vegb').value;
    if(totalenergy != "" && fat!= "" && fruit!= "" && meat_low!= "" && meat_med!= "" && milk!= "" && rice!= "" && sugar!= "" && vega!= "" && vegb!= ""){
        if(totalenergy>700){
             firebasedatabase.child("food_exchange").child(totalenergy).set({
                "Fat": parseFloat(fat),
                "Fruit": parseFloat(fruit),
                "Meat_Low_fat": parseFloat(meat_low),
                "Meat_Med_fat": parseFloat(meat_med),
                "Milk": parseFloat(milk),
                "Rice": parseFloat(rice),
                "Sugar": parseFloat(sugar),
                "Vegetable_A": parseFloat(vega),
                "Vegetable_B": parseFloat(vegb)
            });
            alert("Successfully created a new meal plan.");
        }else{
            alert("Meal plan should be practically real! Should be greater than 700 Kcal");
        }
    }else{
        alert("Make sure all fields are not empty!");
    }
}


function filterTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("food-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$("#btnSignOut").click(function(){
	firebase.auth().signOut().then(function() {
 		window.location="/login.html";
	}).catch(function(error) {
	  	alert(error.message);
	});
});
