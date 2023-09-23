import Q_Answer_Box from "./Q_Answer_Box";

const Q_Answer_List = ({ answers }) => {
  if (Array.isArray(answers)) {
    return (
      <>
        <p>Test Q_Answer_List</p>
        {answers &&
          answers.map((answer, index) => (
            <Q_Answer_Box key={index} answer={answer} />
          ))}
      </>
    );
  }
};

export default Q_Answer_List;
