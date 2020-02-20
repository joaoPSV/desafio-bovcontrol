class ApiError extends Error {
    constructor(messages, statusCode) {
        super(messages)
        this.statusCode = parseInt(statusCode);
    }
}

module.exports = ApiError;
