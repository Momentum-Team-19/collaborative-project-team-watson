import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const Q_Answer_Accepted = ({ answer, onToggleAccepted }) => {
  const token = useContext(AuthContext);
  const loggedInUser = useContext(AuthContext);
  const [questionData, setQuestionData] = useState(null);
  
  const handleAnswerAccepted = async (e) => {
    const updatedAcceptedState = !answer.accepted; // Toggle the current state

    try {
      const response = await axios.patch(
        `https://qb.fly.dev/answers/${answer.id}/accept`,
        { accepted: updatedAcceptedState }, // Update with the new state
        {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token.token}`,
          },
        }
      );
      onToggleAccepted(updatedAcceptedState);
    } catch (error) {
      console.error(
        "There was an error toggling the accepted status of the answer",
        error
      );
    }
  };

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `https://qb.fly.dev/questions/${answer.question}`,
          {
            headers: {
              Accept: "application/json",
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
  }, [token, answer.question]);

  if (!questionData) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <div>
      {loggedInUser &&
        loggedInUser.loggedInUser.username === questionData.author.username && (
          <button onClick={handleAnswerAccepted}>
            {answer.accepted ? "Unaccept Answer" : "Accept Answer"}
          </button>
        )}
    </div>
  );
};

export default Q_Answer_Accepted;
