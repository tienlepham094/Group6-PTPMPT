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
  getUsersNotInGroupId: async (groupId: number) => {
    const response = await axiosClient.get(
      `/auth/api/user-groups/notInGroup/${groupId}`
    );
    return response.data;
  },

  removeUserFromGroup: async (groupId: number, userId: number) => {
    const response = await axiosClient.delete(
      `/auth/api/user-groups/group/${groupId}/user/${userId}`
    );
    return response.data;
  },
};

export default usergroupApi;
