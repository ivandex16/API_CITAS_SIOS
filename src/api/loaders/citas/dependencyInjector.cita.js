const { Sql } = require("../../../plugins/sequelize.plugin");
const CitasController = require("../../controllers/citas.controller");
const { CitasMethods } = require("../../models/methods/citas.method");
const CitasService = require("../../services/citas.service");
const ProgramaPyMSService = require("../../services/programaPyMs.service")



const sql = new Sql()
const citaRepository = new CitasMethods(sql)
const programaPyMSService = new ProgramaPyMSService
const citaService = new CitasService(citaRepository,programaPyMSService)
const citasController = new CitasController(citaService)

module.exports = {
    citasController,
    citaService,
    citaRepository,

}
