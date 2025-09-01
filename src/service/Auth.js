import axios from "axios";
import { ApiConstants } from "../assets/Constants";
import { toast } from "react-toastify";

export const getLogin = async (formData) => {
  let url = ApiConstants.BASEURL + ApiConstants.LOGIN;

  try {
    const res = await axios.post(url, formData);
    if (res.status == 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.data.user.name);
      toast.success(res.data.message);
      return res.data.data;
    }
    toast.error(res.data.message);
    throw new Error("Invalid credentials");
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Login failed, Please try again.");
  }
};

export const postRegister = async (formData) => {
  let url = ApiConstants.BASEURL + ApiConstants.REGISTER;

  try {
    const res = await axios.post(url, formData);
    if (res.status == 201) {
      toast.success(res.data.message);
      return res.data.data;
    }
    toast.error(res.data.message);
    throw new Error("Registration failed, Please try again.");
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Registration failed, Please try again.");
  }
};
