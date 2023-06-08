import { useRouteError, Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <Card bg={"danger"} style={{ width: "30rem" }} text={"white"} className="mb-2 justify-content-center align-items-center">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body className="">
          <Card.Title>Error</Card.Title>
          <Card.Text>
            <p>{error.message || error.statusText}</p>
          </Card.Text>
          <div className="justify-content-center">
            <button className="btn btn-dark mx-4" onClick={() => navigate(-1)}>
              <span>Go Back</span>
            </button>
            <Link to="/" className="btn btn-dark mx-4">
              <span>Go home</span>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ErrorElement;
