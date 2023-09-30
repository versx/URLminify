import { Sequelize } from 'sequelize';

import { Setting } from './Setting';
import { ShortUrl } from './ShortUrl';
import { User } from './User';
import { log, logError } from '../services';
import { Config, SequelizeDatabaseConnection } from '../types';

const config: Config = require('../config.json');
const sequelize = new Sequelize(config.database);

export const db: SequelizeDatabaseConnection = { connection: sequelize };
db.setting = Setting(sequelize);
db.shortUrl = ShortUrl(sequelize);
db.user = User(sequelize);

db.shortUrl.belongsTo(db.user);
db.user.hasMany(db.shortUrl, {
  as: 'shortUrls',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export const testConnection = async () => {
  try {
    await db.connection.authenticate();
    log('Database connection has been established successfully.');
  } catch (err) {
    logError('Failed to establish a connection to the database');
  }
};