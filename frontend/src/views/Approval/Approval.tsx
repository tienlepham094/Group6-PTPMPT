import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ApprovalParams } from "../../context/types";
import adminApi from "../../api/admin";

export const Approval = () => {
  const [data, setData] = useState<ApprovalParams[]>([]);
  const [filteredData, setFilteredData] = useState<ApprovalParams[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAllApprovals = async () => {
    try {
      const requestData = await adminApi.getAllApproval();
      const requests = (requestData.requests || []).map(
        (request: ApprovalParams) => ({
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
    fetchAllApprovals();
  }, []);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns: GridColDef[] = [
    { field: "approvalId", headerName: "Approval ID", width: 150 },
    { field: "request_id", headerName: "Id yêu cầu", width: 150 },
    { field: "admin_id", headerName: "Id người chấp thuận", width: 150 },
    { field: "comments", headerName: "Bình luận", width: 150 },
    { field: "approvedAt", headerName: "Thời gian chấp thuận", width: 150 },
    { field: "approvalStatus", headerName: "Trạng thái", width: 150 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className="request-container" style={{ width: "95%" }}>
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
    </div>
  );
};
