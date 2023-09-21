import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, Container, Button } from '@mui/material';
import axios from 'axios';
import Q_Delete from './Q_Delete';

const Q_Detail = ({ selectedQuestion, token, setSelectedQuestion }) => {
  if (!selectedQuestion) {
    return <p>No question selected</p>;
  }

  const handleBackClick = () => {
    setSelectedQuestion(null);
  };

  return (
    <>
      <Box textAlign="left">
        <Typography variant="h4">{selectedQuestion.title}</Typography>
        <Typography variant="h5">Author: {selectedQuestion.author || 'N/A'}</Typography>
        <Stack direction="row" spacing={2}>
          {/* <Typography variant="body2">Date Created: {selectedQuestion.date}</Typography> */}
          {/* <Typography variant="body2">Project: {selectedQuestion.project.name || 'N/A'}</Typography> */}
          {/* <Typography variant="body2">Tags: {selectedQuestion.tags.join(', ')}</Typography>
          <Typography variant="body2">Votes: {selectedQuestion.votes}</Typography> */}
        </Stack>
      </Box>
      <Container maxWidth={false} style={{ width: '100%', backgroundColor: 'lightgrey' }}>
        <Box textAlign="left">
          <Typography variant="body2">Body: {selectedQuestion.body}</Typography>
        </Box>
      </Container>
      {/* <Typography variant="body1">{selectedQuestion.answers[0]}</Typography> */}
      <Typography variant="body2">Write an Answer</Typography>
      {/* Back button */}
      <Button 
        variant="contained" 
        style={{ backgroundColor: 'lightblue' }} 
        onClick={handleBackClick}>
        Back
      </Button>
      <Q_Delete token={token} selectedQuestionID={selectedQuestion.id} author={selectedQuestion.author}/>
    </>
  );
};

export default Q_Detail;
