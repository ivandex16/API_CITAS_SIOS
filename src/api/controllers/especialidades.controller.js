const { buildLogger , logger} = require("../../config/logger");
const APIError = require("../errors/api-error");

class EspecialidadController {
  #logger = logger;
  constructor(especialidadService) {
    this.especialidadService = especialidadService;
  }

  async obtenerEspecialidades(req, res, next) {
    try {
      const especialidades =
        await this.especialidadService.obtenerEspecialidades();
      return res.status(especialidades.status).json(especialidades);
    } catch (error) {
      this.#logger.error(error.message);
      return next(
        new APIError({ status: error.status, message: error.message })
      );
    }
  }


  async obtenerPrestadoresPorEspecialidad(req, res, next) {
    try {
      console.log("req.params", req.params);
      const { codEspecialidad } = req.params;
     const  id = codEspecialidad;
      const prestadores =
        await this.especialidadService.obtenerPrestadoresPorEspecialidad(id);
      return res.status(prestadores.status).json(prestadores);
    } catch (error) {
      this.#logger.error(error.message);
      return next(
        new APIError({ status: error.status, message: error.message })
      );
    }
  }
}

module.exports = EspecialidadController;
