import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import {
  useAddOrUpdateExpense,
  useExpense,
} from "../../hooks/useExpenseFormData";
import Error from "../../components/Error/Error";
import Logo from "../../assets/images/Logo_Purple.png";
import "./ExpenseForm.scss";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

function ExpenseForm() {
  const CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "",
    date: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.endsWith("/edit");

  const {
    isPending: isExpensePending,
    isError: isExpenseError,
    data: expenseData,
    error: expenseError,
  } = useExpense(id);

  const handleSubmitSuccess = () => {
    navigate("/dashboard");
    setLoader(false);
  };

  const mutation = useAddOrUpdateExpense(handleSubmitSuccess);

  useEffect(() => {
    if (expenseData) {
      setFormData(expenseData);
    }
  }, [expenseData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    if (!isFirstSubmit) {
      let error = validate(updatedData);
      setErrorMessage(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFirstSubmit(false);
    let error = validate(formData);
    let hasError = Object.values(error).filter((value) => value != "");
    if (hasError.length == 0) {
      try {
        setLoader(true);
        await mutation.mutateAsync({ formData, id });
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
    setErrorMessage(error);
  };

  const validate = (data) => {
    let errorValues = { ...errorMessage };
    if (!data.title) {
      errorValues.title = "Title is required";
    } else {
      errorValues.title = "";
    }
    if (!data.amount) {
      errorValues.amount = "Amount cannot be zero";
    } else {
      errorValues.amount = "";
    }
    if (!data.category) {
      errorValues.category = "Category is required";
    } else {
      errorValues.category = "";
    }
    if (!data.date) {
      errorValues.date = "Date is required";
    } else {
      errorValues.date = "";
    }
    return errorValues;
  };

  if ((isEdit && isExpensePending) || loader) return <Loader />;

  if (isEdit && isExpenseError)
    return <Error errorMessage={expenseError.message} />;

  return (
    <div className="expense">
      <div className="expense__container">
        <img src={Logo} alt="Logo" className="logo" />
        <p className="expense__app-name">Expense Tracker</p>
        <h1 className="expense__header">{isEdit ? "Edit" : "Add"} Expense</h1>
        <form className="expense__form" onSubmit={handleSubmit}>
          <div className="expense__form-fields">
            <InputField
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errorMessage.title && (
              <p className="expense__error">{errorMessage.title}</p>
            )}
          </div>
          <div className="expense__form-fields">
            <InputField
              name="amount"
              id="amount"
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
            {errorMessage.amount && (
              <p className="expense__error">{errorMessage.amount}</p>
            )}
          </div>
          <div className="expense__form-fields">
            <InputField
              name="category"
              id="category"
              type="select"
              placeholder="Please select a Category..."
              selectLabel="Category"
              selectOptions={CATEGORIES}
              value={formData.category}
              onChange={handleInputChange}
            />
            {errorMessage.category && (
              <p className="expense__error">{errorMessage.category}</p>
            )}
          </div>
          <div className="expense__form-fields">
            <InputField
              name="date"
              id="date"
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {errorMessage.date && (
              <p className="expense__error">{errorMessage.date}</p>
            )}
          </div>
          <div className="expense__btn">
            <Button
              type="button"
              mode="cancel"
              handleClick={() => navigate("/dashboard")}
            >
              CANCEL
            </Button>
            <Button type="submit">{isEdit ? "EDIT" : "ADD"} EXPENSE</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
