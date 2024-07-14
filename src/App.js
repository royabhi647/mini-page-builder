import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [elements, setElements] = useState(() => {
    const savedElements = localStorage.getItem('elements');
    return savedElements ? JSON.parse(savedElements) : [];
  });

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  return (
    <div className="App">
      <Sidebar setElements={setElements} />
      <Canvas elements={elements} setElements={setElements} />
    </div>
  );
}

export default App;