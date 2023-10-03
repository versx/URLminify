import { DataTypes, Sequelize } from 'sequelize';

import { SequelizeOptions } from '../consts';

export const Telemetry = (sequelize: Sequelize) =>
  sequelize.define('telemetry', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddr: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    isp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    forwardedFor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    continentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    regionName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    offset: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    offsetSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    org: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    as: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    asname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    },
    reverse: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    mobile: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    proxy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hosting: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, SequelizeOptions);