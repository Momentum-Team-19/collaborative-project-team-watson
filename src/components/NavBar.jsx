import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn }) => {
  const location = useLocation();

  const handleHome = () => {
    window.location.reload();
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
            <p className='signInText'>logout</p>
            <p className='signUpText'>user</p>
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
