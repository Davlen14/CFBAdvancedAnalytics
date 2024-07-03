import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFBSTeams } from '../services/CollegeFootballApi';

function TeamsComponent() {
  const { conference } = useParams();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFBSTeams();
        if (conference) {
          // Filter teams by conference if a conference is specified
          const filteredTeams = data.filter((team) => team.conference === conference);
          setTeams(filteredTeams);
        } else {
          setTeams(data);
        }
        setIsLoading(false);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [conference]);

  return (
    <div>
      <h1>FBS Teams</h1>
      <div className="teams-container">
        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <button className="team-button">
              {team.logos && team.logos.length > 0 && (
                <img src={team.logos[0]} alt={`${team.school} logo`} className="team-logo" />
              )}
              <span className="team-name">{team.school}</span>
            </button>
          </div>
        ))}
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default TeamsComponent;



