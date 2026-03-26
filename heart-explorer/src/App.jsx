import React from 'react';
import HeartScene from './components/HeartScene';
import PartsList from './components/PartsList';
import InfoPanel from './components/InfoPanel';
import Toolbar from './components/Toolbar';
import HoverTooltip from './components/HoverTooltip';
import { useHeartState } from './hooks/useHeartState';

function App() {
  const heartState = useHeartState();

  return (
    <div className="app-container">
      <Toolbar />
      <main className="main-content">
        <PartsList />
        <div className="scene-wrapper">
          <HeartScene />
          <HoverTooltip />
        </div>
        <InfoPanel />
      </main>
    </div>
  );
}

export default App;
