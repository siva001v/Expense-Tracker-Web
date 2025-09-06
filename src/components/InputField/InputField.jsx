import { IoIosArrowDown } from "react-icons/io";
import "./InputField.scss";

function InputField({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  selectLabel = "",
  selectOptions = [],
  isDisabled = false,
  align = "column",
}) {
  return (
    <div className={`input__field ${align}`}>
      {type == "select" ? (
        <>
          <label htmlFor={id}>{selectLabel}</label>
          <select
            className="input__field-select"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
          >
            <option value="" disabled key={`default-form-${name}`}>
              {placeholder}
            </option>
            {selectOptions.map((option) => (
              <option value={option} key={`form-${option}`}>
                {option}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="input__field-select-arrow" />
        </>
      ) : (
        <>
          <label htmlFor={id}>{placeholder}</label>
          <input
            className="input__field-input"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
          />
        </>
      )}
    </div>
  );
}

export default InputField;
