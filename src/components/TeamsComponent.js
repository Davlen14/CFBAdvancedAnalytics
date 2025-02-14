import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../App.css';
import MetricsComponent from './MetricsComponent'; // Ensure you have this import

import { getFBSTeams, getTeamRosters } from '../services/CollegeFootballApi';

Modal.setAppElement('#root'); // For accessibility

const conferenceLogos = {
  "ACC": "/conference-logos/ACC.png",
  "American Athletic": "/conference-logos/American Athletic.png",
  "Big 12": "/conference-logos/Big 12.png",
  "Big Ten": "/conference-logos/Big Ten.png",
  "Conference USA": "/conference-logos/Conference USA.png",
  "FBS Independents": "/conference-logos/FBS Independents.png",
  "Mid-American": "/conference-logos/Mid-American.png",
  "Mountain West": "/conference-logos/Mountain West.png",
  "Pac-12": "/conference-logos/Pac-12.png",
  "SEC": "/conference-logos/SEC.png",
  "Sun Belt": "/conference-logos/Sun Belt.png"
};

function TeamsComponent() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('');
  const [roster, setRoster] = useState([]);

  const year = 2023; // You can make this dynamic as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFBSTeams(year);
        setTeams(data);
        setIsLoading(false);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year]);

  const openModal = (team) => {
    setSelectedTeam(team);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setModalIsOpen(false);
  };

  const handleViewChange = async (view) => {
    setCurrentView(view);
    if (view === 'Roster' && selectedTeam) {
      try {
        const rosterData = await getTeamRosters(selectedTeam.school);
        setRoster(rosterData);
      } catch (error) {
        console.error('Error fetching roster:', error);
      }
    }
  };

  const groupedTeams = teams.reduce((acc, team) => {
    if (!acc[team.conference]) {
      acc[team.conference] = [];
    }
    acc[team.conference].push(team);
    return acc;
  }, {});

  return (
    <div>
      <div className="second-navbar">
        <button className="second-nav-button">Standings</button>
        <button className="second-nav-button">Stats</button>
        <button className="second-nav-button">Rankings</button>
        <button className="second-nav-button">Football Power Index</button>
      </div>
  
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {Object.keys(groupedTeams).map((conference) => (
        <div key={conference} className="conference-section">
          <div className="conference-header">
            <img src={conferenceLogos[conference]} alt={`${conference} logo`} className="conference-logo" />
          </div>
          <div className="teams-container">
            {groupedTeams[conference].map((team) => (
              <div key={team.id} className="team-card" onClick={() => openModal(team)}>
                {team.logos && team.logos.length > 0 && (
                  <img src={team.logos[0]} alt={`${team.school} logo`} className="team-logo" />
                )}
                <span className="team-name">{team.school}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Team Details Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        {selectedTeam && (
          <div>
            <img src={selectedTeam.logos[0]} alt={`${selectedTeam.school} logo`} className="modal-team-logo" />
            <h2>{selectedTeam.school} - {selectedTeam.mascot}</h2>
            <p>Conference: {selectedTeam.conference}</p>
            <p>City: {selectedTeam.location.city}, State: {selectedTeam.location.state}</p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={() => handleViewChange('Statistics')}>Statistics</button>
              <button className="modal-button" onClick={() => handleViewChange('Rankings')}>Rankings</button>
              <button className="modal-button" onClick={() => handleViewChange('Schedule')}>Schedule</button>
              <button className="modal-button" onClick={() => handleViewChange('Roster')}>Roster</button>
            </div>
            {currentView === 'Statistics' && <div>Statistics content here</div>}
            {currentView === 'Rankings' && <div>Rankings content here</div>}
            {currentView === 'Schedule' && <div>Schedule content here</div>}
            {currentView === 'Roster' && (
              <div className="roster-container">
                <h3>Roster</h3>
                <ul className="roster-list">
                  {roster.map((player) => (
                    <li key={player.id}>
                      {player.first_name} {player.last_name} - {player.position}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        )}
      </Modal>
  
      {/* News and Articles Section */}
      <div className="news-container">
        <h2 className="section-title">Latest News</h2>
        <div className="news-item">
          <img src={`${process.env.PUBLIC_URL}/quinn.jpg`} alt="News" className="news-image" />
          <div className="news-content">
            <div className="news-title">College Football News</div>
            <div className="news-description">
              Check out the latest news on ESPN.
            </div>
            <a href="https://www.espn.com/college-football/" target="_blank" rel="noopener noreferrer" className="news-link-button">Read more</a>
          </div>
        </div>
        <div className="news-item">
          <img src={`${process.env.PUBLIC_URL}/Ryan.jpg`} alt="News" className="news-image" />
          <div className="news-content">
            <div className="news-title">Ohio State HC Ryan Day Under Extreme Pressure Heading into 2024</div>
            <div className="news-description">
              Read about the latest updates on Ohio State's head coach Ryan Day.
            </div>
            <a href="https://www.yardbarker.com/college_football/articles/ohio_state_hc_ryan_day_under_extreme_pressure_heading_into_2024/s1_13132_40563228" target="_blank" rel="noopener noreferrer" className="news-link-button">Read more</a>
          </div>
        </div>
        {/* Add more news items as needed */}
      </div>
      
      {/* Pass the selectedTeam to MetricsComponent */}
      <MetricsComponent selectedTeam={selectedTeam} />
    </div>
  );
}

export default TeamsComponent;




















