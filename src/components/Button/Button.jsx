import "./Button.scss";

function Button({ children, type, handleClick, isOpen = false, mode = "" }) {
  return (
    <button
      className={`btn ${mode} ${isOpen ? "open" : ""}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
