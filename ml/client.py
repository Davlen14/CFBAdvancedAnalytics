# ml/client.py
import requests
import json

# Your local Flask app URL with the new port
url = 'http://127.0.0.1:5001/compare-teams'

# Data for comparing teams
data = {
    "teams": ["Ohio State", "Alabama"],  # Teams to compare
    "season_range": [2010, 2023],  # Range of seasons to consider
    "stat": "wins"  # Statistic to compare
}

headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json.dumps(data), headers=headers)

print(f"Status Code: {response.status_code}")

if response.status_code == 200:
    with open('comparison_plot.png', 'wb') as f:
        f.write(response.content)
    print("Comparison plot saved as 'comparison_plot.png'")
else:
    print(f"Error: {response.text}")



