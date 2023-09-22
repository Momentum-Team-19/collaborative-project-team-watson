import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

const Q_Delete = ({ token, questionID }) => {
  console.log("Q_Delete questionID:", questionID);
  const handleDeleteClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `https://qb.fly.dev/questions/${questionID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("There was an error deleting the question:", error);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="error" onClick={handleDeleteClick}>
        Delete Question
      </Button>
    </Box>
  );
  
};

export default Q_Delete;
