const { config, database, up } = require('migrate-mongo');
const { logger } = require('@server/utils/logger');
const migrationConfig = require('@root/migrate-mongo-config');

/**
 * Migrate data
 */
const migrate = async () => {
  config.set(migrationConfig);
  const { db, client } = await database.connect();
  try {
    const migrated = await up(db, client);
    migrated.forEach(scriptName => logger.info(`Migrated ${scriptName}`));
    await client.close();
    return migrated.length !== 0;
  } catch (err) {
    await client.close();
    throw err;
  }
};

module.exports = migrate;
