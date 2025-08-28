const { QueryTypes } = require("sequelize");
const { replace } = require("lodash");
const { sequelize } = require("../config/sequalize");
const APIError = require("../api/errors/api-error");
const {  logger} = require("../config/logger");
const httpStatus = require("http-status");

class Sql {
  logger = logger;

  /**-------------------------------------------------------
   * @public
   * @author Ivan Cabeza
   * @description : ejecuta cualquier consulta que se le pase en formato string
   * @param {String} query | query a ejecutar
   * @param {Object} parametros | parametros a pasar al query
   * @returns {Object}
   ------------------------------------------------------------*/

  async executeSql(query, replacements) {
    try {
      const [result, metadata] = await sequelize.query(query, {
        replacements: replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      console.log("resulProce", result);
      return {datos: result, error : false , metadata}

    
    } catch (error) {
      this.logger.error(error.message);
      console.log("errorexecuteQueryString", error.status);

      const sqlError = error.original || error.parent || error;
      return {datos:null, error : true , message: sqlError.message, code: sqlError.number || error.status || httpStatus.INTERNAL_SERVER_ERROR, datos: [], metadata: {} }
    
    }
  }

  /******************************************************************
   * @description funcion para realizar una consulta sql ya preparada
   * @param {string} consulta
   ******************************************************************/
  async query(consulta) {
    try {
      const [results, metadata] = await sequelize.query(consulta);
      return {
        status: httpStatus.OK,
        datos: results,
        metadata: metadata,
      };
    } catch (error) {
      this.logger.log(error.message);
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        datos: [],
      };
    }
  }
}

module.exports = {
  Sql,
};
