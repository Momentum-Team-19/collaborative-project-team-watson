import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const NavBar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  isDarkMode,
  setIsDarkMode,
  children,
}) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  const robohashUrl = userInfo
    ? `https://robohash.org/${userInfo.username}${userInfo.id}.png`
    : null;

  let userImg;
  if (userInfo) {
    if (userInfo.photo === null) {
      userImg = robohashUrl;
    } else {
      userImg = userInfo.photo;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        if (isLoggedIn) {
          try {
            const userInfoUrl = `https://qb.fly.dev/auth/users/me/`;
            const userInfoResponse = await axios.get(userInfoUrl, {
              headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
              },
            });
            setUserInfo(userInfoResponse.data);
          } catch (error) {
            console.error('There was an error fetching data', error);
          }
        } else {
          setUserInfo(null);
        }
      };

      fetchUserInfo();
    }
  }, [token, isLoggedIn]);

  const handleDark = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    const logoutUrl = 'https://qb.fly.dev/auth/token/logout/';
    axios
      .post(
        logoutUrl,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setToken('');
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(
          'There was an error logging out',
          err.response.data.non_field_errors
        );
        if (err.response.status === 401) {
          setToken('');
          setIsLoggedIn(false);
          navigate('/login');
        }
      });
  };

  return (
    <>
      <header>
        <div className='linkContainer'>
          <Link to={{ pathname: '/' }} className='homepageLink'>
            Q!
          </Link>
        </div>
        <div className='searchContainer'>{children}</div>
        <Link to={{ pathname: '/create' }}>
          <div className='addContainer'>
            <p className='addButton'>+</p>
          </div>
        </Link>
        <div className='darkToggle'>
          <p
            className={isDarkMode ? 'darkInput' : 'lightInput'}
            onClick={handleDark}
          ></p>
        </div>
        {pathname !== '/login' && pathname !== '/register' ? (
          isLoggedIn ? (
            <div className='loginContainer'>
              <p className='logoutText' onClick={handleLogout}>
                logout
              </p>
              {pathname !== `/profile/${userInfo.username}` ? (
                <Link
                  to={{ pathname: `/profile/${userInfo.username}` }}
                  className='activeUserLink'
                >
                  <img className='userNavImg' src={userImg}></img>
                </Link>
              ) : null}
            </div>
          ) : (
            <div className='loginContainer'>
              <Link to={{ pathname: '/login' }} className='signInText'>
                sign in
              </Link>
              <Link to={{ pathname: '/register' }} className='signUpText'>
                sign up
              </Link>
            </div>
          )
        ) : null}
      </header>
    </>
  );
};
export default NavBar;
