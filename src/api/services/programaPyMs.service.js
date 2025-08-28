const httpStatus = require("http-status");
const APIError = require("../errors/api-error");
const BaseMethod = require("../models/methods/base.method");
const { logger } = require("../../config/logger");

class ProgramaPyMSService extends BaseMethod {
  constructor() {
    super();
  }

  /*******************************************************************************
   * @method ValidarProgramaPyMS
   * @public
   * @author  Ivan Cabeza
   * @description Metodo para validar si el paciente tiene un programa asociado
   * @param {*} atrs
   * @returns
   **************************************************************************/
  async ValidarProgramaPyMS(atrs) {
    const idProgramaPyMS = atrs.idProgramaPyMS ;

    try {
      if (!idProgramaPyMS || idProgramaPyMS === 0) {
        return {
          idProgramaPyMS: "",
          bProgramaPyMS: 0, //-> booleano en bit
        };
      }

      const programaPyMS = await this.programaAplicaPaciente({
        Ipaciente: atrs.Ipaciente,
        administradora: atrs.administradora,
        idProgramaPyMS: atrs.idProgramaPyMS,
      });

      return {
        idProgramaPyMS: programaPyMS,
        bProgramaPyMS: 1, //-> booleano en bit
      };
    } catch (error) {
      // console.log("error al consultar programaPyMS:", error.message);
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /*****************************************************************************************
   * @method ValidarProgramaPyMS
   * @public
   * @author  Ivan Cabeza
   * @description Metdo para relacionar el programa al paciente en la base de datos
   * @param {object} atrs
   * @param {string} atrs.Ipaciente
   *****************************************************************************************/
  async RelacionarProgramaPyMS(atrs) {
    const pa_OperacionesPacientes = ` exec pa_OperacionesPacientes @OPERACION=:operacion,@IdPaciente=:idPaciente,@Identificacion=N''`;
    const pa_OperacionesPacientesReplacements = {
      idPaciente: atrs.Ipaciente,
      operacion: "BUSCARPORID",
    };

    try {
      const response = await this.sql.executeSql(
        pa_OperacionesPacientes,
        pa_OperacionesPacientesReplacements
      );

      if (response.error) {
        throw new APIError({
          status: response.status,
          message:
            response.message ||
            "No se  pudo relacionar el programa al paciente.",
        });
      }
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /*****************************************************************************************
   * @method ValidarConfiguracionProgramasAsociados
   * @public
   * @author  Ivan Cabeza
   * @description Metodo para validar si el paciente tiene programas asociados
   * @param {object} atrs
   * @param {string} atrs.Ipaciente
   *****************************************************************************************/
  async ValidarConfiguracionProgramasAsociados(atrs) {
    try {
      const programaAplicaPaciente = ` exec Citas.usp_ProgramasAplicaPaciente @sIdPaciente=:Ipaciente `;
      const programaAplicaPacienteReplacements = {
        Ipaciente: atrs.Ipaciente,
      };
      const response = await this.sql.executeSql(
        programaAplicaPaciente,
        programaAplicaPacienteReplacements
      );

      if (response.error) {
        throw new APIError({
          status: response.status,
          message:
            response.message ||
            "No se ha configurado los programas asociados al paciente.",
        });
      }
      return response.datos;
    } catch (error) {
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /*****************************************************************************************/
  async programaAplicaPaciente(atrs) {
    try {
      const programaAplicaPaciente = ` exec Citas.usp_ProgramasAplicaPaciente @sIdPaciente=:Ipaciente, @CodigoProc=N'',@CodigoPlan=:codigoPlan`;
      const programaAplicaPacienteReplacements = {
        Ipaciente: atrs.Ipaciente,
        codigoPlan: atrs.administradora,
      };

      //busca los programas PyMS que aplican con el paciente
      const response = await this.sql.executeSql(
        programaAplicaPaciente,
        programaAplicaPacienteReplacements
      );

      if (response.error) {
        throw new APIError({
          status: response.status,
          message:
            response.message ||
            "No se ha configurado los programas asociados al paciente.",
        });
      }

      //si no se encuentran programas asociados al paciente se retorna un error
      if (response.datos.length === 0) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: `El paciente no aplica a programas PyMS`,
          isPublic: true,
        });
      }

      //se busca el programa que se selecciono y se valida si el paciente aplica a ese programa
      let objectQueryString = {
        select: "PR.Descrip, CodigoPrograma ",
        from: `dbo.relProgramasPacientes RPP
                            INNER JOIN dbo.Programas PR ON PR.Codigo = RPP.CodigoPrograma
                            INNER JOIN dbo.Pacientes PA ON PA.Id = RPP.IdPaciente`,

        where: `RPP.Asociado = 1 
                            AND RPP.IdPaciente = ${atrs?.Ipaciente}
                            AND PR.Codigo = ${atrs?.idProgramaPyMS}
                            AND PR.Activo = 1`,
      };

      const programa = await super.consulta(objectQueryString);

      // si no le aplica el programa seleccionado se retorna un mensaje con los programas sugeridos
      if (programa.datos.length === 0) {
        const programasAsociados =
          await this.ValidarConfiguracionProgramasAsociados({
            Ipaciente: atrs?.Ipaciente,
          });

        //si el paciente no tiene asociado el programa que se recibe, se retorna un mensaje con los programas sugeridos
        const programasSugeridos = programasAsociados
          .map((item) => item.Programas.replace(/\n/g, ", "))
          .join(", ");

        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: `El paciente no es elegible para el programa seleccionado. Programas sugeridos: ${programasSugeridos}`,
          isPublic: true,
        });
      }
      const codigoPrograma = programa.datos[0].CodigoPrograma;
      return codigoPrograma;
    } catch (error) {
      throw new APIError({
        message: `Error en el procedimiento usp_ProgramasAplicaPaciente: ${error.message} `,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
      });
    }
  }
}

module.exports = ProgramaPyMSService;
