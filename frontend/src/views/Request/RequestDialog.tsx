import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  DialogContentText,
  Grid,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import {
  RESOURCETYPE,
  STATUSREQUEST,
  STATUSREQUEST_TRANSLATION,
} from "../../api/enum";
import { Requests, Resources } from "../../types";
import requestApi from "../../api/request";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../context/useAuth";
import resourceApi from "../../api/resource";
interface Params {
  open: boolean;
  setOpen: (param: boolean) => void;
  onClose: () => void;
  type: "add" | "edit" | "delete";
  id?: number;
}
export const RequestDialog = ({ onClose, open, setOpen, type, id }: Params) => {
  const { user } = useAuth();

  const [request, setRequest] = useState<Requests>({
    id: 0,
    endTime: dayjs(),
    startTime: dayjs(),
    quantity: 0,
    user: user,
    resource: {
      id: 0,
      type: undefined,
    },
    createdAt: dayjs(),
    status: STATUSREQUEST.PENDING,
  });
  const [resources, setResources] = useState<Resources[]>([]);

  const fetchRequest = useCallback(async () => {
    try {
      const users = await requestApi.getRequestById(id!);
      setRequest({
        ...users,
        startTime: dayjs(users.startTime),
        endTime: dayjs(users.endTime),
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const fetchAlllResources = useCallback(async () => {
    try {
      const resource = await resourceApi.getAllResources();
      setResources(resource);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  }, []);

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      if (type === "add") {
        await requestApi.createRequest(request);
      } else if (type === "edit") {
        await requestApi.updateRequestStatus(id!, request.status);
      } else if (type === "delete") {
        await requestApi.deleteRequest(id!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRequest({
        id: 0,
        endTime: dayjs(),
        startTime: dayjs(),
        quantity: 0,
        user: user,
        resource: {
          id: 0,
          type: RESOURCETYPE.CPU,
        },
        createdAt: dayjs(),
      });
      onClose();
    }
  };
  useEffect(() => {
    if (type !== "add") {
      fetchRequest();
    }
    fetchAlllResources();
    // fetchAlllGroups();
  }, [fetchAlllResources, fetchRequest, type]);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange =
    (field: "startTime" | "endTime") => (value: Dayjs | null) => {
      if (value && dayjs(value).isValid()) {
        setRequest((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    };
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (request.quantity <= 0) newErrors.quantity = "Số lượng phải lớn hơn 0";
    if (
      !request.startTime ||
      !request.endTime ||
      dayjs(request.endTime).isBefore(request.startTime)
    ) {
      newErrors.dates = "Thời gian kết thúc phải sau thời gian bắt đầu";
    }
    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDialog-paper": { width: "600px", maxWidth: "90%" } }}
      >
        <DialogTitle>
          {type === "add"
            ? "Thêm yêu cầu mới"
            : type === "edit"
              ? "Chỉnh sửa yêu cầu"
              : "Xóa yêu cầu"}
        </DialogTitle>
        <DialogContent>
          {type === "delete" ? (
            <DialogContentText>
              Bạn có chắc chắn muốn xóa yêu cầu này không?
            </DialogContentText>
          ) : type === "add" ? (
            <>
              <TextField
                name="resourceId"
                label="Tên tài nguyên"
                value={request.resource?.id || ""} // Hiển thị id của tài nguyên
                onChange={(e) => {
                  const selectedResource = resources.find(
                    (resource) => resource.id === Number(e.target.value)
                  );
                  setRequest((prev) => ({
                    ...prev,
                    resource: {
                      id: selectedResource?.id || 0,
                      type: selectedResource?.type || RESOURCETYPE.CPU,
                    },
                  }));
                }}
                select
                fullWidth
                margin="normal"
              >
                {resources.map((resource) => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="resourceType"
                label="Loại tài nguyên"
                value={request?.resource?.type || ""}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                name="quantity"
                label="Số lượng"
                value={request?.quantity}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Thời gian bắt đầu"
                      value={request.startTime}
                      onChange={(newValue) =>
                        setRequest({ ...request, startTime: newValue })
                      }
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Thời gian kết thúc"
                      value={request.endTime}
                      onChange={(newValue) =>
                        setRequest({ ...request, endTime: newValue })
                      }
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </>
          ) : type === "edit" ? (
            <TextField
              name="status"
              label="Trạng thái"
              value={request.status || ""}
              select
              fullWidth
              margin="normal"
              onChange={(e) =>
                setRequest((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              {Object.entries(STATUSREQUEST_TRANSLATION).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            ""
          )}
          <pre>{JSON.stringify(request, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRequest({
                id: 0,
                endTime: dayjs(),
                startTime: dayjs(),
                quantity: 0,
                user: user,
                resource: {
                  id: 0,
                  type: RESOURCETYPE.CPU,
                },
                createdAt: dayjs(),
              });
              onClose();
            }}
            color="primary"
          >
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
