import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import AuthContext from "./AuthContext";

const Q_Delete = ({ questionID }) => {
  const { token } = useContext(AuthContext);
  
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
