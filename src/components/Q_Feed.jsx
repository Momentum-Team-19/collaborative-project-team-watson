import React, { useState, useEffect } from "react";

import Q_Box from "components/Q_Box";
import Q_Detail from "./Q_Detail";
import Q_Create from "./Q_Create";

const Q_Feed = ({ token, children, data }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  

  const handleQuestionClick = (question) => {
    // console.log(`Question clicked: ${question}`);
    setSelectedQuestion(question);
  };

  const handleBackClick = () => {
    setSelectedQuestion(null);
  };

  if (Array.isArray(data)) {
    console.log('data checking', data);
    return (
      <>
        <>
          <p>Test Q_Feed</p>
          {data &&
            data.map((question, index) => (
              <Q_Box
                key={index}
                question={question}
                onClick={() => handleQuestionClick(question)}
              />
            ))}
          <Q_Create token={token} />
        </>
      </>
    );
  }
};
export default Q_Feed;
