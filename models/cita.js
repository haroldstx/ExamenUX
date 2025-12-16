"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cita.belongsTo(models.Usuario, { foreignKey: "usuarioId" });
      Cita.belongsTo(models.Doctor, { foreignKey: "doctorId" });
    }
  }
  Cita.init(
    {
      usuarioId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      hora: DataTypes.STRING,
      tipoConsulta: DataTypes.STRING,
      motivo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Cita",
    }
  );
  return Cita;
};
