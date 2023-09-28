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
    <div className='question-input-container'>
      <Button
        variant='contained'
        color='success'
        onClick={handleAnswerClick}
        style={{ width: '200px', marginBottom: '20px' }}
      >
        Answer Question
      </Button>

      {showForm && (
        <form onSubmit={handleSubmitClick} className='answer-form'>
          {/* <TextField
            label='Answer'
            variant='outlined'
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
          <textarea
            className='answer-input-box'
            placeholder="example: I've seen this problem before and I have a possible solution."
            type='text'
            name='body'
            id='body'
            required
            onChange={(e) => setText(e.target.value)}
          />
          <Button type='submit' variant='contained' color='success'>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default Q_Answer;
