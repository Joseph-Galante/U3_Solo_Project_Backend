'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.invite.belongsTo(models.user);
      models.invite.belongsTo(models.project);
    }
  };
  invite.init({
    message: DataTypes.STRING,
    sender: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invite',
  });
  return invite;
};