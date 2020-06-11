var express = require('Express');
var app = express();
var todoRoute = require('./todoRoute.js');
const fetch = require("node-fetch");
var cors = require('cors')

app.use(cors({origin:true}))
app.use('/todo', todoRoute);
app.listen(3000, function() {
    console.log("server is running on port 3000");
});

once = ()=>{
    var obj = {
        table: []
     };
    obj.table.push({id: 1, value:"first"});
    var json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
        if (err) throw err;
    });
}
// once()
