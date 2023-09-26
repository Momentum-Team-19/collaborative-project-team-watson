import React, { useEffect, useState, useContext } from 'react'; // Added useState
import { Card, CardContent, Typography } from '@mui/material';
import Q_Answer_Accepted from './Q_Answer_Accepted';
import AuthContext from './AuthContext';

const Q_Answer_Box = ({ answer, loggedInUser }) => {
  const token = useContext(AuthContext);
  
  const [currentAnswer, setCurrentAnswer] = useState(answer);

  const handleAnswerAccepted = (updatedAcceptedState) => {
    setCurrentAnswer({
      ...currentAnswer,
      accepted: updatedAcceptedState,
    });
  };

  return (
    <Card
      className='a-box'
      style={{
        width: '80%',
        margin: 'auto',
        borderRadius: '12px',
        backgroundColor: currentAnswer.accepted
          ? 'var(--clr-accepted)'
          : 'var(--clr-notaccepted)',
        marginBottom: '16px',
      }}
    >
      <CardContent>
        <Typography
          style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: 'var(--clr-dark)',
          }}
          gutterBottom
        >
          Author: {answer.author.username || 'Anonymous'}
        </Typography>

        <Typography
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '14px',
            marginBottom: '8px',
            color: 'var(--clr-dark)',
          }}
        >
          Answer: {answer.text}
        </Typography>

        <Q_Answer_Accepted
          answer={currentAnswer}
          token={token}
          onToggleAccepted={handleAnswerAccepted}
          loggedInUser={loggedInUser}
        />
      </CardContent>
    </Card>
  );
};

export default Q_Answer_Box;
