import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User_Edit = ({ isLoggedIn, token }) => {
  const [id, setId] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn) {
        const userUrl = `https://qb.fly.dev/auth/users/me/`;
        try {
          const response = await axios.get(userUrl, {
            headers: {
              Accept: 'application/json',
              Authorization: `Token ${token}`,
            },
          });
          setId(response.data.id);
          setForm({
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
        } catch (error) {
          console.error('There was an error fetching data', error);
        }
      } else {
        setForm(null);
      }
    };

    fetchUserInfo();
  }, [token, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editUserUrl = `https://qb.fly.dev/auth/users/${id}/`;
    console.log('form, ', form);
    axios
      .patch(editUserUrl, form, {
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/profile');
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          // setError(err.response.data);
        } else if (err.request) {
          console.log(err.request);
          setError('Network error');
        } else {
          console.log(err.message);
          // setError(err.message);
        }
      });
  };

  return (
    <>
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
              required
              value={form.username}
              onChange={handleChange}
              onFocus={() => setError(null)}
            />
          </div>
          <div className='first-name-input'>
            <label htmlFor='first-name' className='first-name-label'>
              First Name:{' '}
            </label>
            <input
              className='edit-input-box'
              type='text'
              name='first_name'
              value={form.first_name}
              onChange={handleChange}
              onFocus={() => setError(null)}
            />
          </div>
          <div className='last-name-input'>
            <label htmlFor='last-name' className='last-name-label'>
              Last Name:{' '}
            </label>
            <input
              className='edit-input-box'
              type='text'
              name='last_name'
              value={form.last_name}
              onChange={handleChange}
              onFocus={() => setError(null)}
            />
          </div>
          <div className='email-input'>
            <label htmlFor='email' className='email-label'>
              Email:{' '}
            </label>
            <input
              className='email-input-box'
              type='text'
              name='email'
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className='edit-input'>
            <label htmlFor='phone' className='phone-label'>
              Phone:{' '}
            </label>
            <input
              className='edit-input-box'
              type='text'
              name='phone'
              placeholder=''
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setError(null)}
            />
          </div>
          {error && <div className='error-message'>{error}</div>}
          <div className='login-button-container'>
            <input type='submit' value='Update' className='login-button' />
          </div>
        </form>
      </div>
    </>
  );
};

export default User_Edit;
