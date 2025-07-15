const { DataTypes } = require('sequelize');
const db = require('../../configuraciones/db');

const Descuento = db.define('Descuento', {
  idDescuento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,            // Obligatorio
    autoIncrement: true          // Opcional, si quieres que se incremente automáticamente
  },
  Tipo: {
    type: DataTypes.STRING(45),
    allowNull: false,            // Obligatorio
    validate: {
      notEmpty: {
        msg: 'El tipo no puede estar vacío'
      },
      len: {
        args: [1, 45],
        msg: 'El tipo debe tener entre 1 y 45 caracteres'
      }
    }
  },
  Estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),  // Mejor usar ENUM para estados definidos
    allowNull: false,
    defaultValue: 'Activo',
    validate: {
      isIn: {
        args: [['Activo', 'Inactivo']],
        msg: 'El estado debe ser Activo o Inactivo'
      }
    }
  }
}, {
  tableName: 'descuento',
  timestamps: false
});

module.exports = Descuento;

