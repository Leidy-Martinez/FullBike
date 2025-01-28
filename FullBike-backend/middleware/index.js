const { authenticate } = require('./authMiddleware');
const { errorHandler } = require('./error');
const { validate } = require('./validate');
const cors = require('./cors');

module.exports = {
    authenticate,
    errorHandler,
    validate,
    cors
};