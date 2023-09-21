import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import NavBar from 'components/NavBar';
import Login from 'components/Login';
import Register from 'components/Register';
import Q_Detail from 'components/Q_Detail';
import Q_Feed from 'components/Q_Feed';
import './App.css';
import Q_Create from './components/Q_Create';
import Q_Delete from './components/Q_Delete';
import axios from 'axios';
// import { fetchData } from './assets/requests';

function App() {
  const [token, setToken] = useLocalStorageState('userToken', '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  

  // console.log(fetchData('https://qb.fly.dev/questions', token))


  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      console.log('token', token)
      try {
        // Make the API call
        const response = await axios.get(`https://qb.fly.dev/questions`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });

        // Set the response data to state
        setData(response.data);
        
      } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
      }
    };

    // // Call the async function
    // let endpoint = 'https://qb.fly.dev/questions';
    // setData(fetchData(endpoint, token));
    fetchData();

  }, [token]); // Empty dependency array means this useEffect runs once when component mounts

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
      />
      <Routes>
        <Route path='/' element={
          <Q_Feed data={data} token={token}>
            
            <Q_Detail token={token}>
              <Q_Delete token={token} />
            </Q_Detail>

            <Q_Create token={token} />
          </Q_Feed> 
          } 
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
    </>
  );
}

export default App;
