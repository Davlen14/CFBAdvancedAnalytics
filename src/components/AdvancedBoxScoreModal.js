import React, { useState, useEffect } from 'react';
import { getAdvancedBoxScore } from '../services/CollegeFootballApi'; // Adjust the path as needed
import '../App.css'; // Import the main CSS file

const AdvancedBoxScoreModal = ({ gameId, onClose }) => {
  const [boxScore, setBoxScore] = useState(null);
  const [activeTab, setActiveTab] = useState('original');
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

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

  const handleMouseEnter = (e, text) => {
    const { clientX, clientY } = e;
    setTooltip({ visible: true, text, x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

  if (!boxScore) {
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'original':
        return renderOriginalBoxScore(boxScore);
      case 'ppa':
        return renderPPA(boxScore.teams.ppa);
      case 'cumulativePpa':
        return renderCumulativePPA(boxScore.teams.cumulativePpa);
      case 'successRates':
        return renderSuccessRates(boxScore.teams.successRates);
      case 'explosiveness':
        return renderExplosiveness(boxScore.teams.explosiveness);
      case 'rushing':
        return renderRushing(boxScore.teams.rushing);
      case 'havoc':
        return renderHavoc(boxScore.teams.havoc);
      case 'scoringOpportunities':
        return renderScoringOpportunities(boxScore.teams.scoringOpportunities);
      case 'fieldPosition':
        return renderFieldPosition(boxScore.teams.fieldPosition);
      case 'playerUsage':
        return renderPlayerUsage(boxScore.players.usage);
      case 'playerPPA':
        return renderPlayerPPA(boxScore.players.ppa);
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total points scored by the team')} onMouseLeave={handleMouseLeave}>Points</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Probability of winning the game')} onMouseLeave={handleMouseLeave}>Win Probability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{boxScore.gameInfo.homeTeam}</td>
            <td>{boxScore.gameInfo.homePoints}</td>
            <td>{boxScore.gameInfo.homeWinProb}</td>
          </tr>
          <tr>
            <td>{boxScore.gameInfo.awayTeam}</td>
            <td>{boxScore.gameInfo.awayPoints}</td>
            <td>{boxScore.gameInfo.awayWinProb}</td>
          </tr>
        </tbody>
      </table>
      <h3>Team Statistics</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of plays made')} onMouseLeave={handleMouseLeave}>Plays</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total score or value')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
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
      <h3>Cumulative PPA</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of plays made')} onMouseLeave={handleMouseLeave}>Plays</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total score or value')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Value for the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.cumulativePpa.map((teamStat, index) => (
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
      <h3>Success Rates</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Overall success rate')} onMouseLeave={handleMouseLeave}>Overall</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on standard downs')} onMouseLeave={handleMouseLeave}>Standard Downs</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on passing downs')} onMouseLeave={handleMouseLeave}>Passing Downs</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.successRates.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.overall.total}</td>
              <td>{teamStat.standardDowns.total}</td>
              <td>{teamStat.passingDowns.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Explosiveness</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total explosiveness')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.explosiveness.map((teamStat, index) => (
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
      <h3>Rushing</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on power rushing plays')} onMouseLeave={handleMouseLeave}>Power Success</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Rate at which runs are stopped at or before the line of scrimmage')} onMouseLeave={handleMouseLeave}>Stuff Rate</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained before contact')} onMouseLeave={handleMouseLeave}>Line Yards</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained at the second level (5-10 yards past the line of scrimmage)')} onMouseLeave={handleMouseLeave}>Second Level Yards</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained in the open field (more than 10 yards past the line of scrimmage)')} onMouseLeave={handleMouseLeave}>Open Field Yards</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.rushing.map((teamStat, index) => (
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
      <h3>Havoc</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Overall defensive havoc rate')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Havoc rate by the front seven (defensive line and linebackers)')} onMouseLeave={handleMouseLeave}>Front Seven</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Havoc rate by defensive backs (safeties and cornerbacks)')} onMouseLeave={handleMouseLeave}>DB</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.havoc.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.total}</td>
              <td>{teamStat.frontSeven}</td>
              <td>{teamStat.db}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Scoring Opportunities</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of scoring opportunities')} onMouseLeave={handleMouseLeave}>Opportunities</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total points scored')} onMouseLeave={handleMouseLeave}>Points</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Average points scored per scoring opportunity')} onMouseLeave={handleMouseLeave}>Points Per Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.scoringOpportunities.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.opportunities}</td>
              <td>{teamStat.points}</td>
              <td>{teamStat.pointsPerOpportunity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Field Position</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Average starting field position')} onMouseLeave={handleMouseLeave}>Average Start</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points based on starting field position')} onMouseLeave={handleMouseLeave}>Average Starting Predicted Points</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.teams.fieldPosition.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.averageStart}</td>
              <td>{teamStat.averageStartingPredictedPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Player Usage</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the player')} onMouseLeave={handleMouseLeave}>Player</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Team the player belongs to')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Position of the player')} onMouseLeave={handleMouseLeave}>Position</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total usage value')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Rushing usage value')} onMouseLeave={handleMouseLeave}>Rushing</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Passing usage value')} onMouseLeave={handleMouseLeave}>Passing</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.players.usage.map((playerStat, index) => (
            <tr key={index}>
              <td>{playerStat.player}</td>
              <td>{playerStat.team}</td>
              <td>{playerStat.position}</td>
              <td>{playerStat.total}</td>
              <td>{playerStat.quarter1}</td>
              <td>{playerStat.quarter2}</td>
              <td>{playerStat.quarter3}</td>
              <td>{playerStat.quarter4}</td>
              <td>{playerStat.rushing}</td>
              <td>{playerStat.passing}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Player PPA</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the player')} onMouseLeave={handleMouseLeave}>Player</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Team the player belongs to')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Position of the player')} onMouseLeave={handleMouseLeave}>Position</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total predicted points added')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added from rushing')} onMouseLeave={handleMouseLeave}>Rushing</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added from passing')} onMouseLeave={handleMouseLeave}>Passing</th>
          </tr>
        </thead>
        <tbody>
          {boxScore.players.ppa.map((playerStat, index) => (
            <tr key={index}>
              <td>{playerStat.player}</td>
              <td>{playerStat.team}</td>
              <td>{playerStat.position}</td>
              <td>{playerStat.average.total}</td>
              <td>{playerStat.average.quarter1}</td>
              <td>{playerStat.average.quarter2}</td>
              <td>{playerStat.average.quarter3}</td>
              <td>{playerStat.average.quarter4}</td>
              <td>{playerStat.average.rushing}</td>
              <td>{playerStat.average.passing}</td>
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of plays made')} onMouseLeave={handleMouseLeave}>Plays</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total predicted points added')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
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

  const renderCumulativePPA = (cumulativePpa) => (
    <div>
      <h3>Cumulative PPA</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of plays made')} onMouseLeave={handleMouseLeave}>Plays</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total cumulative predicted points added')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Cumulative predicted points added in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Cumulative predicted points added in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Cumulative predicted points added in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Cumulative predicted points added in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
          </tr>
        </thead>
        <tbody>
          {cumulativePpa.map((teamStat, index) => (
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Overall success rate')} onMouseLeave={handleMouseLeave}>Overall</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on standard downs')} onMouseLeave={handleMouseLeave}>Standard Downs</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on passing downs')} onMouseLeave={handleMouseLeave}>Passing Downs</th>
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total explosiveness')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Explosiveness in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Success rate on power rushing plays')} onMouseLeave={handleMouseLeave}>Power Success</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Rate at which runs are stopped at or before the line of scrimmage')} onMouseLeave={handleMouseLeave}>Stuff Rate</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained before contact')} onMouseLeave={handleMouseLeave}>Line Yards</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained at the second level (5-10 yards past the line of scrimmage)')} onMouseLeave={handleMouseLeave}>Second Level Yards</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Yards gained in the open field (more than 10 yards past the line of scrimmage)')} onMouseLeave={handleMouseLeave}>Open Field Yards</th>
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
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Overall defensive havoc rate')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Havoc rate by the front seven (defensive line and linebackers)')} onMouseLeave={handleMouseLeave}>Front Seven</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Havoc rate by defensive backs (safeties and cornerbacks)')} onMouseLeave={handleMouseLeave}>DB</th>
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

  const renderScoringOpportunities = (scoringOpportunities) => (
    <div>
      <h3>Scoring Opportunities</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Number of scoring opportunities')} onMouseLeave={handleMouseLeave}>Opportunities</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total points scored')} onMouseLeave={handleMouseLeave}>Points</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Average points scored per scoring opportunity')} onMouseLeave={handleMouseLeave}>Points Per Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {scoringOpportunities.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.opportunities}</td>
              <td>{teamStat.points}</td>
              <td>{teamStat.pointsPerOpportunity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFieldPosition = (fieldPosition) => (
    <div>
      <h3>Field Position</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the team')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Average starting field position')} onMouseLeave={handleMouseLeave}>Average Start</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points based on starting field position')} onMouseLeave={handleMouseLeave}>Average Starting Predicted Points</th>
          </tr>
        </thead>
        <tbody>
          {fieldPosition.map((teamStat, index) => (
            <tr key={index}>
              <td>{teamStat.team}</td>
              <td>{teamStat.averageStart}</td>
              <td>{teamStat.averageStartingPredictedPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPlayerUsage = (usage) => (
    <div>
      <h3>Player Usage</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the player')} onMouseLeave={handleMouseLeave}>Player</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Team the player belongs to')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Position of the player')} onMouseLeave={handleMouseLeave}>Position</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total usage value')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Usage value in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Rushing usage value')} onMouseLeave={handleMouseLeave}>Rushing</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Passing usage value')} onMouseLeave={handleMouseLeave}>Passing</th>
          </tr>
        </thead>
        <tbody>
          {usage.map((playerStat, index) => (
            <tr key={index}>
              <td>{playerStat.player}</td>
              <td>{playerStat.team}</td>
              <td>{playerStat.position}</td>
              <td>{playerStat.total}</td>
              <td>{playerStat.quarter1}</td>
              <td>{playerStat.quarter2}</td>
              <td>{playerStat.quarter3}</td>
              <td>{playerStat.quarter4}</td>
              <td>{playerStat.rushing}</td>
              <td>{playerStat.passing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPlayerPPA = (ppa) => (
    <div>
      <h3>Player PPA</h3>
      <table>
        <thead>
          <tr>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Name of the player')} onMouseLeave={handleMouseLeave}>Player</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Team the player belongs to')} onMouseLeave={handleMouseLeave}>Team</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Position of the player')} onMouseLeave={handleMouseLeave}>Position</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Total predicted points added')} onMouseLeave={handleMouseLeave}>Total</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 1st quarter')} onMouseLeave={handleMouseLeave}>Q1</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 2nd quarter')} onMouseLeave={handleMouseLeave}>Q2</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 3rd quarter')} onMouseLeave={handleMouseLeave}>Q3</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added in the 4th quarter')} onMouseLeave={handleMouseLeave}>Q4</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added from rushing')} onMouseLeave={handleMouseLeave}>Rushing</th>
            <th onMouseEnter={(e) => handleMouseEnter(e, 'Predicted points added from passing')} onMouseLeave={handleMouseLeave}>Passing</th>
          </tr>
        </thead>
        <tbody>
          {ppa.map((playerStat, index) => (
            <tr key={index}>
              <td>{playerStat.player}</td>
              <td>{playerStat.team}</td>
              <td>{playerStat.position}</td>
              <td>{playerStat.average.total}</td>
              <td>{playerStat.average.quarter1}</td>
              <td>{playerStat.average.quarter2}</td>
              <td>{playerStat.average.quarter3}</td>
              <td>{playerStat.average.quarter4}</td>
              <td>{playerStat.average.rushing}</td>
              <td>{playerStat.average.passing}</td>
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
            <button className="tab-button" onClick={() => setActiveTab('cumulativePpa')}>Cumulative PPA</button>
            <button className="tab-button" onClick={() => setActiveTab('successRates')}>Success Rates</button>
            <button className="tab-button" onClick={() => setActiveTab('explosiveness')}>Explosiveness</button>
            <button className="tab-button" onClick={() => setActiveTab('rushing')}>Rushing</button>
            <button className="tab-button" onClick={() => setActiveTab('havoc')}>Havoc</button>
            <button className="tab-button" onClick={() => setActiveTab('scoringOpportunities')}>Scoring Opportunities</button>
            <button className="tab-button" onClick={() => setActiveTab('fieldPosition')}>Field Position</button>
            <button className="tab-button" onClick={() => setActiveTab('playerUsage')}>Player Usage</button>
            <button className="tab-button" onClick={() => setActiveTab('playerPPA')}>Player PPA</button>
          </div>
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        {tooltip.visible && (
          <div
            className="tooltip"
            style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedBoxScoreModal;





