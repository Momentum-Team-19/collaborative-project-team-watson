import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User_Edit = ({ isLoggedIn, token }) => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
          console.log(response.data);

          setId(response.data.id);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
        } catch (error) {
          console.error('There was an error fetching data', error);
        }
      } else {
        setUserInfo(null);
      }
    };

    console.log('isLoggedIn: ', isLoggedIn);

    fetchUserInfo();
  }, [token, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editUserUrl = `https://qb.fly.dev/auth/users/${id}`;

    axios
      .patch(editUserUrl, {
        username: username,
        email: email,
        phone: phone,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        console.log(res);
        navigate('/profile');
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
              id='username'
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className='first-name-input'>
            <label htmlFor='first-name' className='first-name-label'>
              First Name:{' '}
            </label>
            <input
              className='edit-input-box'
              type='first-name'
              name='first-name'
              id='first-name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              onFocus={() => setError(null)}
            />
          </div>
          <div className='last-name-input'>
            <label htmlFor='last-name' className='last-name-label'>
              Last Name:{' '}
            </label>
            <input
              className='edit-input-box'
              type='last-name'
              name='last-name'
              id='last-name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              onFocus={() => setError(null)}
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
          <div className='edit-input'>
            <label htmlFor='phone' className='phone-label'>
              Phone:{' '}
            </label>
            <input
              className='edit-input-box'
              type='phone'
              name='phone'
              id='phone'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
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
    </>
  );
};

export default User_Edit;
