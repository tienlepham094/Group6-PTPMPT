import axiosClient from "../axiosClient ";

const usergroupApi = {
  addUserToGroup: async (data: {
    user: { id: number };
    group: { id: number };
  }) => {
    const response = await axiosClient.post("/auth/api/user-groups", data);
    return response.data;
  },

  getUsersByGroupId: async (groupId: number) => {
    const response = await axiosClient.get(
      `/auth/api/user-groups/group/${groupId}`
    );
    return response.data;
  },

  removeUserFromGroup: async (id: number) => {
    const response = await axiosClient.delete(`/auth/api/user-groups/${id}`);
    return response.data;
  },
};

export default usergroupApi;
