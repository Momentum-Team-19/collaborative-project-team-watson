import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, Container } from '@mui/material';

const Q_Detail = () => {
  const [questionID, setQuestionID] = useState(0); // [1]

  const [question, setQuestion] = useState({
    answers: [],
    author: {},
    tags: [],
    project: {},
    votes: 0,
    date: ''
  });

  
    

  useEffect(() => {
    // Simulate fetching data from an API or database
    setQuestion({
      title: 'How to use useEffect in React?',
      text: 'I am new to React and want to understand how to use useEffect. Any help would be appreciated.',
      answers: ['Use it for side-effects', 'You can use it as componentDidMount'],
      author: { name: 'John Doe' },
      tags: ['React', 'useEffect', 'Hooks'],
      project: { name: 'React Questions' },
      votes: 42,
      date: '2022-01-01'
    });
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  return (
    <>
      <Typography variant="h1">Question Detail</Typography>
      <Box textAlign="left">
        <Typography variant="h4">{question.title}</Typography>
        <Typography variant="h5">Author: {question.author.name || 'N/A'}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2">Date Created: {question.date}</Typography>
          <Typography variant="body2">Project: {question.project.name || 'N/A'}</Typography>
          <Typography variant="body2">Tags: {question.tags.join(', ')}</Typography>
          <Typography variant="body2">Votes: {question.votes}</Typography>
        </Stack>
      </Box>
      <Container maxWidth={false} style={{ width: '100%', backgroundColor: 'lightgrey' }}>
        <Box textAlign="left">
          <Typography variant="body2">Question Text</Typography>
        </Box>
      </Container>
      <Typography variant="body1">Answers</Typography>
      <Typography variant="body2">Write an Answer</Typography>
    </>
  );
};

export default Q_Detail;
