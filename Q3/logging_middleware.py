import requests
import json
from datetime import datetime
from typing import Optional

class LoggingMiddleware:
    def __init__(self, base_url: str = "http://20.244.56.144/evaluation-service/logs"):
        self.base_url = base_url
        self.auth_token = None
        self.session = requests.Session()
    
    def set_auth_token(self, token: str):
        """Set the authorization token for API calls"""
        self.auth_token = token
        self.session.headers.update({
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        })
    
    def log(self, stack: str, level: str, package: str, message: str, data: Optional[dict] = None):
        """
        Reusable Log function that makes API call to Test Server
        
        Args:
            stack: "frontend" or "backend" (lowercase)
            level: "info", "warning", "error", "debug" (lowercase)
            package: specific package/module name (lowercase)
            message: descriptive log message
            data: optional additional data to include in log
        """
        try:
            # Prepare log payload
            log_payload = {
                "stack": stack.lower(),
                "level": level.lower(),
                "package": package.lower(),
                "message": message,
                "timestamp": datetime.now().isoformat(),
                "rollNo": "22691a3239"
            }
            
            # Add additional data if provided
            if data:
                log_payload["data"] = data
            
            # Make API call
            response = self.session.post(self.base_url, json=log_payload)
            
            # Log the API call result
            if response.status_code in [200, 201]:
                print(f"✅ Log sent successfully: {level.upper()} - {message}")
            else:
                print(f"❌ Failed to send log: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"❌ Error in logging middleware: {str(e)}")
            # Fallback: log to console if API fails
            print(f"[{level.upper()}] {package}: {message}")
            if data:
                print(f"Data: {json.dumps(data, indent=2)}")

# Create global instance
logger = LoggingMiddleware()

# Convenience functions for different log levels
def log_info(package: str, message: str, data: Optional[dict] = None):
    """Log informational message"""
    logger.log("backend", "info", package, message, data)

def log_warning(package: str, message: str, data: Optional[dict] = None):
    """Log warning message"""
    logger.log("backend", "warning", package, message, data)

def log_error(package: str, message: str, data: Optional[dict] = None):
    """Log error message"""
    logger.log("backend", "error", package, message, data)

def log_debug(package: str, message: str, data: Optional[dict] = None):
    """Log debug message"""
    logger.log("backend", "debug", package, message, data)

# Example usage functions
def example_user_registration(user_data: dict):
    """Example function showing strategic logging throughout the code"""
    try:
        log_info("auth", "Starting user registration process", {"email": user_data.get("email")})
        
        # Validate user data
        if not user_data.get("email"):
            log_error("auth", "User registration failed: missing email", user_data)
            return False
        
        log_info("auth", "User data validation passed")
        
        # Simulate database operation
        log_info("database", "Attempting to save user to database", {"email": user_data.get("email")})
        
        # Simulate success
        log_info("auth", "User registration completed successfully", {"userId": "12345"})
        return True
        
    except Exception as e:
        log_error("auth", f"Unexpected error during user registration: {str(e)}", user_data)
        return False

def example_api_handler(request_data: str):
    """Example API handler with comprehensive logging"""
    try:
        log_info("handler", "API request received", {"requestData": request_data})
        
        if not request_data:
            log_error("handler", "Received empty string in request", {"requestData": request_data})
            return {"error": "Invalid request data"}
        
        # Process the request
        log_info("handler", "Processing request data")
        result = f"Processed: {request_data}"
        
        log_info("handler", "Request processed successfully", {"result": result})
        return {"success": True, "data": result}
        
    except Exception as e:
        log_error("handler", f"Error processing request: {str(e)}", {"requestData": request_data})
        return {"error": "Internal server error"}

# Test the logging middleware
if __name__ == "__main__":
    # Set the auth token (you'll need to get this from the auth API)
    auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEzMjM5QG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTE3NDAsImlhdCI6MTc1MjIxMDg0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjAyOWNkYzY3LTBhY2MtNDQzZS05NGQxLTk3NjRiODY0ZGIwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwic3ViIjoiMTkwNzY3YjItZmQ4Zi00ZjYwLThlOGQtOTAzYzFiNzY3YTE5In0sImVtYWlsIjoiMjI2OTFhMzIzOUBtaXRzLmFjLmluIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwicm9sbE5vIjoiMjI2OTFhMzIzOSIsImFjY2Vzc0NvZGUiOiJjYVZ2TkgiLCJjbGllbnRTZWNyZXQiOiJOVVNGZnJ4V05ydnZLcWtVIn0.6t1KlAPwcMKwDS3BcCr3Rc8WNXSOgOwKCJcZm7nFN9w"
    logger.set_auth_token(auth_token)
    
    # Test different log levels
    log_info("middleware", "Logging middleware initialized successfully")
    log_warning("middleware", "Database connection pool running low", {"activeConnections": 8, "maxConnections": 10})
    log_error("middleware", "Failed to connect to external service", {"service": "payment-gateway", "error": "timeout"})
    log_debug("middleware", "Processing user request", {"userId": "123", "action": "login"})
    
    # Test example functions
    print("\n--- Testing User Registration ---")
    example_user_registration({"email": "test@example.com", "name": "Test User"})
    
    print("\n--- Testing API Handler ---")
    example_api_handler("test request data")
    example_api_handler("")  # This should trigger an error log 