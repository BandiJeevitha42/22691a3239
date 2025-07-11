import requests

url = "http://20.244.56.144/evaluation-service/auth"
data = {
    "email": "22691a3239@mits.ac.in",
    "name": "Bandi Jeevitha",
    "rollNo": "22691a3239",
    "accessCode": "caVvNH",
    "clientID": "190767b2-fd8f-4f60-8e8d-903c1b767a19",
    "clientSecret": "NUSFfrxWNrvvKqkU"
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("An error occurred:", e) 