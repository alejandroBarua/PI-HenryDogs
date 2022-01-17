'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    
    static associate(models) {
      Dog.belongsToMany(models.Temp, { 
        through: "DogTemps",
        foreignKey: "dogId"
      })
    }
  };
  Dog.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false
    },
    age:{
      type:DataTypes.STRING,
      allowNull:false
    },
    image:{
      type:DataTypes.STRING,
      defaultValue: 'imagen por defecto',
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};