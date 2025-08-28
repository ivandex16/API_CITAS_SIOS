const AdministradorasController = require("../../controllers/administradora.controller");
const BaseMethod = require("../../models/methods/base.method");
const AdministradoraService = require("../../services/administradora.service");


const respository = new BaseMethod
const serviceAdm = new AdministradoraService(respository)
const controller= new AdministradorasController(serviceAdm)

module.exports = {
    controllerAdm : controller
}