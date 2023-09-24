import React, { useState } from "react";
import axios from "axios";

const Q_Answer_Accepted = ({ token, answer }) => {
    const [answerAccepted, setAnswerAccepted] = useState(answer.accepted);  

    const handleAnswerAccepted = async (e) => {
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

            console.log("Q_Answer_Accepted handleAcceptedClick response:", response);
            
            // After successful update, set the new state
            setAnswerAccepted(updatedAcceptedState);
            
        } catch (error) {
            console.error("There was an error toggling the accepted status of the answer", error);
        }
    };
    
    return (
        <button onClick={handleAnswerAccepted}>
            {answerAccepted ? "Unaccept Answer" : "Accept Answer"}
        </button>
    );
};

export default Q_Answer_Accepted;
