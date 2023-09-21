import { Box, Button } from "@mui/material";
import React, {useState} from "react";

const Q_Edit = ({token, questionID, author}) => {
    
    const handleEditClick = async (e) => {
        if (token) {
            // go to edit page
            setShowForm(!showForm);
        } else {
            // go to login page
            alert('You must be logged in to edit a question.');
        }
    }   
    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const questionData = {
            title,
            body,
        };

        try {
            const response = await axios.patch(`https://qb.fly.dev/questions/${questionID}` {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            })

        } catch (error) {
            console.error('There was an error editing the question:', error);
        }
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit Question
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