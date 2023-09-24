import React, { useEffect, useState } from "react"; // Added useState
import axios from "axios"; // Assuming you're using axios
import { Card, CardContent, Typography } from "@mui/material";
import Q_Answer_Accepted from "./Q_Answer_Accepted";

const Q_Answer_Box = ({ answer, token, loggedInUser }) => {
  // Assuming token is passed as prop
  const [currentAnswer, setCurrentAnswer] = useState(answer);

  const handleAnswerAccepted = (updatedAnswer) => {
    setCurrentAnswer(updatedAnswer);
  };

  return (
    <Card
      className="a-box"
      style={{
        width: "80%",
        margin: "auto",
        borderRadius: "12px",
        backgroundColor: answer.accepted ? "#a7e7c3" : "#f2f2f2",
        marginBottom: "16px",
      }}
    >
      <CardContent>
        <Typography
          style={{ fontSize: "14px", fontStyle: "italic" }}
          gutterBottom
        >
          Author: {answer.author || "Anonymous"}
        </Typography>

        <Typography
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          Answer: {answer.text}
        </Typography>

        <Q_Answer_Accepted
          answer={currentAnswer}
          token={token}
          onToggleAccepted={handleAnswerAccepted}
          loggedInUser={loggedInUser}
        />
      </CardContent>
    </Card>
  );
};

export default Q_Answer_Box;
