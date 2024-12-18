import React, { useState } from "react";
import { RequestParams } from "../../context/types";
import { RESOURCETYPE } from "../../api/enum";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/useAuth";
type CustomeDialogParams = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RequestParams) => void;
  data?: RequestParams | undefined;
};
export const CustomeDialog = ({
  onClose,
  onSubmit,
  open,
  data,
}: CustomeDialogParams) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<RequestParams | undefined>({
    resourceType: data?.resourceType || RESOURCETYPE.GPU || data?.resource_type, // Default to GPU
    quantity: data?.quantity || 0,
    reason: data?.reason || "",
    timeUsage: data?.timeUsage || 0,
    userId: user?.id || 0,
    created_at: data?.created_at || "",
    end_time: data?.end_time || "",
    requestId: data?.requestId || "",
    start_time: data?.start_time || "",
    statusRequest: data?.statusRequest || "",
    updatedAt: data?.updatedAt || "",
  });

  const handleChange = (key: keyof RequestParams, value: unknown) => {
    setFormData((prev) => ({
      ...prev!,
      [key]: value, // Ensure the value is always defined
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData!);
    setFormData(undefined);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Điền yêu cầu</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Loại tài nguyên"
          value={formData?.resourceType || data?.resourceType}
          onChange={(e) =>
            handleChange("resourceType", e.target.value as RESOURCETYPE)
          }
        >
          {Object.values(RESOURCETYPE).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Số lượng"
          type="number"
          value={formData?.quantity || data?.quantity}
          onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Lí do"
          value={formData?.reason || data?.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Thời gian sử dụng"
          value={formData?.timeUsage || data?.timeUsage}
          onChange={(e) => handleChange("timeUsage", parseInt(e.target.value))}
        />
        {user?.role === "admin" ? (
          <TextField
            fullWidth
            margin="normal"
            label="Id người dùng"
            type="number"
            value={formData?.userId || data?.userId}
            onChange={(e) => handleChange("userId", parseInt(e.target.value))}
          />
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
