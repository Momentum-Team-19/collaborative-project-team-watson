import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
  const location = useLocation();

  const handleHome = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <>
      <header>
        <div className='pagenameContainer'>
          <p className='pagenameText' onClick={handleHome}>
            Q!
          </p>
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
            <Link
              to={{ pathname: '/login', state: { from: location.pathname } }}
              className='signInText'
            >
              sign in
            </Link>
            <p className='signUpText'>sign up</p>
          </div>
        )}
      </header>
    </>
  );
};
export default NavBar;
