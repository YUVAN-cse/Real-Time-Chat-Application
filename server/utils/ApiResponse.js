class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        this.success = statusCode < 400; // true for 2xx/3xx, false for 4xx/5xx
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
}

export default ApiResponse;
