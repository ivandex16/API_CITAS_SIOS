const express = require("express");
const {especialidadesController} = require("../../loaders/especialidades/dependencyInjector.especialidades");
const validate = require("express-validation");
const {listarPrestadores} = require("../../validations/prestador.validation")
const router = express.Router();



router.route("/listar")
    .get((req, res, next) => especialidadesController.obtenerEspecialidades(req, res, next)); //controller.agendarCita


router.route("/prestadores/:codEspecialidad")
    .get( validate(listarPrestadores), (req, res, next) => especialidadesController.obtenerPrestadoresPorEspecialidad(req, res, next)); //controller.agendarCita
module.exports = router;