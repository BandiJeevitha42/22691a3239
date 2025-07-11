import requests

url = "http://20.244.56.144/evaluation-service/logs"


headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEzMjM5QG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTE3NDAsImlhdCI6MTc1MjIxMDg0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjAyOWNkYzY3LTBhY2MtNDQzZS05NGQxLTk3NjRiODY0ZGIwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwic3ViIjoiMTkwNzY3YjItZmQ4Zi00ZjYwLThlOGQtOTAzYzFiNzY3YTE5In0sImVtYWlsIjoiMjI2OTFhMzIzOUBtaXRzLmFjLmluIiwibmFtZSI6ImJhbmRpIGplZXZpdGhhIiwicm9sbE5vIjoiMjI2OTFhMzIzOSIsImFjY2Vzc0NvZGUiOiJjYVZ2TkgiLCJjbGllbnRTZWNyZXQiOiJOVVNGZnJ4V05ydnZLcWtVIn0.6t1KlAPwcMKwDS3BcCr3Rc8WNXSOgOwKCJcZm7nFN9w",
    "Content-Type": "application/json"
}

data = {
    "stack": "frontend",  
    "level": "info",      
    "package": "react",   #
    "message": "Test log message from 22691a3239"
}

try:
    response = requests.post(url, json=data, headers=headers)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("An error occurred:", e) 