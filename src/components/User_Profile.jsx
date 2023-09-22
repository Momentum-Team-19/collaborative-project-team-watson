import axios from 'axios';
import { useState, useEffect } from 'react';

const User_Profile = ({ token, isLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `https://qb.fly.dev/auth/users/me/`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
              },
            }
          );
          console.log(userInfo);

          setUserInfo(response.data);
        } catch (error) {
          console.error('There was an error fetching data', error);
        }
      } else {
        setUserInfo(null);
      }
    };

    console.log(isLoggedIn);

    fetchUserInfo();
  }, [token, isLoggedIn]);

  return (
    <>
      <h2>User Profile</h2>
      {userInfo ? <h3>{userInfo.username}</h3> : null}
      {userInfo ? <h4>{userInfo.email}</h4> : null}
    </>
  );
};

export default User_Profile;
