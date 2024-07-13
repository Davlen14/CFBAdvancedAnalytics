import React, { useState, useEffect } from 'react';
import { getAdvancedBoxScore } from '../services/CollegeFootballApi'; // Adjust the path as needed
import '../App.css'; // Import the main CSS file

const AdvancedBoxScoreModal = ({ gameId, onClose }) => {
  const [boxScore, setBoxScore] = useState(null);
  const [activeTab, setActiveTab] = useState('original');

  useEffect(() => {
    const fetchBoxScore = async () => {
      try {
        const data = await getAdvancedBoxScore(gameId);
        setBoxScore(data);
      } catch (error) {
        console.error('Error fetching advanced box score:', error);
      }
    };

    fetchBoxScore();
  }, [gameId]);

  if (!boxScore) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'original':
        return renderOriginalBoxScore(boxScore);
      case 'ppa':
        return renderPPA(boxScore.teams.ppa);
      case 'successRates':
        return renderSuccessRates(boxScore.teams.successRates);
      case 'explosiveness':
        return renderExplosiveness(boxScore.teams.explosiveness);
      case 'rushing':
        return renderRushing(boxScore.teams.rushing);
      case 'havoc':
        return renderHavoc(boxScore.teams.havoc);
      default:
        return null;
    }
  };

  const renderOriginalBoxScore = (boxScore) => (
    <div>
      <h3>Original Box Score</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Plays</th>
            <th>Total</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.ppa.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.plays}</td>
              <td>{teamStat.overall.total}</td>
              <td>{teamStat.overall.quarter1}</td>
              <td>{teamStat.overall.quarter2}</td>
              <td>{teamStat.overall.quarter3}</td>
              <td>{teamStat.overall.quarter4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPPA = (ppa) => (
    <div>
      <h3>Predicted Points Added (PPA)</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Plays</th>
            <th>Total</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
          </tr>
        </thead>
        <tbody>
          {ppa.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.plays}</td>
              <td>{teamStat.overall.total}</td>
              <td>{teamStat.overall.quarter1}</td>
              <td>{teamStat.overall.quarter2}</td>
              <td>{teamStat.overall.quarter3}</td>
              <td>{teamStat.overall.quarter4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSuccessRates = (successRates) => (
    <div>
      <h3>Success Rates</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Overall</th>
            <th>Standard Downs</th>
            <th>Passing Downs</th>
          </tr>
        </thead>
        <tbody>
          {successRates.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.overall.total}</td>
              <td>{teamStat.standardDowns.total}</td>
              <td>{teamStat.passingDowns.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderExplosiveness = (explosiveness) => (
    <div>
      <h3>Explosiveness</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Total</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
          </tr>
        </thead>
        <tbody>
          {explosiveness.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.overall.total}</td>
              <td>{teamStat.overall.quarter1}</td>
              <td>{teamStat.overall.quarter2}</td>
              <td>{teamStat.overall.quarter3}</td>
              <td>{teamStat.overall.quarter4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRushing = (rushing) => (
    <div>
      <h3>Rushing</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Power Success</th>
            <th>Stuff Rate</th>
            <th>Line Yards</th>
            <th>Second Level Yards</th>
            <th>Open Field Yards</th>
          </tr>
        </thead>
        <tbody>
          {rushing.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.powerSuccess}</td>
              <td>{teamStat.stuffRate}</td>
              <td>{teamStat.lineYards}</td>
              <td>{teamStat.secondLevelYards}</td>
              <td>{teamStat.openFieldYards}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHavoc = (havoc) => (
    <div>
      <h3>Havoc</h3>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Total</th>
            <th>Front Seven</th>
            <th>DB</th>
          </tr>
        </thead>
        <tbody>
          {havoc.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.total}</td>
              <td>{teamStat.frontSeven}</td>
              <td>{teamStat.db}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <div className="team-info">
            <span className="team-name">{boxScore.gameInfo.homeTeam}</span>
            <span className="team-score">{boxScore.gameInfo.homePoints}</span>
            <span className="team-name">{boxScore.gameInfo.awayTeam}</span>
            <span className="team-score">{boxScore.gameInfo.awayPoints}</span>
          </div>
        </div>
        <div className="modal-body">
          <div className="tabs">
            <button className="tab-button" onClick={() => setActiveTab('original')}>Original Box Score</button>
            <button className="tab-button" onClick={() => setActiveTab('ppa')}>PPA</button>
            <button className="tab-button" onClick={() => setActiveTab('successRates')}>Success Rates</button>
            <button className="tab-button" onClick={() => setActiveTab('explosiveness')}>Explosiveness</button>
            <button className="tab-button" onClick={() => setActiveTab('rushing')}>Rushing</button>
            <button className="tab-button" onClick={() => setActiveTab('havoc')}>Havoc</button>
          </div>
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBoxScoreModal;

