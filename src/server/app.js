const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const config = require('@root/config/server');
const { logger, morgan } = require('@server/utils/logger');
const apiRouter = require('@server/api');
const path = require('path');



// const https = require('https');
// const fs = require('fs');
// serve the API with signed certificate on 443 (SSL/HTTPS) port




const initApiRouter = async ctx => {
  // Register API router
  ctx.APP.use(ctx.CFG.APP.API_ROOT_ROUTE_PATH, apiRouter);

  // Serve UI if production
  ctx.APP.use(express.static(ctx.CFG.APP.UI_BUILD_DIR));
};

const createApplication = async ctx => {
  ctx.APP = express();
  ctx.APP.use(cors());

  ctx.APP.use(express.static(
    path.join(__dirname,'../../build')));
  /**
   * Setting response headers to secure the app, more details at https://github.com/helmetjs/helmet
   * - Content-Security-Policy
   * - X-DNS-Prefetch-Control
   * - Expect-CT
   * - X-Frame-Options
   * - X-Powered-By
   * - Strict-Transport-Security
   * - X-Download-Options
   * - X-Content-Type-Options
   * - X-Permitted-Cross-Domain-Policies
   * - Referrer-Policy
   * - X-XSS-Protection
   */
  ctx.APP.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': [`'self'`, `'unsafe-inline'`, ctx.CFG.APP.BASE_URL],
        },
      },
    }),
  );
  ctx.APP.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
  ctx.APP.use(bodyParser.json({ limit: '2mb', extended: true }));
  // set logger
  ctx.APP.use(morgan(config.LOG.MORGAN_FORMAT, { stream: logger.stream }));
  // Use passport
  ctx.APP.use(passport.initialize(null));
  await initApiRouter(ctx);
  return ctx;
};

module.exports = createApplication;
