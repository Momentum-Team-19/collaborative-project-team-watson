import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Q_Box from 'components/Q_Box';

const User_Profile = ({ token, isLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [questionInfo, setQuestionInfo] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      const fetchUserInfo = async () => {
        if (isLoggedIn) {
          try {
            const userInfoUrl = `https://qb.fly.dev/auth/users/me/`;
            const userInfoResponse = await axios.get(userInfoUrl, {
              headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
              },
            });
            setUserInfo(userInfoResponse.data);
            const questionInfoUrl = 'https://qb.fly.dev/questions/me';
            const questionInfoResponse = await axios.get(questionInfoUrl, {
              headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
              },
            });
            setQuestionInfo(questionInfoResponse.data);
          } catch (error) {
            console.error('There was an error fetching data', error);
          }
        } else {
          setUserInfo(null);
        }
      };

      console.log(isLoggedIn);

      fetchUserInfo();
    }
  }, [token, isLoggedIn]);

  if (userInfo) {
    return (
      <>
        <div className='profileContainer'>
          <div className='profileInfoContainer'>
            <h2 className='profileInfo'>Username: {userInfo.username}</h2>
            <h4 className='profileInfo'>
              Name: {userInfo.first_name || 'N/A'} {userInfo.last_name}
            </h4>
            <h5 className='profileInfo'>Phone: {userInfo.phone || 'N/A'}</h5>
            <h5 className='profileInfo'>Email: {userInfo.email || 'N/A'}</h5>
          </div>
          <div className='userImgContainer'>
            <p className='userImg'>😎</p>
          </div>
          <Link to={{ pathname: '/profile/edit' }} className='editButton'>
            EDIT
          </Link>
        </div>
        <div className='userQuestionsContainer'>
          <p className='recentActivityText'>Questions:</p>
          <div className='qBoxes'>
            {questionInfo &&
              questionInfo.map((question) => (
                <Link to={`/questions/${question.id}`} key={question.id}>
                  <Q_Box question={question} />
                </Link>
              ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>User Profile</h2>
        <h4>No User Data Found</h4>
      </>
    );
  }
};

export default User_Profile;
