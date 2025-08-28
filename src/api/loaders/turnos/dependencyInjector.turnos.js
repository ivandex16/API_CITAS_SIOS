const { Sql } = require("../../../plugins/sequelize.plugin");
const TurnosController = require("../../controllers/turnos.controller");
const BaseMethod = require("../../models/methods/base.method");
const TurnosServices = require("../../services/turnos.services");

const sql = Sql;
const turnosReposistory = new BaseMethod(sql);
const turnosService = new TurnosServices(turnosReposistory);
const turnosController = new TurnosController(turnosService);


module.exports = {
    turnosController,
    turnosService,
    turnosReposistory,
};