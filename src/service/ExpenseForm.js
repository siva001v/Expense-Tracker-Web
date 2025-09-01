import axios from "axios";
import { getBearerToken } from "../utils/Auth";
import { ApiConstants } from "../assets/Constants";
import { toast } from "react-toastify";

export const getExpense = async (id) => {
  let config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  let url = ApiConstants.BASEURL + ApiConstants.GETEXPENSES + `/${id}`;
  try {
    const res = await axios.get(url, config);
    if (res.status == 200 && res.data.data) {
      return {
        title: res.data.data.title,
        amount: res.data.data.amount,
        category: res.data.data.category,
        date: res.data.data.date ? res.data.data.date.split("T")[0] : "",
      };
    }
    throw new Error("Error fetching data, Please reload the page");
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Some error occured, Please reload the page");
  }
};

export const addOrUpdateExpense = async ({ formData, id = null }) => {
  let url =
    ApiConstants.BASEURL + ApiConstants.GETEXPENSES + `${id ? `/${id}` : ""}`;
  let config = {
    method: id ? "PUT" : "POST",
    data: formData,
    url: url,
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.request(config);
    if (res.status == 201 && res.data.data) {
      toast.success(res.data.message);
      return res.data.data;
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
