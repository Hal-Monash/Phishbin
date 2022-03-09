require('dotenv').config();
require('module-alias/register');

// const mongoose = require('mongoose')
// mongoose.set('useUnifiedTopology', true)
// mongoose.set('useFindAndModify', false)
// mongoose.set('useNewUrlParser', true)

const createApplication = require('@server/app');
const config = require('@root/config/server');
const { logger } = require('@server/utils/logger');
const db = require('@server/utils/db');
const migrate = require('@server/migrations');

const https = require('https');
const fs = require('fs');

/**
 * Server shutdown handler
 * @param {Object} ctx
 * @return {Promise<unknown>}
 */
const createShutdownHandlers = async ctx => {
  const handleShutdown = async sig => {
    logger.info(`Received ${sig} shutdown signal`);
    logger.info('Stopping application');
    if (ctx.server) {
      ctx.server.close(async () => {
        logger.info('Gracefully shutting down application');
        process.exit(0);
      });
    } else {
      logger.info('Gracefully shutting down application');
      process.exit(0);
    }
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));

  return ctx;
};

/**
 * Connect to database
 * @param ctx
 * @return {Promise<unknown>}
 */
const connectToDatabase = async ctx => {
  const dbHost = ctx.CFG.DATABASE.HOST;
  const dbPort = ctx.CFG.DATABASE.PORT;
  const dbName = ctx.CFG.DATABASE.NAME;
  const dbUsername = ctx.CFG.DATABASE.USERNAME;
  const dbPassword = ctx.CFG.DATABASE.PASSWORD;
  const dbUrl = db.getDBUrl({
    host: dbHost,
    port: dbPort,
    name: dbName,
    username: dbUsername,
    password: dbPassword,
  });

  ctx.CFG.DB_URL = dbUrl;

  const options = {
    useNewUrlParser: true,
  };
  try {
    await db.connect(dbUrl, options);
  } catch (e) {
    logger.error('Failed to connect to DB: ', e);
    throw e;
  }
  return ctx;
};

/**
 * Run db migration before server start
 * @param ctx
 * @return {Promise<unknown>}
 */
const runMigration = async ctx => {
  logger.info('Running migration...');
  const res = await migrate();
  if (res) {
    logger.info(`Successfully migrated`);
  } else {
    logger.info(`No migrations to run`);
  }
  return ctx;
};

const startApplication = ctx => {
  return new Promise(resolve => {
    const { HOST, PORT } = ctx.CFG.SERVER;


    ctx.SERVER = https.createServer({
      key: fs.readFileSync('/home/ubuntu/hao/smishing/hao/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/hao/smishing/hao/fullchain.pem'),
    }, ctx.APP).listen(PORT, () => {
      logger.info(`🚀  Application started, on port ${PORT}`);
      resolve(ctx);
    });
  });
};

const initContext = async ctx => {
  const base = {
    APP: null,
    CFG: {},
    SERVER: null,
  };
  base.CFG = { ...base, ...config };
  if (ctx) {
    ctx = { ...base, ...ctx };
  } else {
    ctx = base;
  }
  return ctx;
};

/**
 * Start server
 */
module.exports = initContext()
  .then(createShutdownHandlers)
  .then(connectToDatabase)
  .then(runMigration)
  .then(createApplication)
  .then(startApplication)
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });
