let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/list', function(req, res){                     //list
   fs.readFile('myjsonfile.json', (err, data) => {
      if (err) throw err;
      let jsonData = JSON.parse(data);
      res.send(jsonData);
  });
});

router.post('/add/:value', function(req, res){                  //add  //post
   let obj = {
      table: []
   };
   let json = JSON.stringify(obj);
   fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
      if (err){
          console.log(err);
      } else {
      obj = JSON.parse(data);
      obj.table.push({id:obj.table[obj.table.length-1].id+1, value:req.params.value});
      json = JSON.stringify(obj);
      fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
          if (err) throw err;
      });
  }});
  let json_data_ = JSON.parse(fs.readFileSync('myjsonfile.json'));
  res.send(json_data_);
}
);

router.put('/edit/:old/:new', function(req, res){                     //edit  //put

   const data = fs.readFileSync('myjsonfile.json');
   const remove = req.params.old;
   var json = JSON.parse(data);
   for (let i = 0; i < json.table.length ; i++) {
       if (json.table[i].value == req.params.old)
           var id_var = json.table[i].id
       }
   const table = json.table;
   json.table = table.filter((table) => { return table.value !== remove });
   fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
   let obj = {
       table: []
    };
    var json = JSON.stringify(obj);
    fs.readFile('myjsonfile.json', 'utf8', (err, data)=>{
       if (err){
           console.log(err);
       } else {
       obj = JSON.parse(data);
       obj.table.push({id:id_var, value:req.params.new});
       json = JSON.stringify(obj);
       fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
           if (err) throw err;
       });
   }});
   let json_data = JSON.parse(fs.readFileSync('myjsonfile.json'));
   res.send(json_data);
});

router.delete('/delete/:id', function(req, res){                     //delete //delete
   let data =  fs.readFileSync('myjsonfile.json');
   let remove = req.params.id;
   let json = JSON.parse(data);
   let table = json.table;
   json.table = table.filter((table) => { return table.id != remove });
   fs.writeFileSync('myjsonfile.json', JSON.stringify(json, null, 2));
   res.send(json);
});

module.exports = router;