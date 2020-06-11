let express = require('express');
let router = express.Router();
let fs = require('fs');

let add = async (val)=>{
   let obj = {
       table: []
    };
    let json = JSON.stringify(obj);
    fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
       if (err){
           console.log(err);
       } else {
       obj = JSON.parse(data);
       obj.table.push({id:obj.table[obj.table.length-1].id+1, value:val});
       json = JSON.stringify(obj);
       fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
           if (err) throw err;
           console.log('Data added to file');
       });
   }});
}

let remove = async (val)=>{
   let data =  await fs.readFileSync('myjsonfile.json');
   let remove = val;
   let json = JSON.parse(data);
   let table = json.table;
   json.table = table.filter((table) => { return table.id != remove });
   fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
   console.log("Deleted Successfully")
}

let list = async ()=>{
   fs.readFile('myjsonfile.json', (err, data) => {
       if (err) throw err;
       let jsonData = JSON.parse(data);
   });
}

const edit = async (val,new_value)=>{
   const data = await fs.readFileSync('myjsonfile.json');
   const remove = val;
   var json = JSON.parse(data);

   for (let i = 0; i < json.table.length ; i++) {
       if (json.table[i].value == val)
           var id_var = json.table[i].id
       }

   const table = json.table;
   json.table = table.filter((table) => { return table.value !== remove });
   fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
   console.log("Edited Successfully")

   let obj = {
       table: []
    };
    var json = JSON.stringify(obj);
    fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
       if (err){
           console.log(err);
       } else {
       obj = JSON.parse(data);
       obj.table.push({id:id_var, value:new_value});
       json = JSON.stringify(obj);
       fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
           if (err) throw err;
       });
   }});

}

router.get('/list', function(req, res){ //list
   fs.readFile('myjsonfile.json', (err, data) => {
      if (err) throw err;
      let jsonData = JSON.parse(data);
      res.send(jsonData);
  });
});

router.post('/add/:value', function(req, res){ //add
   res.send(add(req.params.value));
});

router.put('/edit/:old/:new', function(req, res){ //edit
   res.send(edit(req.params.old,req.params.new));
});

router.delete('/delete/:id', function(req, res){ //delete
   res.send(remove(req.params.id));
});

module.exports = router;