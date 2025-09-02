/* eslint-disable linebreak-style */
const {
  responsePacienteFound,
  pacienteError,
  pacientCreado,
} = require("../../config/messageResponses");
const {
  Modelpaciente,
  PacienteMethod,
} = require("../models/methods/paciente.methods");
const { buildLogger ,logger } = require("../../config/logger");
const APIError = require("../errors/api-error");
const httpStatus = require("http-status");
const ModeloPaciente = require("../models/paciente.model");
const path = require("path");
const { getCallerInfo } = require("../utils/functionHelpers");
const { queryGetCitaByPaciente, procedureBuscarPaciente, queryBuscarPacienteById, queryPacienteByIdentificacionYTipoId } = require("../models/querys/paciente.query");

// eslint-disable-next-line no-unused-vars
 
//const logger = buildLogger(path.basename(__filename));


class PacienteService {
  constructor( pacienteMethod, administradoraService ) {
    this.pacienteReposistory = pacienteMethod;
  }
  /**************************************************************************************************
   * @function consultarPorIdentificacionYtipoId
   * @author Ivan Cabeza
   * @description trae los datos del paciente solicitado
   * @fecha 2024-05-21
   * @param {object} params | objeto con la identificacioin del paciente y el tipo de identificacion
   * @param {string} params.idPaciente | identificacion del paciente 
   * @param {string} params.tipoIdPaciente | tipo de identificacion CC | TI
   * @returns 
   ***************************************************************************************************/
  async consultarPorIdentificacionYtipoId(consultarPacienteDto) {
    try {
      //const datosPaciente = await this.pacienteReposistory.consultarPaciente(consultarPacienteDto);
      const response  = await this.pacienteReposistory.executeSql(queryPacienteByIdentificacionYTipoId,consultarPacienteDto)
     

      if (!response.datos || response.error) {
        throw new APIError({
          message: pacienteError.message,
          status: httpStatus.NOT_FOUND,
          isPublic: true,
        });
      }
      
      return {
        status: responsePacienteFound.status,
        message: responsePacienteFound.message,
        datos: response.datos,
      };
    } catch (error) {
      logger.error(error.message, getCallerInfo());
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
      });
    }
  }


  /************************************************************
 * 
 * @function createPacienteService
 * @description funcion que recibe los siguientes parámetros:
 * @author Desarrollador Ivan Cabeza
 * @param {object} pacienteData 
 * @param {string} pacienteData.activo
 * @param {string} pacienteData.multado
 * @param {string} pacienteData.id
 * @param {string} pacienteData.identificacion
 * @param {string} pacienteData.ape1Afil
 * @param {string} pacienteData.ape2Afil
 * @param {string} pacienteData.nom1Afil
 * @param {string} pacienteData.nom2Afil
 * @param {string} pacienteData.fechaNac
 * @param {string} pacienteData.tipoID
 * @param {string} pacienteData.expedicion
 * @param {string} pacienteData.sexo
 * @param {string} pacienteData.estadoEmbarazo
 * @param {string} pacienteData.pais
 * @param {string} pacienteData.municipio
 * @param {string} pacienteData.localidad
 * @param {string} pacienteData.barrio
 * @param {string} pacienteData.zona
 * @param {string} pacienteData.dirAfil
 * @param {string} pacienteData.referenciaDireccion
 * @param {string} pacienteData.email
 * @param {string} pacienteData.telRes
 * @param {string} pacienteData.telOfic
 * @param {string} pacienteData.telCel
 * @param {string} pacienteData.historia
 * @param {string} pacienteData.sangre
 * @param {string} pacienteData.estadoCivil
 * @param {string} pacienteData.escolaridad
 * @param {string} pacienteData.profesion
 * @param {string} pacienteData.etnia
 * @param {string} pacienteData.bVCArmado
 * @param {string} pacienteData.bDiscapacidad
 * @param {string} pacienteData.bDesplazado
 * @param {string} pacienteData.raza
 * @param {string} pacienteData.idReligion
 * @param {string} pacienteData.creencia
 * @param {string} pacienteData.regimen
 * @param {string} pacienteData.nivel
 * @param {string} pacienteData.tipoUsuario
 * @param {string} pacienteData.ca
 * @param {string} pacienteData.carnet
 * @param {string} pacienteData.diagnostico
 * @param {string} pacienteData.codAdministradora
 * @param {string} pacienteData.tipoCotizante
 * @param {string} pacienteData.identificacionAcompañante
 * @param {string} pacienteData.tipoIdAcompañante
 * @param {string} pacienteData.nom1Acompañante
 * @param {string} pacienteData.nom2Acompañante
 * @param {string} pacienteData.ape1Acompañante
 * @param {string} pacienteData.ape2Acompañante
 * @param {string} pacienteData.parentescoAcompañante
 * @param {string} pacienteData.dirAcompañante
 * @param {string} pacienteData.telAcomp
 * @param {string} pacienteData.celularAcompañante
 * @param {string} pacienteData.identificacionResponsable
 * @param {string} pacienteData.tipoIdResponsable
 * @param {string} pacienteData.nom1Responsable
 * @param {string} pacienteData.nom2Responsable
 * @param {string} pacienteData.ape1Responsable
 * @param {string} pacienteData.ape2Responsable
 * @param {string} pacienteData.parentescoResponsable
 * @param {string} pacienteData.dirResponsable
 * @param {string} pacienteData.telResponsable
 * @param {string} pacienteData.celularResponsable
 * @param {string} pacienteData.municipioCatastrofe
 * @param {string} pacienteData.dirCatastrofe
 * @param {string} pacienteData.zonaCatastrofe
 * @param {string} pacienteData.grado
 * @param {string} pacienteData.fechaInsc
 * @param {string} pacienteData.fechaAfil
 * @param {string} pacienteData.pensionado
 * @param {string} pacienteData.fichaSisben
 * @param {string} pacienteData.parentesco
 * @param {string} pacienteData.fechaEPS
 * @param {string} pacienteData.condBenef
 * @param {string} pacienteData.grupoPoblacional
 * @param {string} pacienteData.muerto
 * @param {string} pacienteData.fechaMuerte
 * @param {string} pacienteData.origenMuerte
 * @param {string} pacienteData.certiDefuncion
 *********************************************************************/
  async createPaciente(crearPacienteDto) {
    const replacements = {
      identificacion: crearPacienteDto.identificacion
      , tipoId: crearPacienteDto.tipoID,
    }
    try {
      const pacienteExist = await this.pacienteReposistory.consultarPaciente({
        identificacion: crearPacienteDto.identificacion,
        //tipoIdentificacion: crearPacienteDto.tipoID,
      })

      //const buscarPacienteProcedure = `exec pa_OperacionesPacientes @OPERACION=N'BUSCAR',@Identificacion=:identificacion,@tipoId=N''`
      
      
      const buscarPaciente = await this.pacienteReposistory.executeSql(procedureBuscarPaciente,replacements)
     
      
      if(buscarPaciente.datos && buscarPaciente.error !== true) {
        return {
          status: httpStatus.CONFLICT,
          message: `El paciente ya existe en el sistema,por favor verifique 
          si existe mas de uno con la misma identificación por 
          favor consulte a la entidad pertinente que lo registro.`,
          datos:buscarPaciente.datos,
        }

     
        // throw new APIError({
        //   message: "El paciente ya existe en el sistema, por favor verifique",
        //   status: httpStatus.CONFLICT,
        //   isPublic: true,
        // });
      }

      


     
      const paciente = await this.pacienteReposistory.createPaciente(crearPacienteDto)
      

      if (paciente.error) {
        throw new APIError({
          message: paciente.message,
          status: httpStatus.INTERNAL_SERVER_ERROR,
          isPublic: true,
        });
      }
      return {
        status: httpStatus.OK,
        message: pacientCreado.message,
        datos:paciente.datos,
      }
    } catch (error) {
      console.log('errorCreatePaciente', error)
      logger.error(error.message)
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,

      })
    }


    
  }



  /*****************************************************************************************
   * @function updatePaciente
   * @description funcion que se encarga de actualizar los datos del paciente en base datos.
   * @author Desarrollador Ivan Cabeza
   * @param {string} idPaciente | id del paciente a actualizar.
   * @param {object} newDataPaciente   | objeto con los datos a actualizar.
   * 
   * @returns 
   ******************************************************************************************/


  async updatePaciente (id, newDataPaciente) {

    try {
      const paciente = await this.pacienteReposistory.getElementById(id)
      if(!paciente) throw new APIError({message: 'El paciente que intenta actualizar no se encuntra registrado, por favor verifique!.', status: httpStatus.BAD_REQUEST, isPublic: true})
        
        // Eliminar el campo id de params si está presente
        if ('id' in newDataPaciente || 'Id' in newDataPaciente) {
          delete newDataPaciente.id;
          delete newDataPaciente.Id;
    }
    
    
    const camposParaActualizar = {}
      for (const key in newDataPaciente) {
        const keyUpperCase = key.charAt(0).toUpperCase() + key.slice(1);
        const pacienteValue = paciente[keyUpperCase] ? paciente[keyUpperCase].toString().toLowerCase() : '';
        const paramsValue = newDataPaciente[key] ? newDataPaciente[key].toString().toLowerCase() : '';

        if (paramsValue !== pacienteValue) {
            camposParaActualizar[key] = newDataPaciente[key];
        }
    }

      
      if (Object.keys(camposParaActualizar).length === 0) {
        throw new APIError({
          status: httpStatus.CONFLICT,
          message: "El nuevo valor es igual al valor actual. No se realizaron cambios.",
        });
      }
      
      const pacienteUpdated = await this.pacienteReposistory.update(id, newDataPaciente)
      console.log('pacienteUpdated', pacienteUpdated)
      if (pacienteUpdated[0] === 0) {
        throw new APIError({
          message: "No se pudo actualizar los datos.",
          status: httpStatus.INTERNAL_SERVER_ERROR,

        })
      }

      return {
        status: httpStatus.OK,
        message: "Paciente actualizado correctamente.",
      };


    } catch (error) {
    
      logger.error(error.message)
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
      })
    }
  }

  /************************************************************
 * 
 * @function crearPaciente
 * @description funcion que recibe los siguientes parámetros:
 * @author Desarrollador Ivan Cabeza
 * @param {object} params 
 * @param {string} params.activo
 * @param {string} params.multado
 * @param {string} params.id
 * @param {string} params.identificacion
 * @param {string} params.ape1Afil
 * @param {string} params.ape2Afil
 * @param {string} params.nom1Afil
 * @param {string} params.nom2Afil
 * @param {string} params.fechaNac
 * @param {string} params.tipoID
 * @param {string} params.expedicion
 * @param {string} params.sexo
 * @param {string} params.estadoEmbarazo
 * @param {string} params.pais
 * @param {string} params.municipio
 * @param {string} params.localidad
 * @param {string} params.barrio
 * @param {string} params.zona
 * @param {string} params.dirAfil
 * @param {string} params.referenciaDireccion
 * @param {string} params.email
 * @param {string} params.telRes
 * @param {string} params.telOfic
 * @param {string} params.telCel
 * @param {string} params.historia
 * @param {string} params.sangre
 * @param {string} params.estadoCivil
 * @param {string} params.escolaridad
 * @param {string} params.profesion
 * @param {string} params.etnia
 * @param {string} params.bVCArmado
 * @param {string} params.bDiscapacidad
 * @param {string} params.bDesplazado
 * @param {string} params.raza
 * @param {string} params.idReligion
 * @param {string} params.creencia
 * @param {string} params.regimen
 * @param {string} params.nivel
 * @param {string} params.tipoUsuario
 * @param {string} params.ca
 * @param {string} params.carnet
 * @param {string} params.diagnostico
 * @param {string} params.codAdministradora
 * @param {string} params.tipoCotizante
 * @param {string} params.identificacionAcompañante
 * @param {string} params.tipoIdAcompañante
 * @param {string} params.nom1Acompañante
 * @param {string} params.nom2Acompañante
 * @param {string} params.ape1Acompañante
 * @param {string} params.ape2Acompañante
 * @param {string} params.parentescoAcompañante
 * @param {string} params.dirAcompañante
 * @param {string} params.telAcomp
 * @param {string} params.celularAcompañante
 * @param {string} params.identificacionResponsable
 * @param {string} params.tipoIdResponsable
 * @param {string} params.nom1Responsable
 * @param {string} params.nom2Responsable
 * @param {string} params.ape1Responsable
 * @param {string} params.ape2Responsable
 * @param {string} params.parentescoResponsable
 * @param {string} params.dirResponsable
 * @param {string} params.telResponsable
 * @param {string} params.celularResponsable
 * @param {string} params.municipioCatastrofe
 * @param {string} params.dirCatastrofe
 * @param {string} params.zonaCatastrofe
 * @param {string} params.grado
 * @param {string} params.fechaInsc
 * @param {string} params.fechaAfil
 * @param {string} params.pensionado
 * @param {string} params.fichaSisben
 * @param {string} params.parentesco
 * @param {string} params.fechaEPS
 * @param {string} params.condBenef
 * @param {string} params.grupoPoblacional
 * @param {string} params.muerto
 * @param {string} params.fechaMuerte
 * @param {string} params.origenMuerte
 * @param {string} params.certiDefuncion
 *********************************************************************/
  // async crearPaciente(params) {
  //   try {
  //     const pacienteModel = new PacienteMethod(this.PacienteModel);
  //     const response = await pacienteModel.crearPaciente(params);
  //     if(response.status === 'EXIST') {
  //       throw new APIError({
  //         message: response.message,
  //         status: httpStatus.CONFLICT, // 409: Conflict
  //         isPublic: true,
  //       });
  //     }
  //     return response;
  //   } catch (error) {
  //     logger.error(error.message);
  //     throw new APIError({
  //       message: error.message,
  //       status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
  //     });
  //   }
  // }

  /*****************************************************************************************
   * @function actualizarPaciente
   * @description funcion que se encarga de actualizar los datos del paciente en base datos.
   * @author Desarrollador Ivan Cabeza
   * @param {string} idPaciente | id del paciente a actualizar.
   * @param {object} params   | objeto con los datos a actualizar.
   * 
   * @returns 
   ******************************************************************************************/
  async actualizarPaciente(idPaciente, params) {
  
    try {
      const pacienteModel = new PacienteMethod(this.PacienteModel);
      const paciente = await pacienteModel.getElementById(idPaciente)
     
      if (!paciente) {
        throw new APIError({
          message: "El paciente no existe",
          status: httpStatus.NOT_FOUND,
        });
      }

       // Eliminar el campo id de params si está presente
    if ('id' in params || 'Id' in params) {
      delete params.id;
      delete params.Id;
    }

  
      const camposParaActualizar = {}
      for (const key in params) {
        const keyUpperCase = key.charAt(0).toUpperCase() + key.slice(1);
        const pacienteValue = paciente[keyUpperCase] ? paciente[keyUpperCase].toString().toLowerCase() : '';
        const paramsValue = params[key] ? params[key].toString().toLowerCase() : '';

        if (paramsValue !== pacienteValue) {
            camposParaActualizar[key] = params[key];
        }
    }

    
      if (Object.keys(camposParaActualizar).length === 0) {
        throw new APIError({
          status: httpStatus.CONFLICT,
          message: "El nuevo valor es igual al valor actual. No se realizaron cambios.",
        });
      }

      const pacienteUpdate = await pacienteModel.actualizarPaciente(
        idPaciente,
        params
      );

      if (pacienteUpdate[0] === 0) {
        throw new APIError({
          message: "No se pudo actualizar los datos.",
          status: httpStatus.NOT_FOUND,

        })
      }
      return {
        status: httpStatus.OK,
        message: "Paciente actualizado correctamente.",
      };



      //return response;
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }


  
  async maestroPacienteInizializar() {
    try {
      const pacienteModel = new PacienteMethod(this.PacienteModel);
      const response = await pacienteModel.MaestroPacienteInizializar();
      return response;
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }


  
  /*****************************************************************************************
   * @function consultarCitasPorPaciente
   * @description funcion que se encarga de consultar las citas de un paciente en base datos.
   * @author Desarrollador Ivan Cabeza
   * @param {string} idPaciente | id del paciente a buscarle cita.
   * 
   * @returns 
   ******************************************************************************************/
  async consultarCitasPorPaciente(idPaciente) {
    const pacienteModel = new PacienteMethod(this.PacienteModel);
    const replacements = {  idPaciente };
    
    
    try {

      //comprobamos si existe el paciente
      const existePaciente = await this.pacienteReposistory.executeSql(queryBuscarPacienteById, replacements)

      console.log('existePaciente', existePaciente.datos.Existe)
      if (existePaciente.datos.Existe === 0) {
        throw new APIError({
          message: "El paciente no existe",
          status: httpStatus.NOT_FOUND,
        });
      }


      const response = await this.pacienteReposistory.executeSql(queryGetCitaByPaciente, replacements);
      if (!response.datos && response.error === false) {
        throw new APIError({
          message: "No se encontraron citas para el paciente.",
          status: httpStatus.NOT_FOUND,
        });
      }
      return {
         status: httpStatus.OK,
         message: 'Citas encontradas correctamente',
        datos:response.datos
      };
    } catch (error) {
      logger.error(error.message);
      throw new APIError({
        message: error.message,
        status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

module.exports = {
  PacienteService,
};
