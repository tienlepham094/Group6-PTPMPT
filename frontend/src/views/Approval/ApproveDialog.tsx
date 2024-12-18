import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { APPROVALSTATUS, APPROVALSTATUS_TRANSLATION } from "../../api/enum"; // Assuming you have ACTIONTYPE enum for "approve", "reject", "queue"
import { useAuth } from "../../context/useAuth";

interface ApproveParams {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    requestId: number,
    action: "approve" | "reject" | "queue",
    comments: string
  ) => void;
  requestId?: number;
}

export const ApproveDialog = ({
  onSubmit,
  onClose,
  open,
  requestId,
}: ApproveParams) => {
  const { user } = useAuth(); // Assuming user contains requestId
  const [formData, setFormData] = useState<{
    action: "approve" | "reject" | "queue";
    comments: string;
    requestId: number;
  }>({
    action: "approve", // Default action
    comments: "", // Initialize with empty string
    requestId: requestId || 0, // Assuming `user.id` is the user ID, replace with actual value if needed
  });
  console.log(requestId);

  const handleChange = (key: keyof typeof formData, value: unknown) => {
    setFormData((prev) => ({
      ...prev!,
      [key]: value, // Ensure the value is always defined
    }));
  };

  const handleSubmit = () => {
    if (formData) {
      console.log(requestId);

      onSubmit(requestId!, formData.action, formData.comments);
      setFormData({
        action: "approve", // Reset to default
        comments: "",
        requestId: requestId || 0,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thay đổi trạng thái</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Chọn hành động"
          value={formData.action} // Bind action to state
          onChange={(e) =>
            handleChange(
              "action",
              e.target.value as "approve" | "reject" | "queue"
            )
          }
        >
          {Object.keys(APPROVALSTATUS_TRANSLATION).map((key) => (
            <MenuItem key={key} value={key as keyof typeof APPROVALSTATUS}>
              {
                APPROVALSTATUS_TRANSLATION[
                  key as keyof typeof APPROVALSTATUS_TRANSLATION
                ]
              }
            </MenuItem>
          ))}
        </TextField>

        {/* Comment TextField */}
        <TextField
          fullWidth
          margin="normal"
          label="Phản hồi"
          value={formData.comments} // Bind comments to state
          onChange={(e) => handleChange("comments", e.target.value)} // Ensure value is string
        />
      </DialogContent>
      <DialogActions>
        {/* Cancel Button */}
        <Button onClick={onClose} color="secondary" variant="contained">
          Hủy
        </Button>
        {/* Save Button */}
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
