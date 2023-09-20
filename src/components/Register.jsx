import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerUrl = 'https://qb.fly.dev/auth/users/';

    const loginUrl = 'https://qb.fly.dev/auth/token/login/';

    if (password === confirmPassword) {
      axios
        .post(registerUrl, {
          username: username,
          password: password,
          email: email,
        })
        .then(() => {
          return axios.post(loginUrl, {
            username: username,
            password: password,
          });
        })
        .then((res) => {
          if (res.status === 200) {
            setToken(res.data.auth_token);
            setIsLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err.response.data.non_field_errors[0]);
          setError(err.response.data.non_field_errors[0]);
        });
    } else {
      setError('Passwords must match');
    }
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
          />
        </div>
        <div className='email-input'>
          <label htmlFor='email' className='email-label'>
            Email:{' '}
          </label>
          <input
            className='email-input-box'
            type='email'
            name='email'
            id='email'
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
        <div className='confirm-password-input'>
          <label htmlFor='confirmPassword' className='confirm-password-label'>
            Confirm:{' '}
          </label>
          <input
            className='password-input-box'
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onFocus={() => setError(null)}
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='login-button-container'>
          <input type='submit' value='Register' className='login-button' />
        </div>
      </form>
    </div>
  );
};

export default Register;
