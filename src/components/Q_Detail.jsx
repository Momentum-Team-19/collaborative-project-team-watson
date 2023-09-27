import { Typography, Box, Stack, Container, Button } from '@mui/material';
import Q_Delete from './Q_Delete';
import Q_Edit from './Q_Edit';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Q_Answer from './Q_Answer';
import Q_Answer_List from './Q_Answer_List';
import AuthContext from './AuthContext';
import Q_Bookmark from './Q_Bookmark';

const Q_Detail = () => {
  const { token } = useContext(AuthContext);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const { questionID } = useParams();
  const [questionData, setQuestionData] = useState(null);

  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  const onToggleBookmarked = (updatedBookmarkedState) => {
    setCurrentQuestion({
      ...currentQuestion,
      bookmarked: updatedBookmarkedState,
    });
  }

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    // Fetching the logged-in user's data
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`https://qb.fly.dev/auth/users/me/`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          setLoggedInUser(null);
          console.log('User is not logged in');
        } else {
          console.error(
            'There was an error fetching logged-in user data',
            error
          );
        }
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
              Accept: 'application/json',
            },
          }
        );

        // Set the response data to state
        setQuestionData(response.data);
      } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
      }
    };

    fetchQuestionData();
  }, [token, questionID]);

  if (!questionData) {
    return (
      <>
        <p style={{ color: 'var(--clr-light)' }}>Not a valid question ID</p>;
        <Button variant='contained' color='primary' onClick={handleBack}>
          Back
        </Button>
      </>
    );
  }

  return (
    <>
      <Box textAlign='left'>
        <Typography variant='h4' style={{ color: 'var(--clr-dark)' }}>
          {questionData.title}
        </Typography>
        <Typography variant='h5' style={{ color: 'var(--clr-dark)' }}>
          Author: {questionData.author.username || 'N/A'}
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        style={{ width: '100%', backgroundColor: 'var(--clr-light)' }}
      >
        <Box textAlign='left'>
          <Typography variant='body2' style={{ color: 'var(--clr-dark)' }}>
            Body: {questionData.body}{' '}
          </Typography>
        </Box>
      </Container>

      <Q_Answer_List
        token={token}
        answers={questionData.answers}
        loggedInUser={loggedInUser}
      />

      <Stack spacing={2} direction={'row'}>
        <Q_Answer token={token} questionID={questionID} />

        {/* Conditionally render Q_Edit and Q_Delete if user is author */}
        {loggedInUser &&
          loggedInUser.username === questionData.author.username && (
            <>
              <Q_Edit token={token} questionID={questionID} />
              <Q_Delete token={token} questionID={questionID} />
            </>
          )}

        <Q_Bookmark questionData={questionData} onToggleBookmarked={onToggleBookmarked}/>
      </Stack>



      <Button variant='contained' color='primary' onClick={handleBack} sx={{ marginTop:'10px'}}>
        Back
      </Button>
    </>
  );
};

export default Q_Detail;
