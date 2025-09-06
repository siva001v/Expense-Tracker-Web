import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import { Loader } from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";
import { useProfileUser, useUpdateProfile } from "../../hooks/useProfileData";
import { useUser } from "../../context/useUser";
import "./Profile.scss";
import Button from "../../components/Button/Button";

function Profile() {
  const [name, setName] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useUser();

  const handleSuccess = (data) => {
    let payload = {
      name: data.name,
      email: data.email,
    };
    localStorage.setItem("user", JSON.stringify(payload));
    dispatch({ type: "UPDATE_USER", payload });
    setLoader(false);
    navigate("/dashboard");
  };

  const handleError = () => {
    setLoader(false);
  };

  const { data: profileData, isError, error, isPending } = useProfileUser();

  const mutation = useUpdateProfile(handleSuccess, handleError);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
    }
  }, [profileData]);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    if (name != "") {
      setLoader(true);
      let payload = {
        name,
      };
      const id = profileData._id;
      mutation.mutate({ payload, id });
    } else {
      setErrorMessage("Full name must not be empty");
    }
  };

  const handleInputChange = (event) => {
    if (!isFirstSubmit && name == "") {
      setErrorMessage("Full name must not be empty");
    } else {
      setErrorMessage("");
    }
    setName(event.target.value);
  };

  if (isPending || loader) return <Loader />;

  if (isError) {
    const errors = [error];
    return <Error errorMessage={errors.join("\n")} />;
  }

  return (
    <div className="profile">
      <Header />
      <div className="profile__container">
        <div className="profile__content">
          <p className="profile__title">Profile</p>
          <form className="profile__form" onSubmit={onSubmit}>
            <InputField
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={handleInputChange}
            />
            {errorMessage && <p className="profile__error">{errorMessage}</p>}
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={profileData?.email ?? ""}
              isDisabled={true}
            />
            <div className="profile__btn">
              <Button
                type="button"
                mode="cancel"
                handleClick={() => navigate("/dashboard")}
              >
                CANCEL
              </Button>
              <Button type="submit">SAVE</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
