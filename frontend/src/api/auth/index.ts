import { LoginParams, RegisterParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const authApi = {
  login: async (data: LoginParams) => {
    console.log(data);
    const response = await axiosClient.post("/app/login", data);
    console.log(response);

    return response;
  },
  register: async (data: RegisterParams) => {
    const response = await axiosClient.post("/app/register", data);

    return response;
  },
};

export default authApi;
