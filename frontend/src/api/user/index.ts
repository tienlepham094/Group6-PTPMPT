import axiosClient from "../axiosClient ";

const userApi = {
  getAllUser: async () => {
    const response = await axiosClient.get(`/auth/api/users/get`);
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await axiosClient.get(`/auth/api/users/${id}`);
    return response.data;
  },
  getUserInfo: async () => {
    const response = await axiosClient.get(`/auth/api/users/user/info`);
    return response.data;
  },
};

export default userApi;
