import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Q_Box = ({ question, onClick }) => {

  let topAnswer = ''
  if (question.answers) {
    if (question.answers.length > 0) {
      topAnswer = question.answers[0].text
    }
  }

  let answerContent;
  if (topAnswer) {
    answerContent = (
      <Typography style={{ marginTop: "8px" }}>
        Top Answer: {question.answers[0].text}
      </Typography>
    );
  } else {
    answerContent = (
      <Typography style={{ marginTop: "8px", fontStyle: "italic" }}>
        No answers yet.
      </Typography>
    );
  }

  return (
    <Card className="q-box" onClick={onClick}
      style={{
        width: "80%",
        margin: "auto",
        borderRadius: "12px",
        backgroundColor: "#e6f7ff",
        marginBottom: "16px",
      }}
    >
      <CardContent>
        <Typography
          style={{ fontSize: "16px", fontWeight: "bold" }}
          gutterBottom
        >
          Title: {question.title || 'Default Title'}
        </Typography>

        <Typography
          style={{ fontSize: "14px", fontStyle: "italic" }}
          gutterBottom
        >
          Author: {question.author || 'Default Title'}
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
          Body: {question.body}
        </Typography>
        {/* style={{ fontSize: "12px", color: "#666" }} */}
        {/* <Typography >
          Author: {question.author || 'Default Author'} | Answers: {question.answers || 'Default Answers'}
        </Typography> */}
        {answerContent}
        
      </CardContent>
    </Card>
  );
};

export default Q_Box;
