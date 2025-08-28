const {
  agendarCitas,
  cancelarCitas,
  CitasMethods,
} = require("../models/methods/citas.method");
const {
  citaSucces,
  citaError,
  responseCitaCancel,
  citaNoCancelada,
} = require("../../config/messageResponses");
const httpStatus = require("http-status");
const { logger } = require("../../config/logger");
const APIError = require("../errors/api-error");
const { assingNameToObjectProp } = require("../utils/functionHelpers");
const CitaDTO = require("../dtos/citas/cita.dto");
const { procedureAgendarCita } = require("../models/querys/citas.query");

class CitasService {
  constructor(citaMethods, programaPyMSService) {
    this.citaRepository = citaMethods;
    this.programaPyMSService = programaPyMSService;
  }
  /*********************************************
   * @public
   * @method agendarCitaService
   * @description Metodo para agendar una cita
   * @author  Ivan Cabeza
   * @param {object} citaData 
  
    * @param {string} citaData.sede
    * @param {string} citaData.medioSolicitud
    * @param {string} citaData.Bprogramada
    * @param {string} citaData.tipoCita
    * @param {string} citaData.idPaciente
    * @param {string} citaData.Ipaciente
    * @param {string} citaData.fechaSolicitada
    * @param {string} citaData.fechaAsignada
    * @param {string} citaData.prestador
    * @param {string} citaData.especialidad
    * @param {string} citaData.consultorio
    * @param {string} citaData.administradora
    * @param {string} citaData.tipoConsulta
    * @param {string} citaData.fechaDeseada
    * @param {string} citaData.idTurno
    * @param {string} citaData.idConsultorio
    * @returns 
   **********************************************/
  async agendarCitaService(citaDto) {

     try {
       //valida si la cita es con programaPyMS
       const programaPyMS = await this.programaPyMSService.ValidarProgramaPyMS(
         citaDto
       );

       
       if (programaPyMS.bProgramaPyMS !== 0 ) {
         
         //valida si el paciente tiene programas asociados
         const validacionProgramas = await this.#validacionProgramas(citaDto);
   
       }

      //obtiene el turno del prestador
      const turno = await this.#obtenerTurnoPrestadores(citaDto);


      const replacements = { ...citaDto, ...programaPyMS };

      const procedimientoAgendarCita = `exec paInsCitas @Localidad=:sede,@MedioSolicitud=:medioSolicitud,
      @Programada=:Bprogramada,@TipoCita=:tipoCita,@IdPaciente=:idPaciente,
      @FechaSolicitada=:fechaSolicitada,@FechaAsignada=:fechaAsignada,
      @Prestador=:prestador,@Especialidad=:especialidad,@Consultorio=:consultorio,
      @Adm=:idPlan,@Autorizacion=N'',@TipoConsulta=:tipoConsulta,@Ciclo=N'1',
      @Cantidad=N'1',@Paciente=:Ipaciente,@Observacion=N'',@IdTurno=${turno.Id},@idConsultorio=:idConsultorio,
      @xmlProcedimientos=N'<Procedimientos><row IdProcedimiento="${citaDto.idServicio}"  IdProgramaPyMS="${programaPyMS.idProgramaPyMS}" />
      </Procedimientos>',@FechaDeseada=:fechaDeseada,@bProgramaPyMS=:bProgramaPyMS,@sAsignadaFecha=N'FA001',@sUsuarioRegistro=:usuario`;


     
      const response = await this.citaRepository.executeSql(
         procedureAgendarCita(turno, citaDto, programaPyMS),
        replacements
      );


        const citaAgendada = assingNameToObjectProp(response.datos, "idCita")
      
      // const citaAgendada = response.datos.map((item) =>
      //   assingNameToObjectProp(item, "idCita")
      // );

      if (response.error && response.code == 50000) {
        throw new APIError({
          status: httpStatus.CONFLICT,
          message: response.message,
        });
      }
      return {
        status: httpStatus.OK,
        message: citaSucces.message,
        datos: response.datos,
      };
    } catch (error) {
      logger.error(error.message);
      if (
        error.message.includes(
          "El Paciente ya posee una cita asignada en la fecha y hora seleccionada"
        ) ||
        error.message.includes(
          "No hay turno disponible para la fecha seleccionada"
        )
      ) {
        logger.error(error.message);
        throw new APIError({
          message: error.message,
          status: httpStatus.CONFLICT,
        });
      }

      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /***************************************************************
   * @public
   * @method cancelarCita
   * @author  Ivan Cabeza
   * @description metodo para cancelar una cita
   * @param {object} cancelarCitaDto
   * @returns
   **************************************************************/
  async cancelarCita(cancelarCitaDto) {
    try {
      //*se verifica si la cita ya se encuentra cancelada
      const consultaCita = `SELECT Cancelada  FROM ConsultasMedicas WHERE Id = :idCita`;
      const replacementsConsultaCita = {
        idCita: cancelarCitaDto.idCita,
      };

      const cita = await this.citaRepository.executeSql(
        consultaCita,
        replacementsConsultaCita
      );
      if (cita.datos.Cancelada) {
        throw new APIError({
          message: "La cita ya ha sido cancelada.",
          status: httpStatus.CONFLICT,
        });
      }

      //* si la cita no se ha candelado previamente , entonces se continua con el proceso de cancelacion
      const cancelarCitaProcedure = `exec paCancelacionCitas @Id=:idCita,@Cancelada=1,
                          @FechaCancelacion=:fechaCancelacion,@MotivoCancelacion=:motivoCancelacion,
                          @ObservacionCancelacion=:observacion,@PersonaCancelacion=:personaCancelacion,
                          @MedioCancelacion=:medioCancelacion`;

      const replacements = cancelarCitaDto;
      const response = await this.citaRepository.executeSql(
        cancelarCitaProcedure,
        replacements
      );
      if (response.error ) {
        throw new APIError({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: response.message,
        });
      }
      return {
        status: responseCitaCancel.status,
        message: responseCitaCancel.message
        
      };
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /************************************************************************************
   * @method obtenerTurnoPrestadores
   * @private
   * @author  Ivan Cabeza
   * @description metodo privado para obtener los turnos disponibles de los prestadores
   * @param {object} param0
   * @param {string} param0.fechaAsignada || fecha de la cita
   * @param {string} param0.prestador || id del prestador del servicio medico
   * @param {string} param0.especialidad || id de la especialidad
   * @param {string} param0.sede || id de la sede
   * @returns
   *************************************************************************************/
  async #obtenerTurnoPrestadores({
    fechaAsignada,
    prestador,
    especialidad,
    sede,
  }) {
    const procedimientoObtenerTurnosPrestadores = `
    exec [Citas].[usp_ObtenerTurnosPrestadores] @sPrestador=:prestador,@sEspecialidad=:especialidad,@sIdSede=:sede,@fFechaInicial=:fechaAsignada,
    @fFechaFinal=:fechaAsignada`;

    const replacements = {
      fechaAsignada: new Date(fechaAsignada).toISOString().split("T")[0],
      prestador,
      especialidad,
      sede,
    };

    try {
      const turnosPrestador = await this.citaRepository.executeSql(
        procedimientoObtenerTurnosPrestadores,
        replacements
      );

      if (turnosPrestador.status === 500) {
        throw new APIError({
          status: turnosPrestador.status,
          message: turnosPrestador.message,
        });
      }
      if (!turnosPrestador)
        throw new Error("Hubo en error en la busqueda de turnos");
      if (turnosPrestador.datos.length === 0) {
        throw new APIError({
          message: "No se encontraron turnos disponibles",
          status: httpStatus.NOT_FOUND,
        });
      }

      return turnosPrestador.datos;
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /*****************************************************************************************
   * @method validacionProgramas
   * @private
   * @author  Ivan Cabeza
   * @description metodo privado para validar si el paciente tiene programas asociados
   * @param {*} citaDto datos de la informacion de la cita: solo se toma el id del paciente
   ****************************************************************************************/
  async #validacionProgramas(citaDto) {
    try {
      // relaciona los programas PyMS que aplican con el paciente
      await this.programaPyMSService.RelacionarProgramaPyMS({
        Ipaciente: citaDto.Ipaciente,
      });

      //valida si el paciente ya le ha sido asignado un programa PyMS o regresa un error si no tiene programas asociados
      await this.programaPyMSService.ValidarConfiguracionProgramasAsociados({
        Ipaciente: citaDto.Ipaciente,
      });

      // //busca los programas PyMS que aplican al paciente y verifica que coincida con el programa seleccionado
      // await this.programaPyMSService.programaAplicaPaciente({
      //   Ipaciente: citaDto.Ipaciente,
      //   administradora: citaDto.administradora,
      //   idProgramaPyMS: citaDto.idProgramaPyMS,
      // });
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
      });
    }
  }
}

module.exports = CitasService;
