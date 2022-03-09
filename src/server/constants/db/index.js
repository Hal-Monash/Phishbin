const { lowerCase, mapValues } = require('lodash');
const toCollectionName = model => `${lowerCase(model)}s`;

const MODEL_NAME = {
  SUBMISSION: 'Submission',
  USER: 'User',
};

const COLLECTION_NAME = mapValues(MODEL_NAME, toCollectionName);

module.exports = {
  COLLECTION_NAME,
  MODEL_NAME,
};
