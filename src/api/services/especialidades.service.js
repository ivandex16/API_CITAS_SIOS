const httpStatus = require("http-status");
const APIError = require("../errors/api-error");
const { logger } = require("../../config/logger");

class EspecialidadService {
  constructor(baseMethods) {
    this.especialidadRepository = baseMethods;
  }

  async obtenerEspecialidades() {
    const paConsultasCitas = `exec paConsultasCitas @Consulta=N'EspPrest',@Dato=N'',@Extra2=default,@Equipo=default`;
    try {
      const response = await this.especialidadRepository.executeSql_(
        paConsultasCitas
      );

     
      if (response.error) {
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: response.message,
        });
      }
      return {  status:httpStatus.OK, datos: response.datos  };
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }

  async obtenerPrestadoresPorEspecialidad(id) {
    const paConsultasCitas = `exec paConsultasCitas @Consulta=N'Prestadores',@Dato=N'${id}',@Extra2=default,@Equipo=default,@sTipoConsulta=N'Valor=%;'`;
    try {
      const response = await this.especialidadRepository.executeSql_(
        paConsultasCitas
      );
      if (response.error) {
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: response.message,
        });
      }
      return {  status:httpStatus.OK, datos: response.datos  };
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        status:  httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}

module.exports = EspecialidadService;
