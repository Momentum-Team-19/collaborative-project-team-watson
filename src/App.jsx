import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import NavBar from 'components/NavBar';
import Login from 'components/Login';
import Register from 'components/Register';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import User_Profile from './components/User_Profile';
import User_Edit from './components/User_Edit';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';
// import { fetchData } from './assets/requests';

function App() {
  const [token, setToken] = useLocalStorageState('userToken', '');
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState(
    'userIsLoggedIn',
    false
  );
  const [searchResults, setSearchResults] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Define an async function
    const fetchSearchResults = async () => {
      try {
        // Make the API call
        const response = await axios.get(`https://qb.fly.dev/questions`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        // Set the response data to state
        setSearchResults(response.data);
      } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
      }
    };

    fetchSearchResults();
  }, [token]);

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Q_Feed
              token={token}
              searchResults={searchResults}
              setSelectedQuestion={setSelectedQuestion}
            />
          }
        />
        <Route
          path='/questions/:questionID'
          element={
            <Q_Detail
              token={token}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          }
        />

        <Route
          path='/profile'
          element={<User_Profile token={token} isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='/profile/edit'
          element={<User_Edit isLoggedIn={isLoggedIn} token={token} />}
        />

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
      <Footer
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default App;
