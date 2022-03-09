const express = require('express');
const router = express.Router();
const config = require('@root/config/server');

router.get('/version', (req, res, next) => {
  try {
    res.json({
      data: config.APP.VERSION,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
