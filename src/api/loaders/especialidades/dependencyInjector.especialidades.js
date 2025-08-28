const { Sql } = require("../../../plugins/sequelize.plugin");
const EspecialidadController = require("../../controllers/especialidades.controller");
const BaseMethod = require("../../models/methods/base.method");
const EspecialidadService = require("../../services/especialidades.service");




const sql = new Sql();
const baseRepository = new BaseMethod(sql);
const especialidadesService = new EspecialidadService(baseRepository);
const especialidadesController = new EspecialidadController(
  especialidadesService
);


module.exports = {
  especialidadesController,
  especialidadesService,
  baseRepository,
};