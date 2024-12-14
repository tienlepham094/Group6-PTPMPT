import { RequestParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const adminApi = {
  getAllResources: async () => {
    const response = await axiosClient.get("app/admin/get/available-resources");

    return response.data;
  },
  getAllRequest: async () => {
    const response = await axiosClient.get("app/admin/get/requests-issue");

    return response.data;
  },
  approve: async () => {
    const response = await axiosClient.get("app/admin/request/approve");

    return response.data;
  },
  addResource: async () => {
    const response = await axiosClient.get("app/admin/resource/add");

    return response.data;
  },
  updateResource: async () => {
    const response = await axiosClient.get("app/admin/resource/update");

    return response.data;
  },
  deleteResource: async () => {
    const response = await axiosClient.get("app/admin/resource/delete");

    return response.data;
  },
};

export default adminApi;
