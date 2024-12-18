import { RequestParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const requestApi = {
  create: async (data: RequestParams) => {
    const response = await axiosClient.post(`/app/user/create-request`, data);

    return response;
  },
  cancel: async (id: string) => {
    const response = await axiosClient.put(`/app/user/cancel-request/${id}`);
    return response;
  },
  edit: async (id: string, data: RequestParams) => {
    const response = await axiosClient.put(
      `/app/user/edit-request/${id}`,
      data
    );
    return response;
  },
  delete: async (id: string) => {
    const response = await axiosClient.put(`/app/user/cancel-request/${id}`);
    return response;
  },
  //   getAll: async (id: string) => {
  //     const response = await axiosClient.get(`/app/user/requests/`);
  //     return response;
  //   },
};

// Create GetAll Funtion and Config It with backend api

export default requestApi;
