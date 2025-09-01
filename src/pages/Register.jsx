import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useRegister } from "../hooks/useAuthData";
import Logo from "../assets/images/Logo_Purple.png";
import InputField from "../components/InputField";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [firstSubmission, setFirstSubmission] = useState(true);

  const navigate = useNavigate();

  const handleSucces = () => {
    setLoader(false);
    navigate("/login");
  };

  const handleError = (error) => {
    setLoader(false);
    setErrorMessage(error.message);
  };

  const mutation = useRegister(handleSucces, handleError);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (!firstSubmission) {
      setErrorMessage(validate(updatedFormData));
    }

    setFormData(updatedFormData);
  };

  const validate = (updatedFormData) => {
    let EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!updatedFormData.name) {
      return "Name must not be empty";
    }
    if (!updatedFormData.email || !EMAIL_REGEX.test(updatedFormData.email)) {
      return "Email should be valid";
    }
    if (!updatedFormData.password) {
      return "Password must not be empty";
    }
    if (
      !updatedFormData.confirmPassword ||
      updatedFormData.confirmPassword != updatedFormData.password
    ) {
      return "Confirm password should match password";
    }
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstSubmission(false);
    let error = validate(formData);
    setErrorMessage(error);
    if (!error) {
      let payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      setLoader(true);
      mutation.mutate(payload);
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="register">
      <div className="register__container">
        <img src={Logo} alt="logo" className="logo" />
        <p className="register__app-name">Expense Tracker</p>
        <h1 className="register__header">Registration</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button className="register__btn-submit" type="submit">
            REGISTER
          </button>
        </form>
        <p className="register__error">{errorMessage}</p>
        <p className="register__login">
          Already have an account?{" "}
          <Link className="register__login-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
