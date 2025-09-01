import axios from "axios";
import { getBearerToken } from "../utils/Auth";
import { ApiConstants } from "../assets/Constants";
import { toast } from "react-toastify";

export const defaultSummary = [
  {
    name: "Food",
    value: 0,
    percent: 0,
  },
  {
    name: "Transport",
    value: 0,
    percent: 0,
  },
  {
    name: "Shopping",
    value: 0,
    percent: 0,
  },
  {
    name: "Bills",
    value: 0,
    percent: 0,
  },
  {
    name: "Entertainment",
    value: 0,
    percent: 0,
  },
  {
    name: "Health",
    value: 0,
    percent: 0,
  },
  {
    name: "Other",
    value: 0,
    percent: 0,
  },
];

export const getExpenses = async (filterQuery) => {
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.get(
      ApiConstants.BASEURL + ApiConstants.GETEXPENSES + filterQuery,
      config
    );
    if (res.status == 200 && res.data.data) {
      return res.data.data;
    }
    throw new Error("Some error occured, Please reload the page");
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Some error occured, Please reload the page");
  }
};

export const deleteExpense = async (expenseId) => {
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  let url = ApiConstants.BASEURL + ApiConstants.GETEXPENSES + `/${expenseId}`;
  try {
    const res = await axios.delete(url, config);
    if (res.status == 200 && res.data.data) {
      toast.success(res.data.message);
      return res.data;
    }
    toast.error(res.data.message);
    throw new Error("Some error occured, Please try again");
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Some error occured, Please try again");
  }
};

export const getTrends = async () => {
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.get(
      ApiConstants.BASEURL + ApiConstants.GETTRENDS,
      config
    );
    if (res.status == 200 && res.data.data) {
      return res.data.data;
    } else {
      throw new Error("Some error occured, Please reload the page");
    }
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Some error occured, Please reload the page");
  }
};

export const getSummary = async () => {
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.get(
      ApiConstants.BASEURL + ApiConstants.GETSUMMARY,
      config
    );
    if (res.status == 200 && res.data.data) {
      return res.data.data;
    } else {
      throw new Error("Some error occured, Please reload the page");
    }
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Some error occured, Please reload the page");
  }
};

export const getCategoryColor = (category) => {
  switch (category) {
    case "Food":
      return "green";
    case "Transport":
      return "blue";
    case "Shopping":
      return "purple";
    case "Bills":
      return "orange";
    case "Entertainment":
      return "pink";
    case "Health":
      return "teal";
    case "Other":
      return "gray";
    default:
      return "";
  }
};

export const formatDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  return null;
};
