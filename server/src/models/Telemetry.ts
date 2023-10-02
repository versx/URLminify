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
      allowNull: true,
      defaultValue: null,
    },
    isp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
      allowNull: true,
      defaultValue: null,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    continentCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    regionName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
      allowNull: true,
      defaultValue: null,
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
      allowNull: true,
      defaultValue: null,
    },
    org: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    as: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    asname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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