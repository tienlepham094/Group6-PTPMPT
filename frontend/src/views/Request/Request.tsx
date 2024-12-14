import { useEffect, useState } from "react";
import { ColumnDefinitionType } from "../../components/Table/ColumnDefinitionType";
import CustomeTable from "../../components/Table/CustomeTable";
import { RequestParams } from "../../context/types";
import { CustomeDialog } from "../../components/Dialog/CustomeDialog";
import requestApi from "../../api/request";
import adminApi from "../../api/admin";
import "./Request.css";

export const Request = () => {
  const [data, setData] = useState<RequestParams[]>([]);
  const [filteredData, setFilteredData] = useState<RequestParams[]>([]);
  const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAdd = async (newRequest: RequestParams) => {
    try {
      const response = await requestApi.create(newRequest);
      const newRequestData = {
        id: (data.length + 1).toString(),
        ...newRequest,
      };

      // Add the new request to the data and filteredData
      setData((prev) => {
        const updatedData = [...prev, newRequestData];
        setFilteredData(updatedData); // Update filteredData as well for immediate update in the table
        return updatedData;
      });

      // Optionally reset the search text and pagination if needed
      setSearchText("");
      setCurrentPage(1);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const fetchAllRequest = async () => {
    try {
      const requestData = await adminApi.getAllRequest();
      const requests = requestData.requests || [];
      setData(requests);
      setFilteredData(requests);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.resource_type?.toLowerCase().includes(lowerText) ||
        item.quantity?.toString().includes(lowerText) ||
        item.reason?.toLowerCase().includes(lowerText) ||
        item.user_id
    );
    console.log(filtered);

    setFilteredData(filtered);
    setCurrentPage(1);
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

  const columns: Array<ColumnDefinitionType<RequestParams>> = [
    { key: "request_id", header: "Request ID" },
    { key: "user_id", header: "User ID" },
    { key: "resource_type", header: "Resource Type" },
    { key: "quantity", header: "Quantity" },
    { key: "timeUsage", header: "Time Usage" },
    { key: "reason", header: "Reason" },
    { key: "end_time", header: "Reason" },
    { key: "start_time", header: "Reason" },
    { key: "status_request", header: "Reason" },
    { key: "created_at", header: "Reason" },
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
    <div className="request-container">
      <h1 className="request-header">Requests</h1>

      <div className="request-toolbar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by type, quantity, reason, or user ID"
          className="request-search"
        />
        <button
          className="request-add-button"
          onClick={() => setDialogOpen(true)}
        >
          Add Request
        </button>
      </div>

      <CustomeTable data={paginatedData} columns={columns} />

      <CustomeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAdd}
        editingRequestId={editingRequestId}
      />

      <div className="pagination-container">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
