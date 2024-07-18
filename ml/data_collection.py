# data_collection.py
import cfbd
import pandas as pd

# Function to get the data from the API
def fetch_data(api_key, years):
    configuration = cfbd.Configuration()
    configuration.api_key['Authorization'] = api_key
    configuration.api_key_prefix['Authorization'] = 'Bearer'
    
    api_client = cfbd.ApiClient(configuration)
    games_api = cfbd.GamesApi(api_client)
    
    all_data = []
    for year in years:
        # Fetch games data for the specified year
        games = games_api.get_games(year=year)
        
        # Convert data to pandas dataframe with selected fields
        data = [{
            'game_id': game.id,
            'home_team': game.home_team,
            'away_team': game.away_team,
            'home_points': game.home_points,
            'away_points': game.away_points,
            'home_pregame_elo': game.home_pregame_elo,
            'away_pregame_elo': game.away_pregame_elo,
            'home_postgame_elo': game.home_postgame_elo,
            'away_postgame_elo': game.away_postgame_elo,
            'home_win_prob': game.home_post_win_prob,
            'away_win_prob': game.away_post_win_prob,
            'attendance': game.attendance,
            'venue': game.venue,
            'season': game.season,
            'week': game.week,
            'start_date': game.start_date
        } for game in games]
        
        all_data.extend(data)
    
    df = pd.DataFrame(all_data)
    return df

# Function to fetch team logos and colors
def fetch_team_info(api_key):
    configuration = cfbd.Configuration()
    configuration.api_key['Authorization'] = api_key
    configuration.api_key_prefix['Authorization'] = 'Bearer'
    
    api_client = cfbd.ApiClient(configuration)
    teams_api = cfbd.TeamsApi(api_client)
    
    teams = teams_api.get_fbs_teams()
    
    team_info = {}
    for team in teams:
        team_info[team.school] = {
            'logo': team.logos[0] if team.logos else None,
            'color': team.color,
            'alt_color': team.alt_color
        }
    return team_info

# Preprocess the data
def preprocess_data(df):
    # Example preprocessing steps
    df = df.dropna()  # Drop rows with missing values
    # Feature engineering and other preprocessing steps here
    
    return df

if __name__ == "__main__":
    api_key = 'XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ'
    years = range(2000, 2023 + 1)  # Last 24 years including 2023
    df = fetch_data(api_key, years)
    df = preprocess_data(df)
    
    team_info = fetch_team_info(api_key)

    # Output the DataFrame and team info to the console
    print(df)
    print(team_info)



