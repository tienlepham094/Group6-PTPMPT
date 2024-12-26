import axiosClient from "../axiosClient ";

const allocationApi = {
  getAllAllocations: async () => {
    const response = await axiosClient.get("/auth/api/allocations");

    return response.data;
  },
  getAllocationsByUserId: async (id: number) => {
    const response = await axiosClient.get(`/auth/api/allocations/user/${id}`);

    return response.data;
  },
};

export default allocationApi;
