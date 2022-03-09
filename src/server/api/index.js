const express = require('express');
const router = express.Router();

const defaultErrorHandler = require('@server/api/middleware/defaultErrorHandler');
const routes = require('@server/api/routes');
const ROUTES = require('@server/constants/routes');

router.use(ROUTES.API_AUTH_ROUTE_PATH, routes.auth);
router.use(ROUTES.API_SUBMISSION_ROUTE_PATH, routes.submission);

router.use(defaultErrorHandler);

module.exports = router;
