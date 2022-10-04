'use strict'

var Project = require('../modelos/projects')
var fs = require('fs');
var path = require('path');
const { exists } = require('../modelos/projects');

var controller = {
    home: function (req, res) {
        return res.status(200).send({

            message: "Página Home"
        })
    },

    test: function (req, res) {
        return res.status(200).send({

            message: "Página Test del controlador"
        })
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.langs = params.langs;
        project.year = params.year;
        project.category = params.category;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el projecto' });

            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe' })

        Project.findById(projectId, (err, project) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!project) return res.status(404).send({ message: 'El proyecto no existe' })

            return res.status(200).send({
                project
            })
        })
    },

    getProjects: function(req, res){
    Project.find({}).exec((err, projects)=>{
        if(err)return res.status(500).send({message: 'Error al devolver los datos'})
        
        if(!projects)return res.status(404).send({message: 'No se encontraron proyectos'})

        return res.status(200).send({projects})
    })
},

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) res.status(500).send({ message: "Error al actualizar" })
            if (!projectUpdated) return res.status(404).send({ message: "No existe el proyecto para actualizar" })

            return res.status(200).send({
                project: projectUpdated
            })
        })
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if (err) res.status(500).send({ message: "Error al actualizar" })
            if (!projectRemoved) return res.status(404).send({ message: "No existe el proyecto para actualizar" })

            return res.status(200).send({
                project: projectRemoved
                //project es una propiedad
            })
        })
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = "Imagen no subida.."

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gift') {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) res.status(500).send({ message: "La imagen no se ha subido" });
                    if (!projectUpdated) return res.status(404).send({ message: "La imagen no existe" });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                })

            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: "Extension no valida "
                    })
                })
            }
        } else {
            return res.status(500).send({
                message: fileName
            })
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.access(path_file,fs.constants.F_OK,(err)=>{
            if(err){
                return res.status(200).send({message: "No exisite la imagen"}); 
            }else{
                return res.sendFile(path.resolve(path_file));
            }
        });
    }

};

module.exports = controller;