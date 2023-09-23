import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Q_Answer_Box = ({ answer }) => {
  return (
    <Card
      className="a-box"
      style={{
        width: "80%",
        margin: "auto",
        borderRadius: "12px",
        backgroundColor: "#f2f2f2",  
        marginBottom: "16px",
      }}
    >
      <CardContent>
        <Typography
          style={{ fontSize: "14px", fontStyle: "italic" }}
          gutterBottom
        >
          Author: {answer.author || 'Anonymous'}
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
      </CardContent>
    </Card>
  );
};

export default Q_Answer_Box;
