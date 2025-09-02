const { Sql } = require("../../../plugins/sequelize.plugin")



class BaseMethod {
    #sql  = new Sql()


    get sql() {
        return  this.#sql
    }

    /***********************************************************************************************************
     * @function consulta
     * @description | funcion que permite realizar una consulta ya preparada a sql
     * @author Ivan cabeza
     * @param {object} params 
     * @param {string} params.select | columnas a consultar , ejemplo "column1, column 2"
     * @param {string} param.from | nombre de la tabla a consultar 
     * @param {string} param.where | condicion de la busqueda ejemplo "columna1 = valor1 and column2 = valor2"
     * --------------------------------------------
     * ejemplo objeto a pasarle a la funcion:
     * -------------------------------------------
     * let objectQueryString = {
        select: "PR.Descrip, CodigoPrograma ",
        from: `dbo.relProgramasPacientes RPP
                            INNER JOIN dbo.Programas PR ON PR.Codigo = RPP.CodigoPrograma
                            INNER JOIN dbo.Pacientes PA ON PA.Id = RPP.IdPaciente`,

        where: `RPP.Asociado = 1 
                            AND RPP.IdPaciente = ${atrs?.Ipaciente}
                            AND PR.Codigo = ${atrs?.idProgramaPyMS}
                            AND PR.Activo = 1`,
      };
     ***********************************************************************************************************/
    async consulta(params) {
        let consulta = `select ${params.select} from ${params.from}`
        params?.where ? consulta += ` where ${params.where} ` : ''
        const  response = await this.#sql.query(consulta)
        return response
    }



    async  executeSql(procedure, replacements) {
        const response  = await this.#sql.executeSql(procedure, {...replacements})
        console.log("executeSql response", response)
        
        return response;
    
     }


     async  executeSql_(procedure, replacements) {
        const response  = await this.#sql.executeSql_(procedure, {...replacements})
        return response;
    
     }

    
}

module.exports = BaseMethod