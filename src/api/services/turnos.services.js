const { object } = require("joi");
const {
  validarPropiedadesObjeto,
  omitProperties,
} = require("../utils/functionHelpers");
const httpStatus = require("http-status");
const APIError = require("../errors/api-error");
const { logger } = require("../../config/logger");
const { calcularTurnosPorBloques } = require("../utils/turnosHelper.utils");

class TurnosServices {
  constructor(turnosMethods) {
    this.turnosRepositori = turnosMethods;
  }

  async obtenerTurnos(turnosDto) {
    /*copiamos el objeto turnosDto y eliminamos la propiedad idPrestador
     para la validacion del objeto,ya que es opcional */
    const propiedadesTurno = { ...turnosDto };
    const propiedadesTurnoValidas = omitProperties(propiedadesTurno, [
      "idPrestador",
    ]);

    //validar si el objeto no es nulo o indefinido
    if (
      turnosDto == null ||
      !validarPropiedadesObjeto(propiedadesTurnoValidas)
    ) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Los datos proporcionados no puede ser nulo o indefinido.",
      });
    }

    //procedimiento que trae los turnos por prestador
    const execObtenerTurnosPrestador = `exec [Citas].[usp_ObtenerTurnosPrestadoresClinicaAlergia] @sPrestador=:idPrestador, @sEspecialidad=:codEspecialidad, @sIdSede=:sede,@fFechaInicial=:fechaInicial,@fFechaFinal=:fechaFinal`;

    //procedimiento que trae los turnos por especialidad
    const execCobtenerTurnosEspecialidad = `exec [Citas].[usp_ObtenerTurnosEspecialidad] @sEspecialidad=:codEspecialidad,@sIdSede=:sede,@fFechaInicial=:fechaInicial,@fFechaFinal=:fechaFinal`;


    //procedimiento que trae los turnos asignados por especialidad
    //const execpaDisponCitas = `exec paDisponCitas @FechaInicio=:fechaInicial,@Prestador=:idPrestador,@FechaFin=:fechaFinal,@Especialidad=:codEspecialidad ,@Opcion=:opcion`;

    const execpaDisponCitas = `exec paDisponCitas @Prestador=:idPrestador ,@Especialidad=:codEspecialidad, @FechaInicio=:fechaInicial,@FechaFin=:fechaFinal`;


   //valores por defecto para el procedimiento
    const replacements = turnosDto;
    
    
    try {
        //validamos que si no viene un prestador , se ejecute el procedimiento para obtener los turnos por especialidad
        if (turnosDto.idPrestador == "") {
            //ejecutamos el priceedure para obtener los turnos por especialidad
                const response = await this.turnosRepositori.executeSql(
                execCobtenerTurnosEspecialidad,
                replacements
                );

                
                if (response.status !== httpStatus.OK) {
                throw new APIError({
                    status: response.status,
                    message: response.message,
                });
                }

            //ejecutamos el procedure para obtener los turnos ocupados
            //  se crea el objeto con lkos valores por defecto para el procedimiento
            //  y se le asigna la propiedad opcion con el valor de filtrarSoloPorEspecialidadYfecha    
            const turnosAsignadosReplacements = {
            ...replacements,
            opcion: "filtrarSoloPorEspecialidadYfecha",
            };
           
            const turnosAsignados = await this.turnosRepositori.executeSql(
            execpaDisponCitas,
            turnosAsignadosReplacements
            );

            
            //se calcula los turnos por fechas y el rango de horas segun la duracion
            const result = calcularTurnosPorBloques(response.datos, turnosAsignados.datos);
            
            
            return {
                status: response.status,
                datos: result,
            };
        } else {
            //ejecutamos el procedure para obtener los turnos por prestador
            const response = await this.turnosRepositori.executeSql(
            execObtenerTurnosPrestador,
            replacements
            );
            if (response.status !== httpStatus.OK) {
            throw new APIError({
                status: response.status,
                message: response.message,
            });
            }

            
            const turnosAsignadosReplacements = {
                ...replacements,
                opcion: null,
                };

            const turnosAsignados = await this.turnosRepositori.executeSql(
                execpaDisponCitas,
                turnosAsignadosReplacements
                );

            const result = calcularTurnosPorBloques(response.datos, turnosAsignados.datos);
             
            return {
                status: response.status,
                datos: result,
            };
        }
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        status: error.status || httpStatus.BAD_REQUEST,
        message: error.message || "Error al obtener los turnos",
      });
    }
  }
}

module.exports = TurnosServices;
