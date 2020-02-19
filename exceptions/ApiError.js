class ApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = parseInt(statusCode);
    }
}

module.exports = ApiError;
