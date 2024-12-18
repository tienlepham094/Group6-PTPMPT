import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { RegisterParams, ResourceParams } from "../../context/types";
import resourceApi from "../../api/resource";
import { ResourceDialog } from "./ResouceDialog";

export const Resource = () => {
  const [data, setData] = useState<RegisterParams[]>([]);
  const [filteredData, setFilteredData] = useState<RegisterParams[]>([]);
  const [editData, setEditData] = useState<RegisterParams | undefined>(
    undefined
  );
  // const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAllResources = async () => {
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
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  const handleAdd = async (newResource: ResourceParams) => {
    try {
      console.log("first");

      const response = await resourceApi.create(newResource);
      console.log(response);

      // const addedResource = {
      //   id: response.resource.id!,
      //   ...newResource,
      // };
      // setData((prev) => [...prev, addedResource]);
      // setFilteredData((prev) => [...prev, addedResource]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  const handleEdit = async (updatedResource: ResourceParams) => {
    try {
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await resourceApi.delete(id);
        // setData((prev) => prev.filter((item) => item.resource_id !== id));
        // setFilteredData((prev) =>
        //   prev.filter((item) => item.resource_id !== id)
        // );
      } catch (error) {
        console.error("Error deleting resource:", error);
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
