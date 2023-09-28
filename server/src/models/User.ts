import { DataTypes, Sequelize } from 'sequelize';

import { SequelizeOptions } from '../consts';

export const User = (sequelize: Sequelize) =>
  sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, SequelizeOptions);