# ml/app.py
from flask import Flask, request, send_file, jsonify
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from matplotlib.font_manager import FontProperties
from data_collection import fetch_data, preprocess_data, fetch_team_info
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Load and preprocess data
api_key = 'XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ'
years = range(2000, 2023 + 1)
df = fetch_data(api_key, years)
df = preprocess_data(df)
team_info = fetch_team_info(api_key)

# Specify the font path
font_path = '/Users/davlenswain/my-betting-bot/fonts/Exo2-Italic-VariableFont_wght.ttf'
font_prop = FontProperties(fname=font_path)

@app.route('/compare-teams', methods=['POST'])
def compare_teams():
    data = request.json
    teams = data['teams']
    season_range = data['season_range']
    stat = data['stat']

    # Filter data based on user input
    filtered_df = df[(df['season'] >= season_range[0]) & (df['season'] <= season_range[1])]
    filtered_df = filtered_df[filtered_df['home_team'].isin(teams) | filtered_df['away_team'].isin(teams)]

    # Calculate wins per season for each team
    filtered_df.loc[:, 'home_win'] = filtered_df['home_points'] > filtered_df['away_points']
    filtered_df.loc[:, 'away_win'] = filtered_df['away_points'] > filtered_df['home_points']

    wins_dict = {}
    for team in teams:
        home_wins = filtered_df[filtered_df['home_team'] == team].groupby('season')['home_win'].sum()
        away_wins = filtered_df[filtered_df['away_team'] == team].groupby('season')['away_win'].sum()
        total_wins = home_wins.add(away_wins, fill_value=0)
        wins_dict[team] = total_wins

    # Set up subplots
    fig, axs = plt.subplots(len(teams), 1, figsize=(15, len(teams) * 4), sharex=True, sharey=True)
    if len(teams) == 1:
        axs = [axs]

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

    plt.suptitle('GameDay Analytics: Team Comparison', fontsize=20, fontproperties=FontProperties(fname=font_path), color='red')
    plt.tight_layout(rect=[0, 0, 1, 0.97])

    # Save the plot as an image file
    output_path = 'comparison_plot.png'
    plt.savefig(output_path)

    return send_file(output_path, mimetype='image/png')

if __name__ == "__main__":
    app.run(debug=True)
