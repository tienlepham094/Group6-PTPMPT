import { RequestParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const adminApi = {
  getAllResources: async () => {
    const response = await axiosClient.get("app/admin/get/available-resources");

    return response;
  },
  getAllRequest: async () => {
    const response = await axiosClient.get("app/admin/get/requests-issue");

    return response;
  },
  approve: async () => {
    const response = await axiosClient.get("app/admin/request/approve");

    return response;
  },
  addResource: async () => {
    const response = await axiosClient.get("app/admin/resource/add");

    return response;
  },
  updateResource: async () => {
    const response = await axiosClient.get("app/admin/resource/update");

    return response;
  },
  deleteResource: async () => {
    const response = await axiosClient.get("app/admin/resource/delete");

    return response;
  },
};

export default adminApi;
