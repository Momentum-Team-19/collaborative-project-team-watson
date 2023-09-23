import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
  const location = useLocation();
  const { pathname } = location;

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
        <div className='searchContainer'>
          <input
            className='searchBar'
            type='text'
            name='Search'
            placeholder='Search...'
          ></input>
        </div>
        {pathname !== '/login' && pathname !== '/register' ? (
          isLoggedIn ? (
            <div className='loginContainer'>
              <p className='logoutText' onClick={handleLogout}>
                logout
              </p>
              <Link to={{ pathname: '/profile' }} className='activeUserLink'>
                😎
              </Link>
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
