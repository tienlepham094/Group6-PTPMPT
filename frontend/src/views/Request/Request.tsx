import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  DialogContentText,
  FormControl,
} from "@mui/material";
import { useAuth } from "../../context/useAuth";
import groupApi from "../../api/group";
import { Requests, Resources } from "../../types";
import requestApi from "../../api/request";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import resourceApi from "../../api/resource";
import { RESOURCETYPE } from "../../api/enum";
import dayjs, { Dayjs } from "dayjs";

export const Request = () => {
  const { user, setMessage, setOpenAlert, setSeverity } = useAuth();
  const [request, setRequest] = useState<Requests[] | null>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Add delete dialog state
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false); // Add delete dialog state
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false); // Add delete
  const [requestToDelete, setRequestToDelete] = useState<Requests | null>(null); // State for request to delete
  const [newRequest, setNewRequest] = useState<Requests>({
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
  const [resources, setResources] = useState<Resources[]>([]);

  const fetchAllRequest = useCallback(async () => {
    try {
      const request = await requestApi.getAllRequests();
      setRequest(request);
      const resource = await resourceApi.getAllResources();
      setResources(resource);
      const groups = await groupApi.getAllGroup();
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllRequest();
  }, [fetchAllRequest]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange =
    (field: "startTime" | "endTime") => (value: Dayjs | null) => {
      if (value) {
        setNewRequest((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    };
  const handleSubmit = async () => {
    try {
      const response = await requestApi.createRequest(newRequest);
      setRequest((prev) => [...(prev || []), response]);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding request:", error);
    }
  };

  const handleEdit = (request: Request) => {
    setNewRequest(request);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (requestToDelete) {
      try {
        await requestApi.deleteRequest(requestToDelete.id);
        setRequest((prev) => prev?.filter((r) => r.id !== requestToDelete.id));
        setOpenDeleteDialog(false);
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Người yêu cầu",
      width: 150,
      valueGetter: (params) => {
        if (params !== null && params?.username) {
          return params?.username;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "resource",
      headerName: "Tài nguyên yêu cầu",
      width: 150,
      valueGetter: (params) => {
        console.log(params);

        if (params !== null && params?.name) {
          return params?.name;
        } else {
          return "N/A";
        }
      },
    },
    { field: "resourceType", headerName: "Loại tài nguyên", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "startTime", headerName: "Thời gian bắt đầu", width: 150 },
    { field: "endTime", headerName: "Thời gian kết thúc", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    {
      field: "approvedBy",
      headerName: "Được duyệt bởi",
      width: 150,
      valueGetter: (params) => {
        if (params !== null && params?.name) {
          return params?.name;
        } else {
          return "Chưa được duyệt";
        }
      },
    },
    { field: "createdAt", headerName: "Thời gian tạo", width: 150 },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            gap={0}
            sx={{ alignSelf: "center" }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setRequestToDelete(params.row); // Set request to delete
                setOpenDeleteDialog(true); // Open delete confirmation dialog
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <TextField
            label="Nhóm quản lý"
            select
            // value={selectedGroupId || 0}
          >
            <MenuItem>Yêu cầu nhóm</MenuItem>
            <MenuItem>Yêu cầu cá nhân</MenuItem>
          </TextField>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          onClick={() => setOpenDialog(true)}
        >
          Thêm tài nguyên
        </Button>
      </Box>

      {/* Add/Edit Request Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {newRequest.id === 0 ? "Thêm tài nguyên mới" : "Chỉnh sửa tài nguyên"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="resourceId"
            label="Tên tài nguyên"
            value={newRequest.resource?.id || ""} // Hiển thị id của tài nguyên
            onChange={(e) => {
              const selectedResource = resources.find(
                (resource) => resource.id === Number(e.target.value)
              );
              setNewRequest((prev) => ({
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
            value={newRequest.resource?.type}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Số lượng"
            value={newRequest.quantity}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Thời gian bắt đầu"
              value={newRequest.startTime}
              onChange={handleDateChange("startTime")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Thời gian kết thúc"
              value={newRequest.endTime}
              onChange={handleDateChange("endTime")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <pre>{JSON.stringify(newRequest, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xóa tài nguyên</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài nguyên này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={request || []}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, overflow: "auto" }}
        />
      </Paper>
    </>
  );
};
