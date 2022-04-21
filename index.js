const express = require('express');
const service = require('./Services/service');
const app = express();
var bodyParser = require("body-parser");
const port = 8082;
const data = require('./Services/service')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/user', (req, res) => {
 res.status(200).json({
     mensaje: "User List",
     datos : data.getUsers()
 });
});

app.get('/user/:id', (req, res) => {
    
    let id = req.params.id;

    let user = service.getUserById(id);

if(user != null)
{
    res.status(200).json({
        mensaje: "User",
        datos : user
    });
}
res.status(404).json({
    mensaje: "User Not Found",
    datos : null
});   


   });

   app.put('/user/:id', (req, res) => {
        let id = req.params.id;

        let user = req.body;

        service.updateUser(id, user);

        res.status(200).json({
            mensaje : "User Updated"
        });

   });


app.post('/user', (req, res) => {

   let {body : newUser} =  req;

    let user = service.createUser(newUser);

    res.status(201).json({
        mensaje : "User Created",
        body : user
    }); 

});

app.delete('/user/:id', (req, res) =>{

    let id = req.params.id;
    service.deleteUser(id);

res.status(200).json({
        mensaje : "Usuario Eliminado"
    }); 
});




app.listen(port, () => {
    console.log('Listening at http://localhost:'+port+"/");
});