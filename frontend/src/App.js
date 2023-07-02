import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import MoodTracker from './components/MoodTracker';
import '../src/App.css'

function App() {

  return (
    <div>
      <MoodTracker />
    </div>
  );
}

export default App