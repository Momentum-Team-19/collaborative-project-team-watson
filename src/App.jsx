import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from 'components/NavBar';
import Login from 'components/Login';
import Register from 'components/Register';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
      />
      <Routes>
        <Route path='/' element={<Q_Feed token={token} />} />
        <Route
          path='/login'
          element={<Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path='/register'
          element={
            <Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
