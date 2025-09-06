import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo_Purple.png";
import { useUser } from "../../context/useUser";
import "./Header.scss";

function Header() {
  const { user, dispatch } = useUser();
  const avatar = useMemo(() => {
    return user?.name
      ? user.name
          ?.split(" ")
          .reduce((acc, value) => acc + value.charAt(0).toUpperCase(), "")
      : "G";
  }, [user?.name]);

  const navigate = useNavigate();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogoutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openLogout = () => {
    setLogoutOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR_USER" });
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header__title">
        <img src={Logo} alt="logo" className="logo" />
        <h1>Expense Tracker</h1>
      </div>
      <div className="header__logout" ref={dropdownRef}>
        <div className="header__logout-user" onClick={openLogout}>
          <span>{avatar}</span>
          <div
            className={`header__logout-dropdown ${logoutOpen ? "open" : ""}`}
          >
            <div
              className="header__logout-dropdown-item"
              onClick={() => navigate("/profile")}
            >
              Profile
            </div>
            <div
              className="header__logout-dropdown-item"
              onClick={() => navigate("/settings")}
            >
              Settings
            </div>
            <div
              className="header__logout-dropdown-item"
              onClick={handleLogout}
            >
              <span>Logout</span>
              <IoIosLogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
