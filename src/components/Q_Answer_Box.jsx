import React, { useEffect, useState } from 'react';  // Added useState
import axios from 'axios';  // Assuming you're using axios
import { Card, CardContent, Typography } from '@mui/material';

const Q_Answer_Box = ({ answer, token }) => {  // Assuming token is passed as prop
  // const [answerAccepted, setAnswerAccepted] = useState(null);
  // console.log('answer', answer);
  // console.log('answerAccepted', answerAccepted);
  // console.log('answer.id', answer.id);

  // useEffect(() => {
  //   const fetchAnswerAccepted = async () => {
  //     try {
  //       const response = await axios.get(`https://qb.fly.dev/answers/${answer.id}`, {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Token ${token}`,
  //         },
  //       });
  //       setAnswerAccepted(response.data);
  //     } catch (error) {
  //       console.error("There was an error fetching whether answer is accepted", error);
  //     }
  //   }

  //   fetchAnswerAccepted();  
  // }, [answer.id, token]); 

  
  return (
    <Card
      className='a-box'
      style={{
        width: '80%',
        margin: 'auto',
        borderRadius: '12px',
        backgroundColor: answer.accepted ? '#a7e7c3' : '#f2f2f2',
        marginBottom: '16px',
      }}
    >
      <CardContent>
        <Typography
          style={{ fontSize: '14px', fontStyle: 'italic' }}
          gutterBottom
        >
          Author: {answer.author || 'Anonymous'}
        </Typography>

        <Typography
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '14px',
            marginBottom: '8px',
          }}
        >
          Answer: {answer.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Q_Answer_Box;
