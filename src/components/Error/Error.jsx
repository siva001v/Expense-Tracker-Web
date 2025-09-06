import { useNavigate } from "react-router-dom";
import "./Error.scss";

function Error({ errorMessage }) {
  const navigate = useNavigate();
  return (
    <div className="error">
      <div className="error__main">
        <p>Error fetching the data.....</p>
        <p className="error__main-content">
          <span>Error: </span>
          {errorMessage}
        </p>
        <p className="error__main-content-footer">
          Try reloading the page or Go to{" "}
          <span onClick={() => navigate("/login")}>
            <b>Login</b>
          </span>
          ..
        </p>
      </div>
    </div>
  );
}

export default Error;
