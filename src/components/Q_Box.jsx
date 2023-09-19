import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Q_Box = ({ question, onClick }) => {
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
          {question.title}
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
          {question.description}
        </Typography>
        <Typography style={{ fontSize: "12px", color: "#666" }}>
          Author: {question.author} | Answers: {question.answers}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Q_Box;
