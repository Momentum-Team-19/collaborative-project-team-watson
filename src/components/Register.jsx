import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken, setIsLoggedIn }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
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

    const registerUrl = 'https://qb.fly.dev/auth/users/';

    const loginUrl = 'https://qb.fly.dev/auth/token/login/';

    if (form.password === confirmPassword) {
      console.log('passwords match');
      axios
        .post(registerUrl, form)
        .then(() => {
          return axios.post(loginUrl, {
            username: form.username,
            password: form.password,
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
          if (err.response) {
            console.log(err.response.data);
            setError(err.response.data);
          } else if (err.request) {
            console.log(err.request);
            setError('Network error');
          } else {
            console.log(err.message);
            setError(err.message);
          }
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
            value={form.username}
            onChange={handleChange}
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
            value={form.email}
            onChange={handleChange}
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
