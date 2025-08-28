const {PacienteMethod} = require('../../models/methods/paciente.methods')
const {PacienteService} = require('../../services/paciente.service')
const PacienteController = require('../../controllers/paciente.controller')
const {Sql} = require('../../../plugins/sequelize.plugin')
const AdministradoraService = require('../../services/administradora.service')
const BaseMethod = require('../../models/methods/base.method')



const baseRepository = new BaseMethod()
const administradoraService = new AdministradoraService(baseRepository)
const sql = new Sql()
const pacienteRepository = new PacienteMethod(sql)
const pacienteService = new PacienteService( pacienteRepository, administradoraService)
const pacienteController = new PacienteController(pacienteService)


module.exports = {
    pacienteController,
    pacienteRepository,
    pacienteService,
  

}