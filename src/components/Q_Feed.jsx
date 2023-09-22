import Q_Box from "components/Q_Box";
import Q_Create from "./Q_Create";
import { Link } from "react-router-dom";

const Q_Feed = ({ token, searchResults }) => {
  if (Array.isArray(searchResults)) {
    return (
      <>
        <p>Test Q_Feed</p>
        {searchResults &&
          searchResults.map((question, index) => (
            <Link to={`/questions/${question.id}`} key={question.id}>
              <Q_Box question={question} />
            </Link>
          ))}
        <Q_Create token={token} />
      </>
    );
  }
};
export default Q_Feed;
