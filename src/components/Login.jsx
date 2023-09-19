import axios from 'axios';
import { useState } from 'react';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = 'https://qb.fly.dev/auth/token/login/';

    axios
      .post(loginUrl, {
        username: username,
        password: password,
      })
      .then((res) => setToken(res.data.auth_token));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='username-input'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className='password-input'>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input type='submit' value='Log In' />
        </div>
      </form>
    </div>
  );
};

export default Login;
