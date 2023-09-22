import { Link, useLocation } from 'react-router-dom';

const Footer = ({ setToken, setIsLoggedIn, isLoggedIn }) => {
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
  };

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
                <div className='footerLinkContainer'>
                  <div className='footerLink' onClick={handleLogout}>
                    Logout
                  </div>
                </div>
                {pathname !== '/profile' ? (
                  <div className='footerLinkContainer'>
                    <Link to={{ pathname: '/profile' }} className='footerLink'>
                      Profile
                    </Link>
                  </div>
                ) : null}
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
