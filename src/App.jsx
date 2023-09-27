import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import Login from 'components/Login';
import Register from 'components/Register';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import User_Profile from 'components/User_Profile';
import Footer from 'components/Footer';
import axios from 'axios';
import './App.css';
import User_Edit from './components/User_Edit';
import New_Question from './components/New_Question';
import AuthContext from './components/AuthContext';

function App() {
  const [token, setToken] = useLocalStorageState('userToken', '');
  const [loggedInUser, setLoggedInUser] = useLocalStorageState(
    'loggedInUserData',
    null
  );

  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState(
    'userIsLoggedIn',
    false
  );
  const [searchResults, setSearchResults] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('isDakMode', false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetching the logged-in user's data
    const fetchLoggedInUser = async () => {
      if (!token) {
        console.log('no token');
        return;
      }

      try {
        const response = await axios.get(`https://qb.fly.dev/auth/users/me/`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          setLoggedInUser(null);
          console.log('User is not logged in');
        } else {
          console.error('There was an error fetching logged-in user data');
        }
      }
    };

    fetchLoggedInUser();
  }),
    [token];

  useEffect(() => {
    // Define an async function
    const fetchSearchResults = async () => {
      try {
        // Make the API call
        const response = await axios.get(
          `https://qb.fly.dev/questions?search=${searchTerm}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        // Set the response data to state
        setSearchResults(response.data);
      } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
      }
    };

    fetchSearchResults();
  }, [token, searchTerm]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, loggedInUser, setLoggedInUser }}
    >
      <NavBar
        isLoggedIn={isLoggedIn}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        token={token}
      >
        <SearchBar setSearchTerm={setSearchTerm} />
      </NavBar>
      <Routes>
        <Route path='/' element={<Navigate to='/page/1' replace />} />
        <Route
          path='/page/:page'
          element={
            <Q_Feed
              token={token}
              searchResults={searchResults}
              setSelectedQuestion={setSelectedQuestion}
              itemsPerPage={itemsPerPage}
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
          path='/create'
          element={<New_Question token={token} isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='/profile/:userID'
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
        token={token}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
    </AuthContext.Provider>
  );
}

export default App;
