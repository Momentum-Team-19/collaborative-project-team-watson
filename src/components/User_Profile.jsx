import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Q_Box from 'components/Q_Box';
import Q_Answer_Box from 'components/Q_Answer_Box';

const User_Profile = ({ token, isLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [questionInfo, setQuestionInfo] = useState([]);
  const [answersInfo, setAnswersInfo] = useState([]);

  const isQuestions = questionInfo.length > 0;
  const isAnswers = answersInfo.length > 0;

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
            const answerInfoUrl = 'https://qb.fly.dev/answers/me';
            const answerInfoResponse = await axios.get(answerInfoUrl, {
              headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
              },
            });
            setAnswersInfo(answerInfoResponse.data);
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
            <div className='profileInfoBox'>
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
          {isQuestions ? (
            <div className='userQuestionsContainer'>
              <p className='recentActivityText'>Questions</p>
              <div className='qBoxes'>
                {questionInfo &&
                  questionInfo.map((question) => (
                    <Link to={`/questions/${question.id}`} key={question.id}>
                      <Q_Box question={question} />
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
          {isAnswers ? (
            <div className='userQuestionsContainer'>
              <p className='recentActivityText'>Answers</p>
              <div className='qBoxes'>
                {answersInfo &&
                  answersInfo.map((answer, index) => (
                    <Link to={`/questions/${answer.question}`} key={index}>
                      <Q_Answer_Box answer={answer} />
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
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
