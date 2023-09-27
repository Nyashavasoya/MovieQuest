import "./Missing.css";
import { Link } from "react-router-dom";


const Missing = ({fetchError}) => {
  return (
    <>
    <h1>{`${fetchError}`}</h1>
    <Link to="/"><h1>Visit Our HomePage</h1></Link>
    </>
  );
};

Missing.defaultProps = {
  fetchError: "No such Page exist"
};

export default Missing;
