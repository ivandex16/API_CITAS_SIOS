/* eslint-disable linebreak-style */
const httpStatus = require("http-status");
//const Paciente = require("../paciente.model");
const APIError = require("../../errors/api-error");
const { /*logger,*/ buildLogger , logger} = require("../../../config/logger");
const { Sql } = require("../../../plugins/sequelize.plugin");
const path = require("path");
const {
  pacienteSucces,
  pacientCreado,
} = require("../../../config/messageResponses");
const { where } = require("../user.model");
const {
  capitalizePropertyNames,
  groupByProperty,
} = require("../../utils/functionHelpers");
const Paciente = require("../paciente.model");
const { queryGetCitaByPaciente, buscarPacienteByIdentificacionYTipoId } = require("../querys/paciente.query");

//const logger = buildLogger(path.basename(__filename));

class PacienteMethod {
  constructor(
    sql //* dependencia de clase de sequalize
  ) {
    this.sql = sql;
  }

  /*******************************************************************************************
   * @public
   * @function consultarPaciente
   * @author Ivan Cabeza
   * @fecha 2024-05-21
   * @description Consulta a la base de datos un paciente por su id y su tipo de identificacion
   * @param {object} params
   * @param {string} params.idPaciente
   * @param {string} params.tipoIdPaciente
   * @returns {object}
   *********************************************************************************************/
  async consultarPaciente(ConsultarPacienteDTO) {

    //validamos que el id del paciente no
    try {

      const response = await Paciente.findOne({
        where: ConsultarPacienteDTO,
      });
      return response;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  /*****************************************************
   * @public
   * @method createPaciente
   * @description crea un paciente en la base de datos
   * @param {*} pacienteData | datos del paciente
   * @returns
   *****************************************************/
  async createPaciente(pacienteData) {
    let storProcedurePacientesInsertar = `exec [Administracion].[usp_PacientesInsertar] 
    @Activo=:activo,
    @Multado=:multado,
    @Id=:id,
    @Identificacion=:identificacion,
    @Ape1Afil=:ape1Afil,
    @Ape2Afil=:ape2Afil,
    @Nom1Afil=:nom1Afil,
    @Nom2Afil=:nom2Afil,
    @FechaNac=:fechaNac,
    @TipoID=:tipoID,
    @Expedicion=:expedicion,
    @Sexo=:sexo,
    @EstadoEmbarazo=:estadoEmbarazo,
    @Pais=:pais,
    @Municipio=:municipio,
    @Localidad=:localidad,
    @Barrio=:barrio,
    @Zona=:zona,
    @DirAfil=:dirAfil,
    @ReferenciaDireccion=:referenciaDireccion,
    @Email=:email,
    @TelRes=:telRes,
    @TelOfic=:telOfic,
    @TelCel=:telCel,
    @Historia=:historia,
    @Sangre=:sangre,
    @EstadoCivil=:estadoCivil,
    @Escolaridad=:escolaridad,
    @Profesion=:profesion,
    @Etnia=:etnia,
    @bVCArmado=:bVCArmado,
    @bDiscapacidad=:bDiscapacidad,
    @bDesplazado=:bDesplazado,
    @Raza=:raza,
    @idReligion=:idReligion,
    @Creencia=:creencia,
    @Regimen=:regimen,
    @Nivel=:nivel,
    @TipoUsuario=:tipoUsuario,
    @XmlProgramasPMS='<Programas UserId="" UserName="SysnetSoporte"></Programas>',
    @CA=:ca,
    @Carnet=:carnet,
    @Diagnostico=:diagnostico,
    @CodAdministradora=:codAdministradora,
    @Planes='<Planes><Plan id="${pacienteData.idPlan}" Adm="${pacienteData.codAdministradora}" /></Planes>',
    @TipoCotizante=:tipoCotizante,
    @IdentificacionAcompañante=:identificacionAcompanante,
    @TipoIdAcompañante=:tipoIdAcompanante,
    @Nom1Acompañante=:nom1Acompanante,
    @Nom2Acompañante=:nom2Acompanante,
    @Ape1Acompañante=:ape1Acompanante,
    @Ape2Acompañante=:ape2Acompanante,
    @ParentescoAcompañante=:parentescoAcompanante,
    @DirAcompañante=:dirAcompanante,
    @TelAcomp=:telAcomp,
    @CelularAcompañante=:celularAcompanante,
    @IdentificacionResponsable=:identificacionResponsable,
    @TipoIdResponsable=:tipoIdResponsable,
    @Nom1Responsable=:nom1Responsable,
    @Nom2Responsable=:nom2Responsable,
    @Ape1Responsable=:ape1Responsable,
    @Ape2Responsable=:ape2Responsable,
    @ParentescoResponsable=:parentescoResponsable,
    @DirResponsable=:dirResponsable,
    @TelResponsable=:telResponsable,
    @CelularResponsable=:celularResponsable,
    @MunicipioCatastrofe=:municipioCatastrofe,
    @DirCatastrofe=:dirCatastrofe,
    @ZonaCatastrofe=:zonaCatastrofe,
    @Grado=:grado,
    @FechaInsc=:fechaInsc,
    @FechaAfil=:fechaAfil,
    @Pensionado=:pensionado,
    @FichaSisben=:fichaSisben,
    @Parentesco=:parentesco,
    @FechaEPS=:fechaEPS,
    @CondBenef=:condBenef,
    @GrupoPoblacional=:grupoPoblacional,
    @Muerto=:muerto,
    @FechaMuerte=:fechaMuerte,
    @OrigenMuerte=:origenMuerte,
    @CertiDefuncion=:certiDefuncion,
    @img_Huella='Load',
    @Foto=:foto`;
    const replacements = { ...pacienteData };
    const newPaciente = await this.sql.executeSql(
      storProcedurePacientesInsertar,
      replacements
    );
    return newPaciente;
  }

  /************************************************************************
   * @function update
   * @description Actualiza los datos del paciente en la base de datos.
   * @author Desarrollador Ivan Cabeza
   * @param {string} id id del paciente a actualizar
   * @param {object} params | object | datos del paciente a actualizar
   * @returns
   ************************************************************************/
  async update(id, params) {
    const newParamsCapitalize = capitalizePropertyNames(params);
    const pacienteUpdate = await Paciente.update(newParamsCapitalize, {
      where: {
        Id: id,
      },
    });
    return pacienteUpdate;
  }

  /*******************************************************
   * @function getElementById
   * @description Obtiene un paciente por su id
   * @param {string} id id del paciente a obtener
   * @returns {object} paciente encontrado
   ******************************************************/
  async getElementById(id) {
    const pacienteEncontrado = await Paciente.findOne({
      where: {
        Id: id,
      },
    });
    return pacienteEncontrado;
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

  async MaestroPacienteInizializar() {
    try {
      const maestroPacienteInicializar = `exec [Administracion].[usp_MaestroPacienteInicializar] @bPlanes=0`;
      const dataInitialLoad = new Sql(maestroPacienteInicializar);
      const result = await dataInitialLoad.executeQueryString();

      const copy = [...result.datos];
      const groupByTableName = groupByProperty(copy, "table_name");

      const pacientes = await this.modelo.findAll({
        limit: 10,
      });

      console.log("pacientes", pacientes);

      return {
        status: result.status,
        message: "Pacientes inicializados correctamente",
        datos: groupByTableName,
      };
    } catch (error) {
      logger.error(error.message);
    }
  }


  
}

module.exports = {
  PacienteMethod,
};
