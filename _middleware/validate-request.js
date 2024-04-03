module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,//include all errors
        allowUnknown: true,//ignore unknown props
        stripUnkown: true//remove unknown props
    };
    const { error, value} = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.mao(x => x.message).join(',')}`);
    } else {
        req.body = value;
        next();
    }
}