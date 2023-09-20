const NavBar = ({ isLoggedIn }) => {
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
            <p className='signUpText'>User</p>
          </div>
        ) : (
          <div className='loginContainer'>
            <p className='signInText'>sign in</p>
            <p className='signUpText'>sign up</p>
          </div>
        )}
      </header>
    </>
  );
};
export default NavBar;
