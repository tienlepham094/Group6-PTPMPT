import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, MenuItem, FormControl } from "@mui/material";
import { Requests } from "../../types";
import requestApi from "../../api/request";
import { RequestDialog } from "./RequestDialog";
import { useAuth } from "../../context/useAuth";
import { STATUSREQUEST } from "../../api/enum";

export const Request = () => {
  const { user } = useAuth();
  const [request, setRequest] = useState<Requests[] | null>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState<"add" | "edit" | "delete">("add");
  const [requestId, setRequestId] = useState<number>(); // State for request to delete
  const fetchAllRequest = useCallback(async () => {
    try {
      const allRequest = await requestApi.getAllRequests();
      // Filter out requests with status "CANCELLED"
      const filteredRequests = allRequest.filter(
        (request: { status: string }) => request.status !== "CANCELLED"
      );
      setRequest(filteredRequests);
      console.log(filteredRequests);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  }, []);
  const fetchRequestByUserId = useCallback(async () => {
    try {
      const allRequest = await requestApi.getRequestsByUserId(user.id);
      setRequest(allRequest);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  }, [user.id]);
  useEffect(() => {
    if (user.role === "ADMIN") {
      fetchAllRequest();
    }
    if (user.role === "MANAGER") {
      fetchAllRequest();
    }
    if (user.role === "USER") {
      fetchRequestByUserId();
    }
  }, [fetchAllRequest, fetchRequestByUserId, user.role]);

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
              onClick={() => {
                setType("edit");
                setRequestId(params.row.id);
                setOpenDialog(true);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setType("delete");
                setRequestId(params.row.id);
                setOpenDialog(true);
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
        {/* <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <TextField
            label="Nhóm quản lý"
            select
            // value={selectedGroupId || 0}
          >
            <MenuItem>Yêu cầu nhóm</MenuItem>
            <MenuItem>Yêu cầu cá nhân</MenuItem>
          </TextField>
        </FormControl> */}
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 2 }}
          onClick={() => {
            setType("add");
            setOpenDialog(true);
          }}
        >
          Thêm yêu cầu
        </Button>
      </Box>

      <RequestDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => {
          console.log("first");
          if (user.role === "ADMIN") {
            fetchAllRequest();
          }
          if (user.role === "MANAGER") {
            fetchAllRequest();
          }
          if (user.role === "USER") {
            fetchRequestByUserId();
          }
          setOpenDialog(false);
        }}
        type={type}
        id={requestId}
      />

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
