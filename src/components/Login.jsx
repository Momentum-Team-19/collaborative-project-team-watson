import axios from 'axios';
import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setIsLoggedIn }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = 'https://qb.fly.dev/auth/token/login/';

    axios
      .post(loginUrl, form)
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
            value={form.username}
            onChange={handleChange}
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
            value={form.password}
            onChange={handleChange}
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
