import { useEffect, useState } from "react";
import { CustomeDialog } from "../../components/Dialog/CustomeDialog";
import CustomeTable from "../../components/Table/CustomeTable";
import { RequestParams, ResourceParams } from "../../context/types";
import { ColumnDefinitionType } from "../../components/Table/ColumnDefinitionType";

export const Resource = () => {
  const [data, setData] = useState<ResourceParams[]>([]);
  const [filteredData, setFilteredData] = useState<ResourceParams[]>([]);
  const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleAdd = async (newRequest: RequestParams) => {
    try {
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const fetchAllRequest = async () => {
    try {
      // const requestData = await adminApi.getAllRequest();
      // const requests = requestData.requests || [];
      // setData(requests);
      // setFilteredData(requests);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  const handleSearch = (text: string) => {};

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

  const columns: Array<ColumnDefinitionType<ResourceParams>> = [
    { key: "allocations", header: "Resource Type" },
    { key: "quantity", header: "Resource Type" },
    { key: "resourceId", header: "Resource Type" },
    { key: "resourceType", header: "Resource Type" },
    { key: "statusResources", header: "Resource Type" },
    { key: "timeUsage", header: "Resource Type" },
    { key: "user_id", header: "Resource Type" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setEditingRequestId(row.id); // Set the ID of the request being edited
              setDialogOpen(true); // Open the dialog to edit
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllRequest();
  }, []);

  return (
    <div className="resource-container">
      <h1 className="resource-header">resources</h1>

      <div className="resource-toolbar">
        <input
          type="text"
          // value={searchText}
          // onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by type, quantity, reason, or user ID"
          className="resource-search"
        />
        <button
          className="resource-add-button"
          // onClick={() => setDialogOpen(true)}
        >
          Add resource
        </button>
      </div>

      <CustomeTable data={paginatedData} columns={columns} />

      {/* <CustomeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={}
        editingresourceId={editingresourceId}
      /> */}

      <div className="pagination-container">
        <button
          className="pagination-button"
          // disabled={currentPage === 1}
          // onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="pagination-info">
          {/* Page {currentPage} of {totalPages} */}
        </span>
        <button
          className="pagination-button"
          // disabled={currentPage === totalPages}
          // onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
