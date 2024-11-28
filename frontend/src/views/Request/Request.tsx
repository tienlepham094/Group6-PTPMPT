import { useEffect, useState } from "react";
import { ColumnDefinitionType } from "../../components/Table/ColumnDefinitionType";
import CustomeTable from "../../components/Table/CustomeTable";
import { RequestParams } from "../../context/types";
import { CustomeDialog } from "../../components/Dialog/CustomeDialog";
import requestApi from "../../api/request";
import adminApi from "../../api/admin";

export const Request = () => {
  const [data, setData] = useState<RequestParams[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = async (newRequest: RequestParams) => {
    try {
      const response = await requestApi.create(newRequest);
      setData((prev) => [
        ...prev,
        { id: (data.length + 1).toString(), ...newRequest },
      ]);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const fetchResources = async () => {
    try {
<<<<<<< HEAD
      // const request = await adminApi.getAllRequest<RequestParams[]>();
      // setData(request.data);
=======
      const request = await adminApi.getAllRequest();
      setData(request);
>>>>>>> 91d3c5e3d66b6950f7fe4bba2537654b5e9d2da4
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  const columns: Array<ColumnDefinitionType<RequestParams>> = [
    { key: "resourceType", header: "Resource Type" },
    { key: "quantity", header: "Quantity" },
    { key: "reason", header: "Reason" },
    { key: "timeUsage", header: "Time Usage" },
    { key: "userId", header: "User ID" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div>
          <button
            onClick={() => alert("Edit functionality not implemented yet")}
          >
            Edit
          </button>
          {/* <button
            onClick={() =>
              setData((prev) => prev.filter((item) => item.id !== row.id))
            }
          >
            Delete
          </button> */}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <>
      <div>Header</div>
      <button onClick={() => setDialogOpen(true)}>Add Request</button>
      <CustomeTable data={data} columns={columns} />
      <CustomeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAdd}
      />
      <div>Footer</div>
    </>
  );
};
