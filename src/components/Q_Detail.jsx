import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, Container, Button } from '@mui/material';
import axios from 'axios';
import Q_Delete from './Q_Delete';

const Q_Detail = ({ question, onBackClick, token, children }) => {
  if (!question) {
    return <p>Loading... why is this happening???</p>;
  }

  return (
    <>
      <Box textAlign="left">
        <Typography variant="h4">{question.title}</Typography>
        <Typography variant="h5">Author: {question.author || 'N/A'}</Typography>
        <Stack direction="row" spacing={2}>
          {/* <Typography variant="body2">Date Created: {question.date}</Typography> */}
          {/* <Typography variant="body2">Project: {question.project.name || 'N/A'}</Typography> */}
          {/* <Typography variant="body2">Tags: {question.tags.join(', ')}</Typography>
          <Typography variant="body2">Votes: {question.votes}</Typography> */}
        </Stack>
      </Box>
      <Container maxWidth={false} style={{ width: '100%', backgroundColor: 'lightgrey' }}>
        <Box textAlign="left">
          <Typography variant="body2">Body: {question.body}</Typography>
        </Box>
      </Container>
      {/* <Typography variant="body1">{question.answers[0]}</Typography> */}
      <Typography variant="body2">Write an Answer</Typography>
      {/* Back button */}
      <Button 
        variant="contained" 
        style={{ backgroundColor: 'lightblue' }} 
        onClick={onBackClick}>
        Back
      </Button>
      <Q_Delete token={token} questionID={question.id} author={question.author}/>
    </>
  );
};

export default Q_Detail;
