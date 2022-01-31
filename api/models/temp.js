'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Temp extends Model {
    
    static associate(models) {
      Temp.belongsToMany(models.Dog, { 
        through: "DogTemps",
        foreignKey: "tempId"
      })
    }
  }

  Temp.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Temp',
  })

  return Temp;
}