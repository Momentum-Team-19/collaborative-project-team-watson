import { useState } from 'react';
import NavBar from 'components/NavBar';
import Login from 'components/Login';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let content;

  if (currentView === 'home') {
    content = (
      <div>
        <NavBar />
        <Login setToken={setToken} />
        <Q_Feed />
      </div>
    );
  } else {
    content = (
      <div>
        <NavBar />
        <Login setToken={setToken} />
        <Q_Detail />
      </div>
    );
  }

  return <>{content}</>;
}

export default App;
