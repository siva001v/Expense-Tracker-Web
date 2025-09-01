import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useChangeUserPassword } from "../hooks/useProfileData";
import InputField from "../components/InputField";

function Settings() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setLoader(false);
    navigate("/dashboard");
  };

  const handleError = () => {
    setLoader(false);
  };

  const mutation = useChangeUserPassword(handleSuccess, handleError);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    let error = validate(formData);
    if (Object.values(error).filter((value) => value != "").length == 0) {
      setLoader(true);
      let payload = {
        password: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      mutation.mutate(payload);
    } else {
      setErrorMessage(error);
    }
  };

  const validate = (updatedFormData) => {
    let error = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    if (updatedFormData.oldPassword == "") {
      error["oldPassword"] = "Old Password cannot be empty";
    }
    if (updatedFormData.newPassword == "") {
      error["newPassword"] = "New Password cannot be empty";
    }
    if (updatedFormData.confirmNewPassword == "") {
      error["confirmNewPassword"] = "Confirm New Password cannot be empty";
    }
    if (
      updatedFormData.newPassword != "" &&
      updatedFormData.confirmNewPassword != "" &&
      updatedFormData.newPassword != updatedFormData.confirmNewPassword
    ) {
      error["confirmNewPassword"] = "Password must match";
    }
    return error;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (!isFirstSubmit) {
      let error = validate({ ...formData, [name]: value });
      setErrorMessage(error);
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="settings">
      <Header />
      <div className="settings__container">
        <div className="settings__content">
          <p className="settings__title">Settings</p>
          <form className="settings__form" onSubmit={onSubmit}>
            <InputField
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleInputChange}
            />
            {errorMessage.oldPassword && (
              <p className="settings__error">{errorMessage.oldPassword}</p>
            )}
            <InputField
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            {errorMessage.newPassword && (
              <p className="settings__error">{errorMessage.newPassword}</p>
            )}
            <InputField
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
            />
            {errorMessage.confirmNewPassword && (
              <p className="settings__error">
                {errorMessage.confirmNewPassword}
              </p>
            )}
            <div className="settings__btn">
              <button
                className="settings__btn-cancel"
                type="button"
                onClick={() => navigate("/dashboard")}
              >
                CANCEL
              </button>
              <button className="settings__btn-save" type="submit">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
