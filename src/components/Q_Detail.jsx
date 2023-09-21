import { Typography, Box, Stack, Container, Button } from "@mui/material";
import Q_Delete from "./Q_Delete";
import Q_Edit from "./Q_Edit";


const Q_Detail = ({ selectedQuestion, token, setSelectedQuestion }) => {
  if (!selectedQuestion) {
    return <p>No question selected</p>;
  }

  const handleBackClick = () => {
    setSelectedQuestion(null);
  };

  return (
    <>
      <Box textAlign="left">
        <Typography variant="h4">{selectedQuestion.title}</Typography>
        <Typography variant="h5">
          Author: {selectedQuestion.author || "N/A"}
        </Typography>
      </Box>

      <Container
        maxWidth={false}
        style={{ width: "100%", backgroundColor: "lightgrey" }}
      >
        <Box textAlign="left">
          <Typography variant="body2">Body: {selectedQuestion.body}</Typography>
        </Box>
      </Container>

      <Typography variant="body2">Write an Answer</Typography>

      <Button
        variant="contained"
        style={{ backgroundColor: "lightblue" }}
        onClick={handleBackClick}
      >
        Back
      </Button>

      <Q_Delete
        token={token}
        selectedQuestionID={selectedQuestion.id}
        author={selectedQuestion.author}
      />
      <Q_Edit token={token} selectedQuestionID={selectedQuestion.id} />
    </>
  );
};

export default Q_Detail;
