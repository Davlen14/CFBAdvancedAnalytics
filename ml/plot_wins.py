import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from matplotlib.font_manager import FontProperties
from data_collection import fetch_data, preprocess_data, fetch_team_info
import requests
from io import BytesIO
from PIL import Image

# Load and preprocess data
api_key = 'XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ'
years = range(2000, 2023 + 1)
df = fetch_data(api_key, years)
df = preprocess_data(df)
team_info = fetch_team_info(api_key)

# Specify the font path
font_path = '/Users/davlenswain/my-betting-bot/fonts/Exo2-Italic-VariableFont_wght.ttf'
font_prop = FontProperties(fname=font_path)

# List of teams to include in the plot
teams = ['Ohio State', 'Alabama', 'Michigan', 'Georgia', 'Clemson', 'Oklahoma', 'Notre Dame', 'LSU', 'Texas', 'Florida']

# Calculate wins per season for each team
wins_per_year = df[df['home_team'].isin(teams) | df['away_team'].isin(teams)].copy()

# Create a wins column and filter the data
wins_per_year.loc[:, 'home_win'] = wins_per_year['home_points'] > wins_per_year['away_points']
wins_per_year.loc[:, 'away_win'] = wins_per_year['away_points'] > wins_per_year['home_points']

# Create a dictionary to store wins per season for each team
wins_dict = {}
for team in teams:
    home_wins = wins_per_year[wins_per_year['home_team'] == team].groupby('season')['home_win'].sum()
    away_wins = wins_per_year[wins_per_year['away_team'] == team].groupby('season')['away_win'].sum()
    total_wins = home_wins.add(away_wins, fill_value=0)
    wins_dict[team] = total_wins

# Set up subplots
fig, axs = plt.subplots(5, 2, figsize=(15, 20), sharex=True, sharey=True)
axs = axs.flatten()

# Plot data for each team
for i, team in enumerate(teams):
    wins = wins_dict[team]
    axs[i].plot(wins.index, wins, label=team, marker='o', color=team_info[team]['color'])
    
    # Add team logo
    image_url = team_info[team]['logo']
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    imagebox = OffsetImage(image, zoom=0.1)
    ab = AnnotationBbox(imagebox, (wins.index[-1], wins.iloc[-1]), frameon=False)
    axs[i].add_artist(ab)
    
    axs[i].set_title(f'{team} Wins per Season')
    axs[i].grid(True)
    
plt.suptitle('GameDay Analytics: Most Successful Teams Over Years', fontsize=20, fontproperties=font_prop, color='red')
plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.show()






