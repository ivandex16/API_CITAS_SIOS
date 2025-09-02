/* eslint-disable linebreak-style */
const httpStatus = require("http-status");
const Paciente = require("../paciente.model");
const APIError = require("../../errors/api-error");
const { Sql } = require("../../../plugins/sequelize.plugin");
const { buildLogger , logger} = require("../../../config/logger");
const {
  assingNameToObjectProp,
  dateSinZonaHorariaToString,
} = require("../../utils/functionHelpers");
const {
  citaSucces,
  citaCancelada,
} = require("../../../config/messageResponses");
const CitaModel = require("../citas.modelo");
const BaseMethod = require("./base.method");

//const logger = buildLogger(module.filename);

class CitasMethods extends BaseMethod {

  constructor(
    sql //* dependencia de clase de sequalize
  ) {
    super(sql); // Llama al constructor de la clase base primero
    
  }
  

  
  /**********************************************************************************
   * @method executeSql
   * @description ejecuta cualquier procedimiento almacenada que se le pase como parametro
   * @param {*} procedure | procedimiento almacenado
   * @param {*} replacements | parametros de entrada
   * @returns 
   **********************************************************************************/
 async  executeSql(procedure, replacements) {
    const response  = await this.sql.executeSql(procedure, {...replacements})
    return response;

 }

 /************************************************************
  * @public
  * @method findOne
  * @description | Metodo para buscar una cita por parametros
  * @param {object} params | parametros de busqueda
  * @returns 
  ************************************************************/
 async findOne(params) {
    const query = `SELECT * FROM ${params.table} WHERE ${params.column} IN ${params.elements}`
    const response  = this.executeSql()
    return response;
 }





  




 

}



module.exports = {
  CitasMethods,
};
