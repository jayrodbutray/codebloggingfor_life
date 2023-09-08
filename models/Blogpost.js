const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    date_published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'blogpost',
    }
);

module.exports = Blogpost;
