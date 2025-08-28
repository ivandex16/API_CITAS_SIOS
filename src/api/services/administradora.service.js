const httpStatus = require("http-status")
const APIError = require("../errors/api-error")
const { logger } = require("../../config/logger")

class AdministradoraService {
     constructor(
        repository
     ) {
        this.repository = repository
     }

     /***********************************************************************
      * @function planesAdministradora
      * @description consulta los planes que pertenecen a una administradora
      * @desarrollador Ivan cabeza
      * @Creacion 2024/11/13
      * @param {string} idAdm | id de la administradora
      * @returns {object}
      ***********************************************************************/
    async planesAdministradora(idAdm) {

        try {
            const consulta = {
                select:"Id AS idPlan, Nombre, Administradora AS codAdministradora",
                from: "planadm",
                where: `Administradora = ${idAdm} AND Activo = 1` 
            }
            const response = await this.repository.consulta(consulta)

            if(response.status !== httpStatus.OK) {
                throw new APIError({
                    status: response.status,
                    message: response.message
                })
            };
            return response;
        } catch (error) {
            logger.error(error.message)
            throw new APIError({
                message: error.message,
                status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
              });

        }
    }
}

module.exports = AdministradoraService