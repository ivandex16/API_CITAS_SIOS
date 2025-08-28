/* eslint-disable linebreak-style */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequalize');

/**
 * Tabla paciente
 *
 */
const Paciente = sequelize.define(
  'Paciente',
  {

    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Carnet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nom1Afil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nom2Afil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ape1Afil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ape2Afil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Profesion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaNac: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DirAfil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TelRes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TelOfic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EstadoCivil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Regimen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Zona: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TipoID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Municipio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UnidadEdad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Responsable: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Acompañante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TelAcomp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Expedicion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Historia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TipoUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Facturarlo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DirCatastrofe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MunicipioCatastrofe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DepartamentoCatastrofe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ZonaCatastrofe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaCatastrofe: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FechaOp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Grado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Parentesco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaAfil: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Pensionado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaInsc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ConsHistoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ConsEvol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Diagnostico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Multado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Recibo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Escolaridad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sangre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Etnia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Barrio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FichaSisben: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaEPS: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TipoCabFamilia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdCabFamilia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CodAdministradora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GrupoPoblacional: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CondBenef: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ModalidadSubsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TipoCotizante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaSisben: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    FechaAfiliacionSisben: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Muerto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OrigenMuerte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaMuerte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Control: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Huella: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TelResponsable: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bHuella: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idReligion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: 'dbo',
    tableName: 'Pacientes',
    timestamps: false,
    freezeTableName: true,
    id: false,
    defaultScope: {},
    scopes: {},
  },
);

module.exports = Paciente;

/**
   * busca un paciente por id
   * @Public
   */
// eslint-disable-next-line consistent-return

//   Paciente.consultarPacientePorId = async (id) => {
//     try {
//       const paciente = await Paciente.findOne({ where: { Identidicaion: id } });
//       console.log('paciente', paciente);
//       return paciente;
//     } catch (error) {
//       console.log(error);
//       throw new APIError({
//         message: 'User does not exist',
//         status: httpStatus.NOT_FOUND,
//       });
//     }
//   };
//   return Paciente;
// }
