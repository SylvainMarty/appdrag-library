const json = (body, statusCode = 200) => ({
  statusCode : statusCode.toString(),
  headers: {
      "Content-Type": "application/json"
  },
  body: body ? JSON.stringify(body) : null
});

const noContent = () => json(null, 204);

const error = (message, statusCode, error) => json({ statusCode, message, trace: error && error.trace ? error.trace : (new Error()).trace }, statusCode);

const badRequest = (message) => error(message, 400);

const unauthenticated = (message = 'User non-authenticated') => error(message, 401);

const forbidden = (message = 'Access forbidden') => error(message, 403);

const serverError = (message = 'Internal server error', error) => error(message, 500, error);

module.exports = {
  json,
  noContent,
  error,
  badRequest,
  unauthenticated,
  forbidden,
  serverError,
};
