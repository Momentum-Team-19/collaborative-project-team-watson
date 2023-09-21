import React, { useState, useEffect } from "react";
import Q_Box from "components/Q_Box";
import Q_Create from "./Q_Create";

const Q_Feed = ({ token, searchResults, setSelectedQuestion }) => {

  const handleQuestionClick = (question) => {
    console.log(`Question clicked: ${question.title}`);
    setSelectedQuestion(question);
  }

  if (Array.isArray(searchResults)) {
    
    return (
      <>
        <>
          <p>Test Q_Feed</p>
          {searchResults &&
            searchResults.map((question, index) => (
              <Q_Box
                key={index}
                question={question}
                onClick={() => handleQuestionClick(question)}
              />
            ))}
          <Q_Create token={token}/>
        </>
      </>
    );
  }
};
export default Q_Feed;
