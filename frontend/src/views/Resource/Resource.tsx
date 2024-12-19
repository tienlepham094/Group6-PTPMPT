import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { RegisterParams, ResourceParams } from "../../context/types";
import resourceApi from "../../api/resource";
import { ResourceDialog } from "./ResouceDialog";
import { useAuth } from "../../context/useAuth";

export const Resource = () => {
  const { setMessage, setOpenAlert, setSeverity } = useAuth();
  const [data, setData] = useState<RegisterParams[]>([]);
  const [filteredData, setFilteredData] = useState<RegisterParams[]>([]);
  const [editData, setEditData] = useState<RegisterParams | undefined>(
    undefined
  );

  // const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAllResources = useCallback(async () => {
    try {
      const resourceData = await resourceApi.getAll();
      console.log(resourceData);
      const resources = (resourceData.resources || []).map(
        (resource: RegisterParams) => ({
          ...resource,
          id: resource.resource_id, // Ensure DataGrid has unique `id`
        })
      );
      setData(resources);
      setFilteredData(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllResources();
  }, [fetchAllResources]);

  const handleAdd = useCallback(
    async (newResource: ResourceParams) => {
      try {
        const response = await resourceApi.create(newResource);
        setDialogOpen(false);
        setEditData(undefined);
        fetchAllResources();
        setMessage("Thêm thành công!");
        setSeverity("success");
        setOpenAlert(true);
      } catch (error) {
        setMessage("Thêm thất bại!");
        setSeverity("warning");
        setOpenAlert(true);
        console.error("Error creating resource:", error);
      }
    },
    [fetchAllResources, setMessage, setOpenAlert, setSeverity]
  );

  const handleEdit = useCallback(
    async (updatedResource: ResourceParams) => {
      try {
        const response = await resourceApi.edit(updatedResource);
        setDialogOpen(false);
        setEditData(undefined);
        fetchAllResources();
        setMessage("Sửa thành công!");
        setSeverity("success");
        setOpenAlert(true);
      } catch (error) {
        setMessage("Sửa thất bại!");
        setSeverity("warning");
        setOpenAlert(true);
        console.error("Error updating resource:", error);
      }
    },
    [fetchAllResources, setMessage, setOpenAlert, setSeverity]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this resource?")) {
        try {
          await resourceApi.delete(id);
          // setData((prev) => prev.filter((item) => item.resource_id !== id));
          // setFilteredData((prev) =>
          //   prev.filter((item) => item.resource_id !== id)
          // );
          fetchAllResources();
          setEditData(undefined);
          setMessage("Xóa thành công!");
          setSeverity("success");
          setOpenAlert(true);
        } catch (error) {
          setMessage("Xóa thất bại!");
          setSeverity("warning");
          setOpenAlert(true);
          console.error("Error deleting resource:", error);
        }
      }
    },
    [fetchAllResources, setMessage, setOpenAlert, setSeverity]
  );

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
    { field: "resource_id", headerName: "Id", width: 300 },
    { field: "resource_type", headerName: "Loại tài nguyên", width: 300 },
    { field: "quantity", headerName: "Số lượng", width: 300 },
    { field: "status_resources", headerName: "Trạng thái", width: 300 },
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
            onClick={() => handleDelete(params.row.resource_id)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className="resource-container" style={{ width: "95%" }}>
      {/* <Typography variant="h2">Resources</Typography> */}
      {/* <h1 className="resource-header">Resources</h1> */}
      <Button
        variant="contained"
        onClick={() => {
          setEditData(undefined); // Clear edit data
          setDialogOpen(true); // Open dialog for new resource
        }}
        sx={{ marginBottom: 10 }}
      >
        Thêm tài nguyên
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
      {dialogOpen ? (
        <ResourceDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={editData ? handleEdit : handleAdd}
          data={editData}
        />
      ) : (
        ""
      )}
    </div>
  );
};
