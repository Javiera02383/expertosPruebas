const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');
const Persona = require('../seguridad/Persona');

const Empleado = db.define('Empleado', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPersona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'persona',
      key: 'idPersona'
    }
  },
  Fecha_Registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'empleado',
  timestamps: false
});

// Relaciones
Empleado.belongsTo(Persona, { foreignKey: 'idPersona', as: 'persona' });
Persona.hasOne(Empleado,{foreignKey: "idPersona", sourceKey:"idPersona"})
module.exports = Empleado;
