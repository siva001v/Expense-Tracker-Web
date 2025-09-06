import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo_Purple.png";
import "./Home.scss";
import Button from "../../components/Button/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header-title">
          <img src={Logo} alt="logo" className="home__header-logo" />
          <h1>Expense Tracker</h1>
        </div>
        <div className="home__header-btn">
          <Button
            type="button"
            mode="secondary"
            handleClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
          <Button type="button" handleClick={() => navigate("/register")}>
            REGISTER
          </Button>
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
        <div className="home__content-btn">
          <Button type="button" handleClick={() => navigate("/register")}>
            Get Started
          </Button>
        </div>
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
