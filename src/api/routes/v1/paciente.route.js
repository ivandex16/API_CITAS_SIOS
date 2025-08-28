/* eslint-disable linebreak-style */
const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/paciente.controller");
const { consultar, crear, actualizar, consultarCita } = require("../../validations/paciente.validation");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const { tokenAuthorize } =  require('../../middlewares/tokenAuthorize')
const {pacienteController} = require('../../loaders/pacientes/dependencyInjector.paciente')

const router = express.Router();

/**
 * Load paciente when API with pacienteId route parameter is hit
 */
//router.param('pacienteId', controller.load);



router
/**
 * @api {get} v1/paciente/consultar Consultar paciente
 * @apiDescription Consultar paciente
 * @apiVersion 1.0.0
 * @apiName consultar
 * @apiGroup Paciente
 * @apiPermission paciente
 * 
 * @apiParam  {String} [idPaciente] Id del paciente
 * @apiParam  {String} [tipoIdPaciente]
 *
 * @apiHeader {String} Authorization Token de acceso
 */
  .route("/consulta/")
  .get([validate(consultar)],(req,res,next)=> pacienteController.consultarPaciente(req,res,next));


  router
    /**
 * @api {post} v1/paciente/crear Crear paciente
 * @apiDescription Crear paciente
 * @apiVersion 1.0.0
 * @apiName crear
 * @apiGroup Paciente
 * @apiPermission paciente
 *
 * @apiParam  {String} [idPaciente] Id del paciente
 * @apiParam  {String} [tipoIdPaciente]
 *
 * @apiHeader {String} Authorization Token de acceso
 */
   .route("/crear")
   .post([validate(crear)],(req,res,next) => pacienteController.crearPaciente(req, res,next) );//controller.crearPaciente


  router
     /**
 * @api {post} v1/paciente/editar/:id Editar paciente
 * @apiDescription Editar paciente
 * @apiVersion 1.0.0
 * @apiName editar
 * @apiGroup Paciente
 * @apiPermission paciente
 *
 * @apiParam  {String} [idPaciente] Id del paciente
 * @apiParam  {String} [tipoIdPaciente]
 *
 * @apiHeader {String} Authorization Token de acceso
 */
  .route("/editar/:id")
  .put([validate(actualizar)],(req,res, next) => pacienteController.actualizarPaciente(req,res, next));



  router
     /**
 * @api {post} v1/paciente/consultarCita?identificacion=123456 consultar citas del paciente
 * @apiDescription consutar las citas pendientes del paciente
 * @apiVersion 1.0.0
 * @apiName consultaCita
 * @apiGroup Paciente
 * @apiPermission paciente
 *
 * @apiParam  {String} [idPaciente] Id del paciente
 *
 * @apiHeader {String} Authorization Token de acceso
 */

  .route("/consultarCita/")
  .get([validate(consultarCita)], (req, res, next) => pacienteController.consultarCitasPaciente(req, res, next));

  // router
  // .route("/cargaBasica")
  // .get(controller.maestroPacienteIniciaclizar)

module.exports = router;
