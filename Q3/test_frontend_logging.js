// Test the frontend logging middleware
const { Log, logger } = require('./logging_middleware.js');

// Set the auth token
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEzMjM5QG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTE3NDAsImlhdCI6MTc1MjIxMDg0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjAyOWNkYzY3LTBhY2MtNDQzZS05NGQxLTk3NjRiODY0ZGIwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwic3ViIjoiMTkwNzY3YjItZmQ4Zi00ZjYwLThlOGQtOTAzYzFiNzY3YTE5In0sImVtYWlsIjoiMjI2OTFhMzIzOUBtaXRzLmFjLmluIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwicm9sbE5vIjoiMjI2OTFhMzIzOSIsImFjY2Vzc0NvZGUiOiJjYVZ2TkgiLCJjbGllbnRTZWNyZXQiOiJOVVNGZnJ4V05ydnZLcWtVIn0.6t1KlAPwcMKwDS3BcCr3Rc8WNXSOgOwKCJcZm7nFN9w";

// Initialize logging with auth token
logger.setAuthToken(authToken);

console.log("🚀 Testing Frontend Logging Middleware\n");

// Test different packages and scenarios
async function runTests() {
    try {
        // Test API package
        console.log("📡 Testing API Package:");
        await Log("frontend", "info", "api", "Starting API request", { endpoint: "/users" });
        await Log("frontend", "debug", "api", "API response received", { status: 200, data: { userId: "123" } });
        
        // Test Component package
        console.log("\n🧩 Testing Component Package:");
        await Log("frontend", "info", "component", "UserProfile component mounted");
        await Log("frontend", "debug", "component", "Component props updated", { props: { userId: "123" } });
        
        // Test Hook package
        console.log("\n🎣 Testing Hook Package:");
        await Log("frontend", "info", "hook", "useUser hook initialized");
        await Log("frontend", "debug", "hook", "useUser hook state changed", { newState: { name: "John" } });
        
        // Test Page package
        console.log("\n📄 Testing Page Package:");
        await Log("frontend", "info", "page", "Dashboard page loaded");
        await Log("frontend", "debug", "page", "Page navigation occurred", { from: "/login", to: "/dashboard" });
        
        // Test State package
        console.log("\n⚡ Testing State Package:");
        await Log("frontend", "info", "state", "User state updated", { previousState: null, newState: { id: "123" } });
        await Log("frontend", "debug", "state", "Local storage updated", { key: "user", value: { id: "123" } });
        
        // Test Style package
        console.log("\n🎨 Testing Style Package:");
        await Log("frontend", "info", "style", "Theme changed to dark mode");
        await Log("frontend", "debug", "style", "CSS animation completed", { element: "button", animation: "fadeIn" });
        
        // Test Error scenarios
        console.log("\n❌ Testing Error Scenarios:");
        await Log("frontend", "error", "api", "Failed to fetch user data", { error: "Network timeout", endpoint: "/users" });
        await Log("frontend", "warning", "component", "Component received invalid props", { props: { userId: null } });
        
        console.log("\n✅ All tests completed!");
        
    } catch (error) {
        console.error("❌ Test failed:", error.message);
    }
}

// Run the tests
runTests(); 