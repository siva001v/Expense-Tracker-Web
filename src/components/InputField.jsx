function InputField({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  isDisabled = false,
}) {
  return (
    <div className="register__form-fields">
      <label htmlFor={id}>{placeholder}</label>
      <input
        className="register__form-fields-input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}

export default InputField;
