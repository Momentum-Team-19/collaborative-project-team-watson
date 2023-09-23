import { Link, useLocation } from 'react-router-dom';
import SearchBar from 'components/SearchBar';

const NavBar = ({ isLoggedIn, children }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header>
        <div className='linkContainer'>
          <Link to={{ pathname: '/' }} className='homepageLink'>
            Q!
          </Link>
        </div>
        <div className='searchContainer'>{children}</div>
        {pathname !== '/login' && pathname !== '/register' ? (
          isLoggedIn ? (
            <div className='loginContainer'>
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
