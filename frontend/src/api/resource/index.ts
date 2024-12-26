import { Resources } from "../../types";
import axiosClient from "../axiosClient ";

const resourceApi = {
  createResource: async (data: Resources) => {
    const response = await axiosClient.post(`/auth/api/resources`, data);
    return response.data;
  },

  updateResource: async (data: Resources) => {
    const response = await axiosClient.put(
      `/auth/api/resources/${data.id}`,
      data
    );
    return response.data;
  },

  getAllResources: async () => {
    const response = await axiosClient.get(`/auth/api/resources`);
    return response.data;
  },

  getResourceById: async (id: number) => {
    const response = await axiosClient.get(`/auth/api/resources/${id}`);
    return response.data;
  },

  deleteResource: async (id: number) => {
    const response = await axiosClient.delete(`/auth/api/resources/${id}`);
    return response.data;
  },

  allocateResource: async (data: {
    userId: number;
    resourceId: number;
    quantity: number;
  }) => {
    const response = await axiosClient.post(
      `/auth/api/resources/allocate`,
      data
    );
    return response.data;
  },

  releaseResource: async (data: {
    userId: number;
    resourceId: number;
    quantity: number;
  }) => {
    const response = await axiosClient.post(
      `/auth/api/resources/release`,
      data
    );
    return response.data;
  },
};

export default resourceApi;
