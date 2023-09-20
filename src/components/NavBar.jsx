import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
  const location = useLocation();

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
        {isLoggedIn ? (
          <div className='loginContainer'>
            <p className='logoutText' onClick={handleLogout}>
              logout
            </p>
            <p className='activeUserLink'>😎</p>
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
        )}
      </header>
    </>
  );
};
export default NavBar;
