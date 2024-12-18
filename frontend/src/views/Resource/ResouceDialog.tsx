import { ChangeEvent, useState } from "react";
import { ResourceParams } from "../../context/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  RESOURCESTATUS,
  RESOURCESTATUS_TRANSLATION,
  RESOURCETYPE,
} from "../../api/enum";
import { useAuth } from "../../context/useAuth";

type ResourceDialogParams = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ResourceParams) => void;
  data?: ResourceParams | undefined;
};

export const ResourceDialog = ({
  onClose,
  onSubmit,
  open,
  data,
}: ResourceDialogParams) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ResourceParams>({
    userId: data?.userId || user?.id || 0,
    quantity: data?.quantity || 0,
    resourceType: data?.resourceType || RESOURCETYPE.CPU,
    statusResources: data?.statusResources || RESOURCESTATUS.AVAILABLE,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value as unknown,
    }));
  };

  const validateForm = (): boolean => {
    if (formData.quantity < 0) {
      alert("Quantity must be a positive number.");
      return false;
    }
    if (!formData.resourceType || !formData.statusResources) {
      alert("All fields must be filled.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData); // Send data to parent component
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {data
          ? "Chỉnh sửa thông tin tài nguyên"
          : "Nhập thông tin tài nguyên muốn thêm"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            name="userId"
            type="number"
            label="Id người dùng"
            value={formData?.userId || ""}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setFormData((prev) => ({
                ...prev,
                userId: Number(numericValue),
              }));
            }}
            // disabled
          />
          <FormControl fullWidth>
            <InputLabel id="resource-type-label">Loại tài nguyên</InputLabel>
            <Select
              fullWidth
              name="resourceType"
              labelId="resource-type-label"
              value={formData.resourceType}
              onChange={handleInputChangeSelect}
            >
              {Object.entries(RESOURCETYPE).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="quantity"
            type="number"
            label="Số lượng"
            value={formData.quantity}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setFormData((prev) => ({
                ...prev,
                quantity: Number(numericValue),
              }));
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="status-resources-label">Trạng thái</InputLabel>
            <Select
              fullWidth
              name="statusResources"
              labelId="status-resources-label"
              value={formData.statusResources}
              onChange={handleInputChangeSelect}
            >
              {Object.entries(RESOURCESTATUS).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {RESOURCESTATUS_TRANSLATION[value]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
