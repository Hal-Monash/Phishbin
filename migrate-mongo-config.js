require('module-alias/register');

const { DATABASE } = require('@root/config/server');
const { getDBUrl } = require('@server/utils/db');
// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: getDBUrl({
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      username: DATABASE.USERNAME,
      password: DATABASE.PASSWORD,
      name: DATABASE.NAME,
    }),

    // TODO Change this to your database name:
    databaseName: DATABASE.NAME,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: DATABASE.MIGRATIONS_DIR,

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,
};

// Return the config as a promise
module.exports = config;
