import { Typography, Box, Stack, Container, Button } from "@mui/material";
import Q_Delete from "./Q_Delete";
import Q_Edit from "./Q_Edit";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Q_Answer from "./Q_Answer";
import Q_Answer_List from "./Q_Answer_List";

const Q_Detail = ({ token }) => {
  const { questionID } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  

  useEffect(() => {
    // Fetching the logged-in user's data
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`https://qb.fly.dev/auth/users/me/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setLoggedInUser(response.data);
        
      } catch (error) {
        console.error("There was an error fetching logged-in user data", error);
      }
    };

    fetchLoggedInUser();
  }, [token]);

  useEffect(() => {
    // Define an async function
    const fetchQuestionData = async () => {
      try {
        // Make the API call
        const response = await axios.get(
          `https://qb.fly.dev/questions/${questionID}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        
        // Set the response data to state
        setQuestionData(response.data);
      } catch (error) {
        // Handle the error
        console.error("There was an error fetching data", error);
      }
    };

    fetchQuestionData();
  }, [token, questionID]);

  if (!questionData) {
    return (
      <>
        <p>Not a valid question ID</p>;
        <Link to="/">
          <Button variant="contained" color="primary">
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

      <Q_Answer_List token={token} answers={questionData.answers} loggedInUser={loggedInUser}/>

      <Stack spacing={2} direction={"row"}>
        <Q_Answer token={token} questionID={questionID} />

        {/* Conditionally render Q_Edit and Q_Delete if user is author */}
        {loggedInUser && loggedInUser.username === questionData.author && (
          <>
            <Q_Edit token={token} questionID={questionID} />
            <Q_Delete token={token} questionID={questionID} />
          </>
          )}
      </Stack>
      
      <Link to="/">
        <Button variant="contained" color="primary" sx={{ my: 1 }}>
          Back
        </Button>
      </Link>
    </>
  );
};

export default Q_Detail;
