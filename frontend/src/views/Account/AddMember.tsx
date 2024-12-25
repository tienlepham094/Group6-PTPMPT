import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import userApi from "../../api/user";
import { Groups, User } from "../../types";
import usergroupApi from "../../api/usergroup";
interface Params {
  open: boolean;
  setOpen: (param: boolean) => void;
  onClose: () => void;
  type: "add" | "edit" | "delete";
  id?: number;
  groupId?: number;
}
export const AddMember = ({
  onClose,
  open,
  setOpen,
  type,
  id,
  groupId,
}: Params) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>();

  const fetchUser = useCallback(async () => {
    try {
      const users = await usergroupApi.getUsersNotInGroupId(groupId!);
      setUsers(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }, [groupId]);
  const fetchGroup = useCallback(async () => {
    try {
      const users = await userApi.getAllUser();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await usergroupApi.addUserToGroup({
          user: { id: userId as number },
          group: { id: groupId as number },
        });
      } else if (type === "delete") {
        console.log("first");

        await usergroupApi.removeUserFromGroup(groupId as number, id as number);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    if (groupId) {
      fetchUser();
      // fetchGroup();
    }
  }, [fetchGroup, fetchUser, groupId, id]);
  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setGroup((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDialog-paper": { width: "600px", maxWidth: "90%" } }}
      >
        <DialogTitle>
          {type === "add"
            ? "Thêm nhóm mới"
            : type === "edit"
              ? "Chỉnh sửa nhóm"
              : "Xóa nhóm"}
        </DialogTitle>
        <DialogContent>
          {type === "delete" ? (
            <>Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm không?</>
          ) : (
            <>
              <TextField
                label="Thêm thành viên"
                onChange={(e) => {
                  const selectedUsers = users.find(
                    (user) => user.id === Number(e.target.value)
                  );
                  setUserId(selectedUsers?.id || 0);
                }}
                value={userId}
                select
                fullWidth
                margin="normal"
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </TextField>
              ll
              <pre>{JSON.stringify(userId, null, 2)}</pre>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
