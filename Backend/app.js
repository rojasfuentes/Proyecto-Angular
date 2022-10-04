//Configuración de app y body-parser para cargar el servidor
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos Rutas
var projects_routes = require('./routes/projects');



//middlewares   
//Es un método que se ejecuta antes de ejecutar la acción de un controlador de acuerdo al resultado de la peticion

app.use(bodyParser.urlencoded({extended:false})); //Es una configuración para usar bodyparser
app.use(bodyParser.json()); //Cualquier tipo de decisión se convierte a json

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas 
app.use('/api', projects_routes);

//exportar 
module.exports = app;