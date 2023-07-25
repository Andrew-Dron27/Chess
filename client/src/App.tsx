import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Components/Board/Board';
import BoardScreen from './Components/Screens/BoardScreen/BoardScreen';

function App() {
  return (
    <div className="Chess">
      <BoardScreen/>
    </div>
  );
}

export default App;
