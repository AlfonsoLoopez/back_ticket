const db = require("../models");
const Ticket = db.ticket;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.nombre) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // Create a admin
    const ticket = {
        nombre_completo: req.body.nombre_completo,
        nombre: req.body.nombre,
        paterno: req.body.paterno,
        materno: req.body.materno,
        curp: req.body.curp,
        edad: req.body.edad,
        telefono: req.body.telefono,
        celular: req.body.celular,
        correo: req.body.correo,
        grado: req.body.grado,
        municipio: req.body.municipio,
        asunto: req.body.asunto,
        estatus:"PENDIENTE"
    };

    // Save admin in the database
    Ticket.create(ticket)
        .then(data => {
            res.send({
                message: data || "Ticket creado exitosamente."
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error en la creacion de ticket."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Ticket.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Hay un errror en los ticket."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id_ticket;
    Ticket.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se pude buscar ticket id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error buscando el ticket con id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_ticket;

    Ticket.update(req.body, {
        where: { id_ticket: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ticket actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar ticket id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error editanto ticket id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id_ticket;

    Ticket.destroy({
        where: { id_ticket: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ticket borrado con exito!"
                });
            } else {
                res.send({
                    message: `No puedes borrar el ticket id=${id}.Tal vez el ticket no existe!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "NO se puede borrar el ticket id=" + id
            });
        });
};