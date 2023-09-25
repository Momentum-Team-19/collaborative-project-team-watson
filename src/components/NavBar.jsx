import { Link, useLocation } from 'react-router-dom';

const NavBar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  isDarkMode,
  setIsDarkMode,
  children,
}) => {
  const location = useLocation();
  const { pathname } = location;

  const handleDark = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
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
        <div className='addContainer'>
          <p className='addButton'>+</p>
        </div>
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
              {pathname !== '/profile' ? (
                <Link to={{ pathname: '/profile' }} className='activeUserLink'>
                  😎
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
