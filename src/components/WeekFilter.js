import React from 'react';
import '../App.css'; // Import your App.css file

const WeekFilter = ({ currentWeek, onWeekChange }) => {
  const handleChange = (e) => {
    console.log("Week selected:", e.target.value);
    onWeekChange(Number(e.target.value));
  };

  return (
    <select
      className="week-filter" // Apply the class name defined in App.css
      value={currentWeek.toString()}
      onChange={handleChange}
    >
      {[...Array(15)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          Week {i + 1}
        </option>
      ))}
    </select>
  );
};

export default WeekFilter;
