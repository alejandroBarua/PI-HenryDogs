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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
    life_span:{
      type:DataTypes.STRING,
      allowNull:false
    },
    imgUrl:{
      type:DataTypes.STRING,
      get() {
        return `http://localhost:${process.env.PORT}/api/img/${this.getDataValue('id')}`;
      }
    },
    imgName:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};