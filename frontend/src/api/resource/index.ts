import { ResourceParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const resourceApi = {
  create: async (data: ResourceParams) => {
    const response = await axiosClient.post(`/app/admin/resource/add`, data);

    return response.data;
  },
  edit: async (data: ResourceParams) => {
    const response = await axiosClient.put(`/app/admin/resource/update`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axiosClient.delete(
      `/app/admin/resource/delete/${id}`
    );
    return response.data;
  },
  getAll: async () => {
    const response = await axiosClient.get(
      `/app/admin/get/available-resources`
    );
    return response.data;
  },
};

export default resourceApi;
