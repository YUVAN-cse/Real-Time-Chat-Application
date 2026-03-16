class AppError extends Error {
    constructor(statusCode, message, error = null, stack = '') {
        super(message);

        this.statusCode = statusCode;
        this.success = false; // always false for errors
        this.message = message;
        this.error = error;   // string/object describing the error
        this.timestamp = new Date().toISOString();

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // This makes JSON.stringify / res.json() work properly
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            error: this.error,
            timestamp: this.timestamp
        };
    }
}

export default AppError;
