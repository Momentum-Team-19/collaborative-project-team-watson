import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Q_Box from 'components/Q_Box';
import Q_Detail from './Q_Detail';

const Q_Feed = () => {

  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null); 
  
  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await axios.get(`https://qb.fly.dev/questions`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Token aaf3a704943ad0a3ef572e69cd618c3c5cedb757',
          }
        });

        // Set the response data to state
        setData(response.data);
        
      } catch (error) {
        // Handle the error
        console.error('There was an error fetching data', error);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  const handleQuestionClick = (question) => {
    // console.log(`Question clicked: ${question}`);
    setSelectedQuestion(question);
  };

  const handleBackClick = () => {
    setSelectedQuestion(null);
  };

  return (
    <>
      {selectedQuestion ? (
        <Q_Detail question={selectedQuestion} onBackClick={handleBackClick} />
      ) : (
        <>
          <p>Test Q_Feed</p>
          {data && data.map((question, index) => (
            <Q_Box key={index} question={question} onClick={() => handleQuestionClick(question)} />
          ))}
        </>
      )}
    </>
  );
};
export default Q_Feed;
