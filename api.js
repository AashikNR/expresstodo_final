
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
      div.innerHTML = 'UserId: ' + data.table[i].id +' Title: ' + data.table[i].value;
      document.getElementById("api").appendChild(div);
    }
}
dataAsync();