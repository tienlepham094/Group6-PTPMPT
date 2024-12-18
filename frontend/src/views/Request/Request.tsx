import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { RequestParams } from "../../context/types";
import requestApi from "../../api/request";
import adminApi from "../../api/admin";
import { CustomeDialog } from "../../components/Dialog/CustomeDialog";
import { Button, Typography } from "@mui/material";

export const Request = () => {
  const [data, setData] = useState<RequestParams[]>([]);
  const [filteredData, setFilteredData] = useState<RequestParams[]>([]);
  const [editData, setEditData] = useState<RequestParams | undefined>(
    undefined
  );
  // const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const fields = [
  //   {
  //     name: "resource_type",
  //     type: "select",
  //     label: "Resource Type",
  //     options: Object.values(RESOURCETYPE),
  //   },
  //   { name: "quantity", type: "number", label: "Quantity" },
  //   { name: "reason", type: "text", label: "Reason" },
  //   { name: "timeUsage", type: "text", label: "Time Usage" },
  //   { name: "user_id", type: "number", label: "User ID" },
  //   { name: "start_time", type: "date", label: "Start Time" },
  //   { name: "end_time", type: "date", label: "End Time" },
  //   {
  //     name: "status_request",
  //     type: "select",
  //     label: "Status",
  //     options: ["Pending", "Approved", "Rejected"],
  //   },
  // ];

  const fetchAllRequests = async () => {
    try {
      const requestData = await adminApi.getAllRequest();
      const requests = (requestData.requests || []).map(
        (request: RequestParams) => ({
          ...request,
          id: request.request_id, // Ensure DataGrid has unique `id`
        })
      );
      setData(requests);
      setFilteredData(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleAdd = async (newRequest: RequestParams) => {
    try {
      const response = await requestApi.create(newRequest);
      const addedRequest = {
        id: response.request.id!,
        ...newRequest,
      };
      setData((prev) => [...prev, addedRequest]);
      setFilteredData((prev) => [...prev, addedRequest]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleEdit = async (updatedRequest: RequestParams) => {
    try {
      await requestApi.edit(updatedRequest.request_id!, updatedRequest);
      setData((prev) =>
        prev.map((item) =>
          item.request_id === updatedRequest.request_id ? updatedRequest : item
        )
      );
      setFilteredData((prev) =>
        prev.map((item) =>
          item.request_id === updatedRequest.request_id ? updatedRequest : item
        )
      );
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await requestApi.delete(id);
        setData((prev) => prev.filter((item) => item.request_id !== id));
        setFilteredData((prev) =>
          prev.filter((item) => item.request_id !== id)
        );
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const columns: GridColDef[] = [
    { field: "request_id", headerName: "Request ID", width: 150 },
    { field: "user_id", headerName: "User ID", width: 150 },
    { field: "resource_type", headerName: "Loại tài nguyên", width: 150 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "reason", headerName: "Lý do", width: 150 },
    { field: "start_time", headerName: "Gờ bắt đầu", width: 150 },
    { field: "end_time", headerName: "Giờ kết thúc", width: 150 },
    { field: "status_request", headerName: "Trạng thái", width: 150 },
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
      {/* <Typography variant="h2">Requests</Typography> */}
      {/* <h1 className="request-header">Requests</h1> */}
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
          rows={paginatedData}
          columns={columns}
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
    </div>
  );
};
