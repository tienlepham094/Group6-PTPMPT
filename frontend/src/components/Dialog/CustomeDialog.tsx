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
  data?: RequestParams | undefined;
};
export const CustomeDialog = ({
  onClose,
  onSubmit,
  open,
  data,
}: CustomeDialogParams) => {
  const [formData, setFormData] = useState<RequestParams | undefined>({
    resource_type: data?.resource_type || RESOURCETYPE.GPU, // Default to GPU
    quantity: data?.quantity || 0,
    reason: data?.reason || "",
    timeUsage: data?.timeUsage || "",
    user_id: data?.user_id || 0,
    created_at: data?.created_at || "",
    end_time: data?.end_time || "",
    request_id: data?.request_id || "",
    start_time: data?.start_time || "",
    status_request: data?.status_request || "",
    updated_at: data?.updated_at || "",
  });

  const handleChange = (key: keyof RequestParams, value: any) => {
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
          select
          fullWidth
          margin="normal"
          label="Resource Type"
          value={formData?.resource_type || data?.resource_type}
          onChange={(e) =>
            handleChange("resource_type", e.target.value as RESOURCETYPE)
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
          value={formData?.quantity || data?.quantity}
          onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reason"
          value={formData?.reason || data?.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Time Usage"
          value={formData?.timeUsage || data?.timeUsage}
          onChange={(e) => handleChange("timeUsage", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          type="number"
          value={formData?.user_id || data?.user_id}
          onChange={(e) => handleChange("user_id", parseInt(e.target.value))}
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
