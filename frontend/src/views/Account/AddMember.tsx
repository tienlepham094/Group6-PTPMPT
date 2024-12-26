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
import { User } from "../../types";
import usergroupApi from "../../api/usergroup";
interface Params {
  open: boolean;
  setOpen: (param: boolean) => void;
  onClose: () => void;
  type: "add" | "edit" | "delete";
  id?: number;
  groupId?: number;
}
export const AddMember = ({ onClose, open, type, id, groupId }: Params) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>();

  const fetchUser = useCallback(async () => {
    try {
      const users = await usergroupApi.getUsersNotInGroupId(groupId!);
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, [groupId]);
  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await usergroupApi.addUserToGroup({
          user: { id: userId as number },
          group: { id: groupId as number },
        });
      } else if (type === "delete") {
        await usergroupApi.removeUserFromGroup(groupId as number, id as number);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const handleClose = useCallback(() => {
    setUserId(undefined);
    fetchUser();
    onClose();
  }, [fetchUser, onClose]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
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
              <pre>{JSON.stringify(userId, null, 2)}</pre>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
