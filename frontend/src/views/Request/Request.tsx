import { Button, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import adminApi from "../../api/admin";
import requestApi from "../../api/request";
import { CustomeDialog } from "../../components/Dialog/CustomeDialog";
import { RequestParams } from "../../context/types";
import { useAuth } from "../../context/useAuth";
import userApi from "../../api/user";
import { ApproveDialog } from "../Approval/ApproveDialog";

export const Request = () => {
  const { user } = useAuth();
  const [data, setData] = useState<RequestParams[]>([]);
  const [editData, setEditData] = useState<RequestParams | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);

  const fetchAllRequests = useCallback(async () => {
    try {
      if (user?.role === "admin") {
        const requestData = await adminApi.getAllRequest();
        const requests = (requestData.requests || []).map(
          (request: RequestParams) => ({
            ...request,
            id: request.request_id, // Ensure DataGrid has unique `id`
          })
        );
        setData(requests);
      } else if (user?.role === "user") {
        console.log("first");

        const requestData = await userApi.getAllRequest(user.id!);
        const requests = (requestData.requests || []).map(
          (request: RequestParams) => ({
            ...request,
            id: request.requestId, // Ensure DataGrid has unique `id`
          })
        );
        setData(requests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    fetchAllRequests();
  }, [fetchAllRequests]);

  const handleAdd = async (newRequest: RequestParams) => {
    try {
      await requestApi.create(newRequest);
      fetchAllRequests(); // Refresh data after adding
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleEdit = useCallback(
    async (updatedRequest: RequestParams) => {
      try {
        await adminApi.editRequest(
          updatedRequest.requestId!,
          user?.id,
          updatedRequest
        );

        fetchAllRequests(); // Refresh data after editing
      } catch (error) {
        console.error("Error updating request:", error);
      }
    },
    [fetchAllRequests, user?.id]
  );
  const handleApprove = useCallback(
    async (
      requestId: number,
      action: "approve" | "reject" | "queue",
      comments?: string
    ) => {
      try {
        console.log(requestId, action, comments);

        await adminApi.approve(requestId, action, comments);
        fetchAllRequests(); // Refresh data after editing
        setApproveOpen(false);
      } catch (error) {
        console.error("Error updating request:", error);
      }
    },
    [fetchAllRequests]
  );

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        console.log(id);

        await adminApi.deleteRequest(id, user?.id);
        fetchAllRequests(); // Refresh data after deleting
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "request_id", headerName: "Request ID", width: 150 },
    { field: "user_id", headerName: "User ID", width: 150 },
    { field: "resource_type", headerName: "Loại tài nguyên", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "reason", headerName: "Lý do", width: 150 },
    { field: "timeUsage", headerName: "Số giờ sử dung", width: 150 },
    // { field: "start_time", headerName: "Gờ bắt đầu", width: 150 },
    // { field: "end_time", headerName: "Giờ kết thúc", width: 150 },
    { field: "status_request", headerName: "Trạng thái", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="action-btn edit-btn"
            onClick={() => {
              setEditData(params.row);
              setDialogOpen(true);
            }}
          >
            Chỉnh sửa
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => handleDelete(params.row.request_id)}
          >
            Xóa
          </button>
          <button
            className="action-btn edit-btn"
            onClick={() => {
              setEditData(params.row);
              console.log(editData);
              setApproveOpen(true);
            }}
          >
            Chấp thuận
          </button>
        </div>
      ),
    },
  ];
  const columnsUser: GridColDef[] = [
    { field: "requestId", headerName: "Request ID", width: 150 },
    { field: "user_id", headerName: "User ID", width: 150 },
    { field: "resourceType", headerName: "Loại tài nguyên", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "reason", headerName: "Lý do", width: 150 },
    { field: "timeUsage", headerName: "Số giờ sử dung", width: 150 },
    // { field: "start_time", headerName: "Gờ bắt đầu", width: 150 },
    // { field: "end_time", headerName: "Giờ kết thúc", width: 150 },
    { field: "statusRequest", headerName: "Trạng thái", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="action-btn edit-btn"
            onClick={() => {
              setEditData(params.row);
              setDialogOpen(true);
            }}
          >
            Chỉnh sửa
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => handleDelete(params.row.request_id)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="request-container" style={{ width: "95%" }}>
      <Button
        variant="contained"
        onClick={() => {
          setEditData(undefined); // Clear edit data
          setDialogOpen(true); // Open dialog for new request
        }}
        sx={{ marginBottom: 10 }}
      >
        Thêm yêu cầu
      </Button>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={user?.role === "admin" ? columns : columnsUser}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          initialState={{ pagination: { paginationModel } }}
        />
      </Paper>
      <CustomeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={editData ? handleEdit : handleAdd}
        data={editData}
      />
      <ApproveDialog
        onClose={() => setApproveOpen(false)}
        onSubmit={handleApprove}
        open={approveOpen}
        requestId={editData?.id}
      />
    </div>
  );
};
