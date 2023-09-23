import { Typography, Box, Stack, Container, Button } from "@mui/material";
import Q_Delete from "./Q_Delete";
import Q_Edit from "./Q_Edit";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Q_Answer from "./Q_Answer";
import questions from "./questions";


const Q_Detail = ({ token }) => {
  const { questionID } = useParams();
  const questionData = questions.find(q => q.id === parseInt(questionID));
  // const [questionData, setQuestionData] = useState(null);
  
  // Commented out to avoid API requests with fly.dev.io down
  // useEffect(() => {
  //   // Define an async function
  //   const fetchQuestionData = async () => {
  //     try {
  //       // Make the API call
  //       const response = await axios.get(
  //         `https://qb.fly.dev/questions/${questionID}`,
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Token ${token}`,
  //           },
  //         }
  //       );

  //       // Set the response data to state
  //       setQuestionData(response.data);
  //     } catch (error) {
  //       // Handle the error
  //       console.error("There was an error fetching data", error);
  //     }
  //   };

  //   fetchQuestionData();
  // }, [token, questionID]);

  if (!questionData) {
    return (
      <>
        <p>Not a valid question ID</p>;
        <Link to="/">
          <Button variant="contained" style={{ backgroundColor: "lightblue" }}>
            Back
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Box textAlign="left">
        <Typography variant="h4">{questionData.title}</Typography>
        <Typography variant="h5">
          Author: {questionData.author || "N/A"}
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        style={{ width: "100%", backgroundColor: "lightgrey" }}
      >
        <Box textAlign="left">
          <Typography variant="body2">Body: {questionData.body}</Typography>
        </Box>
      </Container>

      <Typography variant="body2">Write an Answer</Typography>

      <Link to="/">
        <Button variant="contained" style={{ backgroundColor: "lightblue" }}>
          Back
        </Button>
      </Link>

      <Q_Edit token={token} questionID={questionID} />
      <Q_Delete token={token} questionID={questionID} />
      <Q_Answer token={token} questionID={questionID} />
    </>
  );
};

export default Q_Detail;
