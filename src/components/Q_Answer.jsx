import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Q_Answer = ({ questionID }) => {
  const { token } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleAnswerClick = async (e) => {
    if (token) {
      setShowForm(!showForm);
    } else {
      navigate('/login');
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    const answerData = {
      text,
      accepted: false,
    };

    try {
      const response = await axios.post(
        `https://qb.fly.dev/questions/${questionID}/answers`,
        answerData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      // Hide the form and reset fields
      setShowForm(false);
      setText('');
    } catch (error) {
      console.error('There was an error answering the question:', error);
    }
  };

  return (
    <Box>
      <Button variant='contained' color='success' onClick={handleAnswerClick}>
        Answer Question
      </Button>

      {showForm && (
        <form onSubmit={handleSubmitClick}>
          <TextField
            label='Answer'
            variant='outlined'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type='submit' variant='contained' color='success'>
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Q_Answer;
