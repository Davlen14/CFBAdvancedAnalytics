# ml/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib
from data_collection import fetch_data, preprocess_data

# Load and preprocess data
api_key = 'XB5Eui0++wuuyh5uZ2c+UJY4jmLKQ2jxShzJXZaM9ET21a1OgubV4/mFlCxzsBIQ'
years = range(2000, 2023 + 1)
df = fetch_data(api_key, years)
df = preprocess_data(df)

# Feature selection and target variable
df['point_diff'] = df['home_points'] - df['away_points']
df['elo_diff'] = df['home_pregame_elo'] - df['away_pregame_elo']
df['win_prob_diff'] = df['home_win_prob'] - df['away_win_prob']

features = ['home_pregame_elo', 'away_pregame_elo', 'home_postgame_elo', 'away_postgame_elo', 
            'home_win_prob', 'away_win_prob', 'attendance', 'elo_diff', 'win_prob_diff']
X = df[features]
y = df['point_diff']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model with hyperparameter tuning
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [None, 10],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1]
}
model = GridSearchCV(RandomForestRegressor(), param_grid, cv=5, scoring='neg_mean_absolute_error', n_jobs=-1)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Model Mean Absolute Error: {mae}")

# Save the trained model
# joblib.dump(model.best_estimator_, 'game_prediction_model.pkl')








