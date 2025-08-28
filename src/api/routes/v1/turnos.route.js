const express = require("express");
const validate = require("express-validation");
const {listarTurnos } = require("../../validations/turno.validation");
const { turnosController } = require("../../loaders/turnos/dependencyInjector.turnos");
const router = express.Router();




router.route("/listarTurnos")
    .post(validate(listarTurnos), (req, res, next) => turnosController.obtenerTurnos(req, res, next)); //controller.agendarCita


module.exports = router;