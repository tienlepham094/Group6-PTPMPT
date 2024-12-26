import { Groups } from "../../types";
import axiosClient from "../axiosClient ";

const groupApi = {
  createGroup: async (data: Groups) => {
    const response = await axiosClient.post("/auth/api/groups", data);
    return response.data;
  },
  updateGroup: async (data: Groups) => {
    const response = await axiosClient.put(`/auth/api/groups/${data.id}`, data);
    return response.data;
  },
  getGroupById: async (id: number) => {
    const response = await axiosClient.get(`/auth/api/groups/${id}`);
    return response.data;
  },
  getAllGroup: async () => {
    const response = await axiosClient.get(`/auth/api/groups/get`);
    return response.data;
  },
  getGroupsByManagerId: async (managerId: number) => {
    const response = await axiosClient.get(
      `/auth/api/groups/manager/${managerId}`
    );
    return response.data;
  },

  deleteGroup: async (id: number) => {
    const response = await axiosClient.delete(`/auth/api/groups/${id}`);
    return response.data;
  },
};

export default groupApi;
