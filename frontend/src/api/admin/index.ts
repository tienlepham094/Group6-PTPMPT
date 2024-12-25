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
  editRequest: async (
    requestId: number,
    adminId: number,
    data: RequestParams
  ) => {
    if (!requestId || !adminId) {
      throw new Error("Missing required parameters: requestId or adminId");
    }

    const response = await axiosClient.put(
      `app/admin/edit/requests/${requestId}?adminId=${adminId}`,
      data
    );

    return response.data;
  },
  deleteRequest: async (id: number, adminId?: number) => {
    const response = await axiosClient.delete(
      `app/admin/delete/requests/${id}?adminId=${adminId}`
    );
    return response.data;
  },

  approve: async (
    requestId: number,
    action: "approve" | "reject" | "queue",
    comments?: string
  ) => {
    try {
      const response = await axiosClient.post("app/admin/request/approve", {
        requestId,
        action,
        comments,
      });
      return response.data;
    } catch (error) {
      console.error("Error approving request:", error);
      throw error;
    }
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
  getAllApproval: async () => {
    const response = await axiosClient.get("app/admin/approvals");

    return response.data;
  },
  getAllAccount: async () => {
    const response = await axiosClient.get("app/admin/user_management/getall");

    return response.data;
  },
};

export default adminApi;
