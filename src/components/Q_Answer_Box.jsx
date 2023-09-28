import React, { useEffect, useState, useContext } from 'react'; // Added useState
import { Card, CardContent, Typography } from '@mui/material';
import Q_Answer_Accepted from './Q_Answer_Accepted';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

const Q_Answer_Box = ({ answer }) => {
  const token = useContext(AuthContext);
  const loggedInUser = useContext(AuthContext);
  const [currentAnswer, setCurrentAnswer] = useState(answer);

  const handleAnswerAccepted = (updatedAcceptedState) => {
    setCurrentAnswer({
      ...currentAnswer,
      accepted: updatedAcceptedState,
    });
  };

  console.log('answer ', answer);

  return (
    <div
      className='answer-container'
      style={{
        width: '95%',
        margin: 'auto',
        borderRadius: '12px',
        backgroundColor: currentAnswer.accepted
          ? 'var(--clr-accepted)'
          : 'var(--clr-nav)',
        marginBottom: '16px',
        position: 'relative',
      }}
    >
      {currentAnswer.accepted && (
        <div
          // style={{
          //   position: 'absolute',
          //   top: '10px',
          //   right: '10px',
          //   padding: '5px',
          //   backgroundColor: 'green',
          //   color: 'white',
          //   borderRadius: '5px',
          // }}
          className='accepted-label'
        >
          Accepted
        </div>
      )}
      <div className='author-box'>
        <Typography
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--clr-dark)',
            marginBottom: '20px',
          }}
          gutterBottom
        >
          Author:{' '}
          {answer.author ? (
            <Link to={`/profile/${answer.author.username}`}>
              {answer.author.username}
            </Link>
          ) : (
            'Anonymous'
          )}
        </Typography>
        <p className='response-text'>Response:</p>
        <div className='answer-box'>
          <Typography
            style={{
              fontSize: '14px',
              marginBottom: '8px',
              color: 'var(--clr-dark)',
            }}
          >
            {answer.text}
          </Typography>
        </div>

        <Q_Answer_Accepted
          answer={currentAnswer}
          token={token}
          onToggleAccepted={handleAnswerAccepted}
          loggedInUser={loggedInUser}
        />
      </div>
    </div>
  );
};

export default Q_Answer_Box;
