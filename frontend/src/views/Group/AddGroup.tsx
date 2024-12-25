import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Groups, User } from "../../types";
import userApi from "../../api/user";
import groupApi from "../../api/group";
interface Params {
  open: boolean;
  setOpen: (param: boolean) => void;
  onClose: () => void;
  type: "add" | "edit" | "delete";
  id?: number;
}
export const AddGroup = ({ open, type, id, setOpen, onClose }: Params) => {
  const [group, setGroup] = useState<Groups>({
    name: "",
    manager: {
      id: 0,
    },
  });
  const [managers, setManagers] = useState<User[]>([]);

  const fetchManager = useCallback(async () => {
    try {
      const managers = await userApi.getAllUser();
      setManagers(managers);
      console.log(managers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchGroup = useCallback(async () => {
    try {
      const group = await groupApi.getGroupById(id!);
      setGroup(group);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await groupApi.createGroup(group);
      } else if (type === "edit") {
        // groupApi.(id!, group).then(() => {
        //   setOpen(false);
        //   });
      } else if (type == "delete") {
        await groupApi.deleteGroup(id!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };
  useEffect(() => {
    fetchManager();
    if (type !== "add") {
      fetchGroup();
    }
  }, [fetchGroup, fetchManager, type]);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
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
            <>Bạn có chắc chắn muốn xóa nhóm này không?</>
          ) : (
            <>
              <TextField
                name="name"
                label="Tên nhóm"
                value={group.name}
                fullWidth
                margin="normal"
                onChange={handleFormChange}
              />
              <TextField
                name="manager"
                label="Trưởng nhóm"
                value={group.manager?.id || ""}
                onChange={(e) => {
                  const selectedManagers = managers.find(
                    (manager) => manager.id === Number(e.target.value)
                  );
                  setGroup((prev) => ({
                    ...prev,
                    manager: {
                      id: selectedManagers?.id || 0,
                    },
                  }));
                }}
                select
                fullWidth
                margin="normal"
              >
                {managers.map((manager) => (
                  <MenuItem key={manager.id} value={manager.id}>
                    {manager.username}
                  </MenuItem>
                ))}
              </TextField>
              <pre>{JSON.stringify(group, null, 2)}</pre>
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
