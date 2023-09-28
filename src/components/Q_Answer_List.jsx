import Q_Answer_Box from './Q_Answer_Box';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const Q_Answer_List = ({ answers }) => {
  const token = useContext(AuthContext);
  const loggedInUser = useContext(AuthContext);

  if (Array.isArray(answers)) {
    return (
      <>
        <div className='answers-container'>
          <p className='answers-text'>Answers:</p>
          {/* {console.log(answers)} */}
          {answers.length !== 0 ? (
            answers.map((answer, index) => (
              <Q_Answer_Box
                key={index}
                answer={answer}
                token={token}
                loggedInUser={loggedInUser}
              />
            ))
          ) : (
            <>
              <div className='no-answers-container'>
                <div className='no-answer-container'>
                  <div className='no-answers-texts'>
                    <p className='no-answers-text'>No Answers Yet</p>
                    <p className='no-answers-text'>Be the first to answer!</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default Q_Answer_List;
