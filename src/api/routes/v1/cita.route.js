const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/citas.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const {
  cancelar,
  agendarCita
} = require("../../validations/cita.validation");
const {citasController} = require("../../loaders/citas/dependencyInjector.cita")

const router = express.Router();
/**
 * @api {post} v1/citas/agendar Agendar Cita
 * @apiDescription Agendar Cita
 * @apiVersion 1.0.0
 * @apiName agendarCita
 * @apiGroup Cita
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization   data's access token
 * 
 * @apiParam  {String}     sede              Sede de la cita
 * @apiParam  {String}     medioSolicitud    medio por el cual se solicita la cita
 * @apiParam  {String}     Bprogramada       si la cita es programada
 * @apiParam  {String}     tipoCita          que tipo de cita es
 * @apiParam  {String}     idPaciente        documento identificacion del paciente
 * @apiParam  {String}     Ipaciente         id del paciente
 * @apiParam  {String}     fechaSolicitada   fecha de la solicitud de la cita
 * @apiParam  {String}     fechaAsignada      fecha de la asignacion de la cita
 * @apiParam  {String}     prestador         codigo del prestador de la cita
 * @apiParam  {String}     especialidad      codigo especialidad del prestador
 * @apiParam  {String}     consultorio       codigo del consultorio del prestador
 * @apiParam  {String}     administradora    codigo de la administradora
 * @apiParam  {String}     tipoConsulta      codigo tipo de consulta
 * @apiParam  {String}     fechaDeseada      fecha y hora deseada de la cita
 * @apiParam  {String}     idTurno           id del turno de la cita
 * @apiParam  {String}     idConsultorio     id del consultorio de la cita
 * @apiParam  {String}     idServicio         id del servicio de la cita
 * @apiParam  {String}     usuario            usuario que solicita la cita
 * 
 */
router
  .route("/agendar")
  .post(validate(agendarCita),(req, res , next) => citasController.agendarCita(req,res, next) ); //controller.agendarCita

  /**
   * @api {post} v1/citas/cancelar Cancelar Cita
   * @apiDescription Cancelar Cita
   * @apiVersion 1.0.0
   * @apiName cancelarCita
   * @apiGroup Cita
   * @apiPermission admin
   * 
   * @apiHeader {String} Authorization   data's access token
   * 
   * @apiParam {string}   idCita              id de la cita a cancelar
   * @apiParam {string}    fechaCancelacion   fecha en la que se realiza la cancelación
   * @apiParam {string}    motivoCancelacion  motivo de la cancelacion (codigo establecido para ese motivo)
   * @apiParam {string}    observacion        observacion sobre el motivo de la cancelación
   * @apiParam {string}    personaCancelacion el usuario que hizo la cancelación
   * @apiParam {string}    medioCancelacion   codigo establecido para ese medio de cancelacion
   * 
   */
  router
  .route("/cancelar")
  .post(validate(cancelar), (req,res, next) => citasController.cancelarCita(req, res, next) );//controller.cancelarCita

module.exports = router;
