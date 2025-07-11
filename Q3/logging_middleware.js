const https = require('https');
const http = require('http');

class LoggingMiddleware {
    constructor(baseUrl = "http://20.244.56.144/evaluation-service/logs") {
        this.baseUrl = baseUrl;
        this.authToken = null;
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    async log(stack, level, packageName, message, data = null) {
        try {
            // Prepare log payload
            const logPayload = {
                stack: stack.toLowerCase(),
                level: level.toLowerCase(),
                package: packageName.toLowerCase(),
                message: message,
                timestamp: new Date().toISOString(),
                rollNo: "22691a3239"
            };

            // Add additional data if provided
            if (data) {
                logPayload.data = data;
            }

            // Prepare request options
            const url = new URL(this.baseUrl);
            const options = {
                hostname: url.hostname,
                port: url.port || 80,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authToken}`
                }
            };

            // Make the request
            return new Promise((resolve, reject) => {
                const req = http.request(options, (res) => {
                    let responseData = '';
                    
                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });
                    
                    res.on('end', () => {
                        if (res.statusCode === 200 || res.statusCode === 201) {
                            console.log(`✅ Log sent successfully: ${level.toUpperCase()} - ${message}`);
                            resolve(responseData);
                        } else {
                            console.log(`❌ Failed to send log: ${res.statusCode} - ${responseData}`);
                            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
                        }
                    });
                });

                req.on('error', (error) => {
                    console.log(`❌ Error in logging middleware: ${error.message}`);
                    // Fallback: log to console if API fails
                    console.log(`[${level.toUpperCase()}] ${packageName}: ${message}`);
                    if (data) {
                        console.log(`Data: ${JSON.stringify(data, null, 2)}`);
                    }
                    reject(error);
                });

                req.write(JSON.stringify(logPayload));
                req.end();
            });

        } catch (error) {
            console.log(`❌ Error in logging middleware: ${error.message}`);
            // Fallback: log to console if API fails
            console.log(`[${level.toUpperCase()}] ${packageName}: ${message}`);
            if (data) {
                console.log(`Data: ${JSON.stringify(data, null, 2)}`);
            }
        }
    }
}

// Create global instance
const logger = new LoggingMiddleware();

// Main Log function
function Log(stack, level, packageName, message, data = null) {
    return logger.log(stack, level, packageName, message, data);
}

// Convenience functions for different log levels
function logInfo(packageName, message, data = null) {
    return Log("frontend", "info", packageName, message, data);
}

function logWarning(packageName, message, data = null) {
    return Log("frontend", "warning", packageName, message, data);
}

function logError(packageName, message, data = null) {
    return Log("frontend", "error", packageName, message, data);
}

function logDebug(packageName, message, data = null) {
    return Log("frontend", "debug", packageName, message, data);
}

// Example usage functions
async function exampleUserRegistration(userData) {
    try {
        await logInfo("api", "Starting user registration process", { email: userData.email });
        
        // Validate user data
        if (!userData.email) {
            await logError("api", "User registration failed: missing email", userData);
            return false;
        }
        
        await logInfo("api", "User data validation passed");
        
        // Simulate database operation
        await logInfo("api", "Attempting to save user to database", { email: userData.email });
        
        // Simulate success
        await logInfo("api", "User registration completed successfully", { userId: "12345" });
        return true;
        
    } catch (error) {
        await logError("api", `Unexpected error during user registration: ${error.message}`, userData);
        return false;
    }
}

async function exampleApiHandler(requestData) {
    try {
        await logInfo("api", "API request received", { requestData: requestData });
        
        if (!requestData) {
            await logError("api", "Received empty string in request", { requestData: requestData });
            return { error: "Invalid request data" };
        }
        
        // Process the request
        await logInfo("api", "Processing request data");
        const result = `Processed: ${requestData}`;
        
        await logInfo("api", "Request processed successfully", { result: result });
        return { success: true, data: result };
        
    } catch (error) {
        await logError("api", `Error processing request: ${error.message}`, { requestData: requestData });
        return { error: "Internal server error" };
    }
}

// Export functions
module.exports = {
    Log,
    logInfo,
    logWarning,
    logError,
    logDebug,
    logger,
    exampleUserRegistration,
    exampleApiHandler
};
