const db = require("../models");
const _ = require('lodash');
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    Contacts.create({name: req.body.name})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    Contacts.findOne({
        where:{
            id: parseInt(req.params.contactId)
        }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    
  
};

// Update one contact by id
exports.update = (req, res) => {
    Contacts.update(
        {name: req.body.name},
        {where: {id: parseInt(req.params.contactId)}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    Contacts.destroy({where: {id: parseInt(req.params.contactId)}})
    .then(data => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};
