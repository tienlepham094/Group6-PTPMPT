import { Requests } from "../../types";
import axiosClient from "../axiosClient ";

const requestApi = {
  getAllRequests: async () => {
    try {
      const response = await axiosClient.get(`/auth/api/requests/get`);
      return response.data;
    } catch (error) {
      console.error("Error fetching requests:", error);
      throw error;
    }
  },

  getRequestById: async (id: number) => {
    try {
      const response = await axiosClient.get(`/auth/api/requests/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching request with id ${id}:`, error);
      throw error;
    }
  },

  // Fetch requests by user ID
  getRequestsByUserId: async (userId: number) => {
    try {
      const response = await axiosClient.get(
        `/auth/api/requests/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching requests for user ${userId}:`, error);
      throw error;
    }
  },

  // Create a new request
  createRequest: async (requestData: Requests) => {
    try {
      const response = await axiosClient.post(
        `/auth/api/requests`,
        requestData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  },

  // Update request status (Approve or Reject)
  updateRequestStatus: async (id: number, status: string) => {
    try {
      const response = await axiosClient.patch(
        `/auth/api/requests/${id}/status`,
        null,
        {
          params: { status },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating request status for id ${id}:`, error);
      throw error;
    }
  },
};

export default requestApi;
