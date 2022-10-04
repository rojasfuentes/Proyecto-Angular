'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema= Schema ({
    name: String,
    description:  String,
    langs : String,
    year: Number,
    category: String,
    image: String

});

//Re importante
module.exports = mongoose.model('Project', ProjectSchema);
//En el primer parametro selecciona la base de datos donde se va a guardar los documentos, y el segundo el esquema que vamos a usar para crear objetos