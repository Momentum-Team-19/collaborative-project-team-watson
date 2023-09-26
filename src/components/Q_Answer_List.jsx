import Q_Answer_Box from './Q_Answer_Box';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const Q_Answer_List = ({ answers, loggedInUser }) => {
  const token = useContext(AuthContext);

  if (Array.isArray(answers)) {
    return (
      <>
        <p style={{ color: 'var(--clr-dark)' }}>Test Q_Answer_List</p>
        {answers &&
          answers.map((answer, index) => (
            <Q_Answer_Box
              key={index}
              answer={answer}
              token={token}
              loggedInUser={loggedInUser}
            />
          ))}
      </>
    );
  }
};

export default Q_Answer_List;
