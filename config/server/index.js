require('dotenv').config();
require('module-alias/register');

const paths = require('react-scripts/config/paths');
const path = require('path');

const pkg = require('@root/package.json');
const appVersion = require('@root/config/appVersion');

const { env } = process;

module.exports = {
  /**
   * App settings
   */
  APP: {
    API_ROOT_ROUTE_PATH: '/api',
    BASE_URL: env.BASE_URL,
    DESCRIPTION: pkg.description,
    NAME: pkg.name,
    UI_BUILD_DIR: paths.appBuild,
    VERSION: appVersion,
  },
  /**
   * Database settings
   */
  DATABASE: {
    NAME: env.DB_NAME || 'smishing-check',
    DRIVER: env.DB_DRIVER || 'mongodb',
    HOST: env.DB_HOST || 'localhost',
    INIT_USER_EMAIL: env.ADMIN_EMAIL,
    INIT_USER_PASSWORD: env.ADMIN_PASSWORD,
    MIGRATIONS_DIR: path.resolve(__dirname, '..', '..', 'src', 'server', 'migrations', 'scripts'),
    PASSWORD: env.DB_PASSWORD,
    PORT: env.DB_PORT || '27017',
    USERNAME: env.DB_USERNAME,
  },
  /**
   * Log settings
   */
  LOG: {
    MORGAN_FORMAT: ':date[web] - :method :url :status :response-time ms :body',
  },
  /**
   * OpenAPI & Swagger UI settings
   */
  OPENAPI: {
    SWAGGER_UI: {
      PATH: env.OPENAPI_SWAGGER_UI_PATH || '/api/api-docs',
    },
    VERSION: env.OPENAPI_VERSION || '3.0.0',
  },
  /**
   * Server settings
   */
  SERVER: {
    //HOST: env.SERVER_HOST || '203.101.230.81',
    //HOST: env.SERVER_HOST || '0.0.0.0',
    JWT_EXP_DEFAULT: env.JWT_EXP_DEFAULT || 1, // days
    JWT_EXP_REMEMBER: env.JWT_EXP_REMEMBER || 30, // days
    JWT_SECRET: env.JWT_SECRET || 'secret',
    PORT: env.SERVER_PORT || '443',
  },
};
