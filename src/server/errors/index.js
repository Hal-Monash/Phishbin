/**
 * Class represents bad request error(400)
 * @extends Error
 */
class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'BadRequestError' });
    Object.defineProperty(this, 'status', { value: 400 });
  }
}

/**
 * Class represents unauthorized error(401)
 * @extends Error
 */
class AuthenticationError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    Object.defineProperty(this, 'status', { value: 401 });
  }
}

/**
 * Class represents forbidden error(403)
 * @extends Error
 */
class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'ForbiddenError' });
    Object.defineProperty(this, 'status', { value: 403 });
  }
}

/**
 * Class represents not found error(404)
 * @extends Error
 */
class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
    Object.defineProperty(this, 'status', { value: 404 });
  }
}

/**
 * Class represents conflict error(409)
 * @extends Error
 */
class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'ConflictError' });
    Object.defineProperty(this, 'status', { value: 409 });
  }
}

/**
 * Class represents unprocessable entity error(422)
 * @extends Error
 */
class UnprocessableEntityError extends Error {
  constructor(message = 'Unprocessable Entity') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'UnprocessableEntityError' });
    Object.defineProperty(this, 'status', { value: 422 });
  }
}

/**
 * Class represents internal server error(500)
 * @extends Error
 */
class SystemError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    Object.defineProperty(this, 'name', { value: 'SystemError' });
    Object.defineProperty(this, 'status', { value: 500 });
  }
}

module.exports = {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  SystemError,
  UnprocessableEntityError,
};
