import React, { useState, useEffect } from "react";
import axios from "axios";

const Q_Answer_Accepted = ({ token, answer, loggedInUser }) => {
    const [answerAccepted, setAnswerAccepted] = useState(answer.accepted);
    const [questionData, setQuestionData] = useState(null);

    console.log("Q_Answer_Accepted before", answer.id, answerAccepted);

    const handleAnswerAccepted = async (e) => {
        console.log("handleAnswerAccepted");
        const updatedAcceptedState = !answerAccepted;  // Toggle the current state

        try {
            const response = await axios.put(
                `https://qb.fly.dev/answers/${answer.id}/accept`,
                { accepted: updatedAcceptedState },  // Update with the new state
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            );
            

            // After successful update, set the new state
            console.log("Q_Answer_Accepted after", answer.id, updatedAcceptedState);
            setAnswerAccepted(updatedAcceptedState);
            
        } catch (error) {
            console.error("There was an error toggling the accepted status of the answer", error);
        }
    };

    useEffect(() => {
        // Define an async function
        const fetchQuestionData = async () => {
          try {
            // Make the API call
            const response = await axios.get(
              `https://qb.fly.dev/questions/${answer.question}`,
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

            {loggedInUser && loggedInUser.username === questionData.author && (
                <button onClick={handleAnswerAccepted}>
                    {answerAccepted ? "Unaccept Answer" : "Accept Answer"}
                </button>
            )}
        </div>
    );
};

export default Q_Answer_Accepted;
