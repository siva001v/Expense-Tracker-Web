import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo_Purple.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header-title">
          <img src={Logo} alt="logo" className="logo" />
          <h1>Expense Tracker</h1>
        </div>
        <div className="home__header-btn">
          <button
            className="home__header-btn-login"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="home__header-btn-register"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
      <div className="home__content">
        <div className="home__content-description">
          <p className="home__content-description-main">
            Track your expenses effortlessly
          </p>
          <p className="home__content-description-sub">
            Stay on top of your spendings and manage your finances smarter.
          </p>
        </div>
        <button
          className="home__content-btn-get-started"
          type="button"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
        <p className="home__content-navigate">
          Already have an account?{" "}
          <Link className="home__content-navigate-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
