/* eslint-disable linebreak-style */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequalize');

const Citas = sequelize.define('Citas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IdPaciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prestador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FechaAsignada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  TipoConsulta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FechaSolicitada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  TipoCita: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FechaRegistro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Especialidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Citas;
