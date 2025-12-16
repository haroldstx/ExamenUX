"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.Especialidad, { foreignKey: "especialidadId" });
      Doctor.hasMany(models.Cita, { foreignKey: "doctorId" });
    }
  }
  Doctor.init(
    {
      nombre: DataTypes.STRING,
      especialidadId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
