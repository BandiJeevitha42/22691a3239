import requests

url = "http://20.244.56.144/evaluation-service/register"
data = {
    "email": "22691a3239@mits.ac.in",
    "name": "Bandi Jeevitha",
    "mobileNo": "9701172792",
    "githubUsername": "BandiJeevitha42",
    "rollNo": "22691a3239",
    "accessCode": "caVvNH"
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("An error occurred:", e) 