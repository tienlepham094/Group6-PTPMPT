import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { RESOURCETYPE } from "../../api/enum";
import { useAuth } from "../../context/useAuth";
import { Groups, Resources } from "../../types";
import { useCallback, useEffect, useState } from "react";
import resourceApi from "../../api/resource";
import groupApi from "../../api/group";

type Params = {
  open: boolean;
  setOpen: (param: boolean) => void;
  onClose: () => void;
  type: "add" | "edit" | "delete";
  id?: number;
};

export const ResourceDialog = ({
  open,
  type,
  id,
  setOpen,
  onClose,
}: Params) => {
  const { user } = useAuth();
  const [resource, setResource] = useState<Resources>({
    id: 0,
    name: "",
    description: "",
    totalQuantity: 0,
    availableQuantity: 0,
    type: RESOURCETYPE.CPU,
    createdBy: { id: user.id },
    group: null,
    createdAt: new Date(),
  });
  const [groups, setGroups] = useState<Groups[]>([]);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResource((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchResource = useCallback(async () => {
    try {
      const resources = await resourceApi.getResourceById(id!);
      setResource(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }, [id]);
  const fetchGroups = useCallback(async () => {
    try {
      const groups = await groupApi.getAllGroup();
      setGroups(groups);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }, []);
  useEffect(() => {
    if (type === "edit" && id) {
      fetchResource();
    }
    fetchGroups();
  }, [fetchResource, fetchGroups, type, id]);
  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await resourceApi.createResource(resource);
      } else if (type === "edit") {
        // const response = await resourceApi.createResource(resource);
      } else {
        await resourceApi.deleteResource(id!);
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    } finally {
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>
        {type === "add"
          ? "Nhập thông tin tài nguyên muốn thêm"
          : type === "edit"
            ? "Chỉnh sửa thông tin tài nguyên"
            : "Xóa thông tin tài nguyên"}
      </DialogTitle>
      <DialogContent>
        {type === "delete" ? (
          "Bạn có chắc chắn muốn xóa tài nguyên này không?"
        ) : (
          <>
            <TextField
              name="name"
              label="Tên tài nguyên"
              value={resource.name}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Mô tả"
              value={resource.description}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="type"
              select
              label="Loại"
              value={resource.type}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            >
              {Object.values(RESOURCETYPE).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="totalQuantity"
              label="Số lượng hiện có"
              value={resource.totalQuantity}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              name="availableQuantity"
              label="Số lượng khả dụng"
              value={resource.availableQuantity}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="number"
            />

            <TextField
              name="group"
              label="Nhóm cấp phát"
              value={resource.group?.id}
              select
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>

            <pre>{JSON.stringify(resource, null, 2)}</pre>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};
