const httpStatus = require("http-status");
const { buildLogger , logger} = require("../../config/logger");
const APIError = require("../errors/api-error");

class EspecialidadController {
  #logger = logger;
  constructor(especialidadService) {
    this.especialidadService = especialidadService;
  }

  async obtenerEspecialidades(req, res, next) {
   
    try {
      const response = await this.especialidadService.obtenerEspecialidades();

      
      if (response.error) {
        throw new APIError({
          status: httpStatus[500],
          message: response.message,
        });
      }

      res.status(response.status).json(response);
    

    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
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
