import { useState } from "react";
import { RegisterParams } from "../../context/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
type EditAccountParams = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RegisterParams) => void;
  data?: RegisterParams | undefined;
};
export const EditAccount = ({
  onClose,
  onSubmit,
  open,
  data,
}: EditAccountParams) => {
  const [formData, setFormData] = useState<RegisterParams | undefined>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (key: keyof RegisterParams, value: unknown) => {
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
      <DialogTitle>Enter Request Details</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={formData?.email || data?.email}
          onChange={(e) => handleChange("email", parseInt(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tên đăng nhập"
          value={formData?.username || data?.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu"
          value={formData?.password || data?.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
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
