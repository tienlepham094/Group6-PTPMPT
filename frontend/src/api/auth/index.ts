import { LoginParams, RegisterParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const authApi = {
  login: async (data: LoginParams) => {
    const response = await axiosClient.post("/auth/login", data);
    return response;
  },
  register: async (data: RegisterParams) => {
    const response = await axiosClient.post("/auth/register", data);

    return response;
  },
};

export default authApi;
