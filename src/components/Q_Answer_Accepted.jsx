import React, { useState, useEffect } from "react";
import axios from "axios";

const Q_Answer_Accepted = ({ token, answer, loggedInUser, onToggleAccepted }) => {
    const [questionData, setQuestionData] = useState(null);
    

    const handleAnswerAccepted = async (e) => {
        
        const updatedAcceptedState = !answer.accepted;  // Toggle the current state
        
        try {
            const response = await axios.patch(
                `https://qb.fly.dev/answers/${answer.id}/accept`,
                { accepted: updatedAcceptedState },  // Update with the new state
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            );
            
            onToggleAccepted(updatedAcceptedState);
            

            
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

            {loggedInUser && loggedInUser.username === questionData.author.username && (
                <button onClick={handleAnswerAccepted}>
                    {answer.accepted ? "Unaccept Answer" : "Accept Answer"}
                </button>
            )}
        </div>
    );
};

export default Q_Answer_Accepted;
