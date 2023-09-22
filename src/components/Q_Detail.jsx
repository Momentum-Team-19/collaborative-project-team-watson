import { Typography, Box, Stack, Container, Button } from "@mui/material";
import Q_Delete from "./Q_Delete";
import Q_Edit from "./Q_Edit";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Q_Detail = ({ token }) => {
  const { questionID } = useParams();
  console.log("questionID", questionID);
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    // Define an async function
    const fetchQuestionData = async () => {
      try {
        // Make the API call
        const response = await axios.get(`https://qb.fly.dev/questions/${questionID}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        });

        // Set the response data to state
        setQuestionData(response.data);
      } catch (error) {
        // Handle the error
        console.error("There was an error fetching data", error);
      }
    };

    fetchQuestionData();
  }, [token, questionID]);
  
  console.log("questionData", questionData);

  if (!questionData) {
    return <p>Not a valid question ID</p>;
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

      <Link to='/'> 
        <Button
        variant="contained"
        style={{ backgroundColor: "lightblue" }}
        
        >
        Back
        </Button>
      </Link>

      <Q_Delete
        token={token}
        questionDataID={questionData.id}
        author={questionData.author}
      />
      <Q_Edit token={token} questionDataID={questionData.id} />
    </>
  );
};

export default Q_Detail;
