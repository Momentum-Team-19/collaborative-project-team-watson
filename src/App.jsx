import { useState } from 'react';
import NavBar from 'components/NavBar';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('question');

  let content;

  if (currentView === 'home') {
    content = (
      <div>
        <NavBar />
        <Q_Feed />
      </div>
    );
  } else {
    content = (
      <div>
        <NavBar />
        <Q_Detail />
      </div>
    );
  }

  return <>{content}</>;
}

export default App;
