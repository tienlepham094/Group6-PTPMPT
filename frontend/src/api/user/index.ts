import axiosClient from "../axiosClient ";

const userApi = {
  getAllRequest: async (userId: number) => {
    const response = await axiosClient.get(
      `app/user/requests?userId=${userId}`
    );
    return response.data;
  },
};

export default userApi;
