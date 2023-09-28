import { DataTypes, Sequelize } from 'sequelize';

import { SequelizeOptions } from '../consts';

export const ShortUrl = (sequelize: Sequelize) =>
  sequelize.define('shortUrl', {
    slug: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    originalUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expiry: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, SequelizeOptions);