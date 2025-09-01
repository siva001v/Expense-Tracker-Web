import axios from "axios";
import { ApiConstants } from "../assets/Constants";
import { getBearerToken } from "../utils/Auth";
import { toast } from "react-toastify";

export const getUser = async () => {
  const url = ApiConstants.BASEURL + ApiConstants.GETUSER;
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.get(url, config);
    if (res.status == 200) {
      toast.success(res.data.message);
      return res.data.data;
    }
    throw new Error(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Failed to fetch profile data");
  }
};

export const saveProfile = async ({ payload, id }) => {
  const url = ApiConstants.BASEURL + ApiConstants.GETUSER + `/${id}`;
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.put(url, payload, config);
    if (res.status == 200) {
      toast.success(res.data.message);
      return res.data.data;
    }
    throw new Error(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Failed to save profile data");
  }
};

export const changeUserPassword = async (payload) => {
  const url = ApiConstants.BASEURL + ApiConstants.GETCHANGEPASSWORD;
  const config = {
    headers: {
      Authorization: getBearerToken(),
    },
  };
  try {
    const res = await axios.put(url, payload, config);
    if (res.status == 200) {
      toast.success(res.data.message);
      return res.data.data;
    }
    throw new Error(res.data.message);
  } catch (err) {
    toast.error(err.response.data.message);
    if (err && err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Failed to change password");
  }
};
