import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const Footer = ({ setToken, setIsLoggedIn, isLoggedIn }) => {
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const location = useLocation();
  const { pathname } = location;

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

  return (
    <>
      <div className='footer'>
        <div className='footerLinks'>
          <div className='footerLinkContainer'>
            {pathname !== '/' ? (
              <Link to={{ pathname: '/' }} className='footerLink'>
                Home
              </Link>
            ) : null}
          </div>
          {pathname !== '/login' && pathname !== '/register' ? (
            isLoggedIn ? (
              <>
                {pathname !== '/profile' ? (
                  <div className='footerLinkContainer'>
                    <Link
                      to={{ pathname: `/profile/${userInfo.id}` }}
                      className='footerLink'
                    >
                      Profile
                    </Link>
                  </div>
                ) : null}
                <div className='footerLinkContainer'>
                  <div className='footerLink' onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='footerLinkContainer'>
                  <Link to={{ pathname: '/login' }} className='footerLink'>
                    Sign In
                  </Link>
                </div>
                <div className='footerLinkContainer'>
                  <Link to={{ pathname: '/register' }} className='footerLink'>
                    Sign Up
                  </Link>
                </div>
              </>
            )
          ) : null}
        </div>
        <div className='contributors'>
          <p className='footerText'>@merrick-vogt</p>
          <p className='footerText'>@davis-patterson</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
