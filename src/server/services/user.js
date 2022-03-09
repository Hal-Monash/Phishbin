const bcrypt = require('bcrypt');
const _ = require('lodash');

const { UnprocessableEntityError, BadRequestError } = require('@server/errors');
const User = require('@server/models/user');

/**
 * Update user
 * @param {Object} condition
 * @param {Object} body
 * @return {Promise<*>}
 */
const findOneAndUpdate = async ({ condition, body }) => {
  return User.findOneAndUpdate(condition, { $set: { ...body } }, { new: true });
};

/**
 * Insert many users at once
 * @param {Array} users
 * @return {Promise<*>}
 */
const insertMany = async users => {
  if (!users || !Array.isArray(users)) {
    throw BadRequestError('Not an array of users.');
  }
  // let hashedUsers = await Promise.all(
  //   users.map(async each => {
  //     let hasError = false;
  //     // Check if subject in the correct department
  //     if (each?.[USER_FIELDS.DEPARTMENT] || each?.[USER_FIELDS.COORDINATING_SUBJECTS]) {
  //       for (const eachId of each?.[USER_FIELDS.COORDINATING_SUBJECTS]) {
  //         const subject = await Subject.findOne({ [SUBJECT_FIELDS.DEPARTMENT]: each?.[USER_FIELDS.DEPARTMENT], [SUBJECT_FIELDS.ID]: eachId });
  //         if (_.isEmpty(subject)) {
  //           hasError = true;
  //         }
  //       }
  //     }
  //     if (!hasError) {
  //       const salt = await bcrypt.genSalt(10);
  //       const hashedPass = await bcrypt.hash(each.password, salt);
  //       return {
  //         ...each,
  //         [USER_FIELDS.PASSWORD]: hashedPass,
  //       };
  //     } else {
  //       return null;
  //     }
  //   }),
  // );
  // hashedUsers = hashedUsers?.filter(each => each !== null);
  const hashedUsers = await Promise.all(
    users.map(async each => {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(each.password, salt);
      return {
        ...each,
        password: hashedPass,
      };
    }),
  );
  return User.insertMany(hashedUsers);
};

module.exports = {
  insertMany,
  findOneAndUpdate,
};
