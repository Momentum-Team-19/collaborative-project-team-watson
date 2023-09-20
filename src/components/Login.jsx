import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setToken, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = 'https://qb.fly.dev/auth/token/login/';

    axios
      .post(loginUrl, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.auth_token);
          setIsLoggedIn(true);
          navigate(location.state?.from || '/');
        }
      })
      .catch((err) => {
        console.log(err.response.data.non_field_errors[0]);
        setError(err.response.data.non_field_errors[0]);
      });
  };

  return (
    <div className='login-form-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='username-input'>
          <label htmlFor='username' className='username-label'>
            Username:{' '}
          </label>
          <input
            className='username-input-box'
            type='text'
            name='username'
            id='username'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onFocus={() => setError(null)}
          />
        </div>
        <div className='password-input'>
          <label htmlFor='password' className='password-label'>
            Password:{' '}
          </label>
          <input
            className='password-input-box'
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => setError(null)}
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='login-button-container'>
          <input type='submit' value='Log In' className='login-button' />
        </div>
      </form>
    </div>
  );
};

export default Login;
