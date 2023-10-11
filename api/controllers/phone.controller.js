const db = require("../models");
const _ = require('lodash');
const phoneModel = require("../models/phone.model");
const Phones = db.phones;
const Op = db.Sequelize.Op;

function postFilter(obj)
{
    return _.pick(obj, ['name', 'number']);
}

// Create phone
exports.create = (req, res) => {
    Phones.create(
        {
            name: req.body.name, 
            number: req.body.number, 
            contactId: parseInt(req.params.contactId)
        },
    )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll({
        where: {
            contactId : parseInt(req.params.contactId)
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
    Phones.findOne({
        where:{
            contactId: parseInt(req.params.contactId),
            id: parseInt(req.params.phoneId)
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

// Update one phone by id
exports.update = (req, res) => {
    Contacts.update(
        {
            name: req.body.name,
            number: req.body.number
        },
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

// Delete one phone by id
exports.delete = (req, res) => {
    Phones.destroy({
        where: {
            id: parseInt(req.params.phoneId), 
            contactId: parseInt(req.params.contactId)
        }})
    .then(data => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};