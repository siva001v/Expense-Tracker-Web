import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useLogin } from "../hooks/useAuthData";
import Logo from "../assets/images/Logo_Purple.png";
import InputField from "../components/InputField";
import { useUser } from "../context/useUser";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useUser();

  const handleSucces = (data) => {
    setLoader(false);
    let payloadValue = {
      name: data.user.name,
      email: data.user.email,
    };
    localStorage.setItem("user", JSON.stringify(payloadValue));
    dispatch({ type: "SET_USER", payload: payloadValue });
    navigate("/dashboard");
  };

  const handleError = (error) => {
    setLoader(false);
    setError(error.message);
  };

  const mutation = useLogin(handleSucces, handleError);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    if (formData.email != "" && formData.password != "") {
      setLoader(true);
      mutation.mutate(formData);
    } else {
      setError("Please enter valid credentials");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    if (!isFirstSubmit) {
      if (updatedData.email == "" || updatedData.password == "") {
        setError("Please enter valid credentials");
      } else {
        setError("");
      }
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="logo" className="logo" />
        <p className="login__app-name">Expense Tracker</p>
        <h1 className="login__header">Login</h1>
        <form className="login__form" onSubmit={onSubmit}>
          <InputField
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={formData.password}
          />
          <button className="login__btn-submit" type="submit">
            LOGIN
          </button>
        </form>
        <p className="login__error">{error}</p>
        <p className="login__register">
          Don't have an account?{" "}
          <Link className="login__register-link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
