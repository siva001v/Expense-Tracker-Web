import axios from "axios";
import { getBearerToken } from "../utils/Auth";
import { toast } from "react-toastify";
import { API_BASE_URL, API_ENDPOINTS } from "../../api/api-constants";

export const getUser = async () => {
  const url = API_BASE_URL + API_ENDPOINTS.GETUSER;
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
  const url = API_BASE_URL + API_ENDPOINTS.GETUSER + `/${id}`;
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
  const url = API_BASE_URL + API_ENDPOINTS.GETCHANGEPASSWORD;
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
