import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

const Q_Answer = ({ token, questionID }) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");

  const handleAnswerClick = async (e) => {
    if (token) {
      setShowForm(!showForm);
    } else {
      alert("You must be logged in to answer a question.");
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    console.log("Q_Answer handleSubmitClick questionID:", questionID);

    const answerData = {
      text,
      accepted: true,
    };

    try {
      const response = await axios.post(
        `https://qb.fly.dev/questions/${questionID}/answers`, answerData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Q_Answer handleSubmitClick response:", response);
      // Hide the form and reset fields
      setShowForm(false);
      setText("");
    } catch (error) {
      console.error("There was an error answering the question:", error);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="success" onClick={handleAnswerClick}>
        Answer Question
      </Button>

      {showForm && (
        <form onSubmit={handleSubmitClick}>
          <TextField
            label="Answer"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Q_Answer;
