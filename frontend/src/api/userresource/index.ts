import axiosClient from "../axiosClient ";
import { RESOURCETYPE } from "../enum";

const userresourceApi = {
  allocateResource: async (data: {
    userId: number;
    resourceType: RESOURCETYPE;
    quantity: number;
  }) => {
    const response = await axiosClient.post(
      "/auth/api/api/user/resources/allocate",
      data
    );
    return response.data;
  },

  getUserResources: async (params: {
    userId: number;
    resourceType: RESOURCETYPE;
  }) => {
    const { userId, resourceType } = params;
    const response = await axiosClient.get(`/auth/api/user/resources/get`, {
      params: { userId, resourceType },
    });
    return response.data;
  },
  getAllUserResources: async (params: { userId: number }) => {
    const { userId } = params;
    const response = await axiosClient.get(`/auth/api/user/resources/getAll`, {
      params: { userId },
    });
    return response.data;
  },

  releaseResource: async (data: {
    userId: number;
    resourceType: RESOURCETYPE;
    quantity: number;
  }) => {
    const response = await axiosClient.post(
      `/auth/api/user/resources/release`,
      data
    );
    return response.data;
  },
};

export default userresourceApi;
