import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

const Q_Create = ({ token }) => {
    
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    // const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const handleCreateClick = () => {
        if (token) {
            setShowForm(!showForm);
        } else {
            alert('You must be logged in to create a question.');
        }
    };
    
    const handleSubmitClick = async (e) => {
    e.preventDefault();

    const questionData = {
        title,
        body,
        
    };

    try {
        const response = await axios.post('https://qb.fly.dev/questions', questionData, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Token ${token}`, 
          }
        });
        

      // Hide the form and reset fields
      setShowForm(false);
      setTitle("");
      setBody("");

    } catch (error) {
      console.error('There was an error creating the question:', error);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create Question
      </Button>

      {showForm && (
        <form onSubmit={handleSubmitClick}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Q_Create;