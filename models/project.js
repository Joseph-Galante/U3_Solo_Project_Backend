'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.project.belongsToMany(models.user, { through: 'userProjects'});
      models.project.hasMany(models.task);
      models.project.hasMany(models.invite);
    }
  };
  project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};