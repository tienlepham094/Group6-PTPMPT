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
type CustomeDialogParams = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RequestParams) => void;
};
export const CustomeDialog = ({
  onClose,
  onSubmit,
  open,
}: CustomeDialogParams) => {
  const [formData, setFormData] = useState<RequestParams>({
    resourceType: RESOURCETYPE.GPU,
    quantity: 1,
    reason: "",
    timeUsage: "",
    userId: 0,
  });

  const handleChange = (key: keyof RequestParams, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Request Details</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Resource Type"
          value={formData.resourceType}
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
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reason"
          value={formData.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Time Usage"
          value={formData.timeUsage}
          onChange={(e) => handleChange("timeUsage", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          type="number"
          value={formData.userId}
          onChange={(e) => handleChange("userId", parseInt(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
