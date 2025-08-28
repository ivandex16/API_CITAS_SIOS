const { logger } = require("../../config/logger");
const TurnosDTO = require("../dtos/turnos/turnos.dto");

class TurnosController {
  constructor(turnosService) {
    this.turnosService = turnosService;
  }

  async obtenerTurnos(req, res, next) {
    try {
      const body = req.body;
      const turnosDto = TurnosDTO.fromModel(body);
      const turnos = await this.turnosService.obtenerTurnos(turnosDto);

      return res.status(turnos.status).json(turnos);
    } catch (error) {
      next(error);
      logger.error(error.message);
    }
  }
}

module.exports = TurnosController;
