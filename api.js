
async function dataAsync() {
    let response = await fetch('http://127.0.0.1:3000/todo/list');
    let data = await response.json();
    insertdataAsyn(data);
}
function insertdataAsyn(data) {
    var text = document.createElement("div")
    text.setAttribute("id" , "text");
    document.getElementById("api").appendChild(text)
    for (var i = 0; i < data.table.length; i++) {
      var div = document.createElement("div");
      var btn = document.createElement("BUTTON");
      btn.setAttribute("id" , data.table[i].id);
      btn.setAttribute("onClick" ,"deleteValue();");
      btn.innerHTML = "DELETE";
      var btnedit = document.createElement("BUTTON");
      btnedit.setAttribute("id" , data.table[i].id);
      btnedit.setAttribute("value" , data.table[i].value);
      btnedit.setAttribute("onClick" ,"editValue();");
      btnedit.innerHTML = "EDIT";
      div.innerHTML = 'UserId: ' + data.table[i].id +' Title: ' + data.table[i].value + '<hr>';
      document.getElementById("api").appendChild(btn);
      document.getElementById("api").appendChild(btnedit);
      document.getElementById("api").appendChild(div);
    }
}
dataAsync();

function getInputValue(){
    var inputVal = document.getElementById("myInput").value;
    fetch('http://127.0.0.1:3000/todo/add/'+inputVal,{
        method: 'POST',
    });
}

function deleteValue(){
    fetch('http://127.0.0.1:3000/todo/delete/'+event.srcElement.id,{
        method: 'DELETE'
    });
}


function editValue(){

    document.getElementById("myBtn_edit").style.display = "block";
    document.getElementById("myBtn").style.display = "none";
    let old_value = document.getElementById("myInput").value;
    document.getElementById("myInput").value = event.srcElement.value;
}

function geteditedValue(){
    // let old_value = "aa"
    let new_value = document.getElementById("myInput").value
    fetch('http://127.0.0.1:3000/todo/edit/'+old_value + '/' + new_value,{
        method: 'PUT'
    });
    document.getElementById("myBtn").style.display = "block";
    document.getElementById("myBtn_edit").style.display = "none";
    document.getElementById("myInput").value = ""
}