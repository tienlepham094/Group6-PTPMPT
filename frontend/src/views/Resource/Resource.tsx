import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, MenuItem, FormControl } from "@mui/material";
import { useAuth } from "../../context/useAuth";
import resourceApi from "../../api/resource";
import { Resources } from "../../types";
import { ResourceDialog } from "./ResouceDialog";
import userresourceApi from "../../api/userresource";

export const Resource = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resources[] | null>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState<"add" | "edit" | "delete">("add");
  const [resourcetId, setResourceId] = useState<number>();
  const [resourceType, setResourceType] = useState<"group" | "personal">(
    "group"
  );
  const handleResourceTypeChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedType = event.target.value as "group" | "personal";
    setResourceType(selectedType);
    if (selectedType === "personal") {
      await fetchUserResources();
    } else {
      await fetchAllResources();
    }
  };

  const fetchAllResources = useCallback(async () => {
    try {
      const resources = await resourceApi.getAllResources();
      setResources(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }, []);
  const fetchUserResources = useCallback(async () => {
    try {
      const resources = await userresourceApi.getAllUserResources({
        userId: user.id,
      });
      setResources(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }, [user.id]);

  useEffect(() => {
    if (resourceType === "personal" || user.role === "USER") {
      fetchUserResources();
    } else {
      fetchAllResources();
    }
  }, [fetchAllResources, fetchUserResources, resourceType, user.role]);
  const columnsGroup: GridColDef[] = [
    { field: "name", headerName: "Tên tài nguyên", flex: 1 },
    { field: "description", headerName: "Mô tả", flex: 1 },
    { field: "type", headerName: "Loại", flex: 1 },
    { field: "totalQuantity", headerName: "Số lượng hiện có", flex: 1 },
    { field: "availableQuantity", headerName: "Số lượng khả dụng", flex: 1 },
    {
      field: "group",
      headerName: "Tài nguyên của nhóm",
      flex: 1,
      valueGetter: (params) => {
        if (params !== null && params?.name) {
          return params?.name;
        } else {
          return "ADMIN";
        }
      },
    },
    {
      field: "createdBy",
      headerName: "Tạo bởi",
      flex: 1,
      valueGetter: (params) => {
        if (params !== null && params?.username) {
          return params?.username;
        } else {
          return "N/A";
        }
      },
    },
    { field: "createdAt", headerName: "Ngày được tạo", flex: 1 },
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
                setResourceId(params.row.id);
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
                setResourceId(params.row.id);
                setOpenDialog(true); // Open delete confirmation dialog
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];
  const columnsPersonal: GridColDef[] = [
    { field: "resourceType", headerName: "Loại tài nguyên", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "Thao tác",
    //   width: 250,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <Box
    //         display="flex"
    //         justifyContent="space-evenly"
    //         gap={0}
    //         sx={{ alignSelf: "center" }}
    //       >
    //         <Button
    //           variant="contained"
    //           color="error"
    //           onClick={() => {
    //             setType("delete");
    //             setResourceId(params.row.id);
    //             setOpenDialog(true); // Open delete confirmation dialog
    //           }}
    //         >
    //           Giải phóng tài nguyên
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        {user.role === "USER" ? (
          ""
        ) : (
          <>
            <FormControl fullWidth sx={{ maxWidth: 250 }}>
              <TextField
                label="Nhóm quản lý"
                select
                value={resourceType}
                onChange={handleResourceTypeChange}
              >
                <MenuItem value="group">Tài nguyên nhóm</MenuItem>
                <MenuItem value="personal">Tài nguyên cá nhân</MenuItem>
              </TextField>
            </FormControl>
            <div>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
                onClick={() => {
                  setType("add");
                  setOpenDialog(true);
                }}
              >
                Thêm tài nguyên mới
              </Button>
            </div>
          </>
        )}
      </Box>
      <ResourceDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => {
          setResourceId(undefined);
          setOpenDialog(false);
          if (resourceType === "personal" || user.role === "USER") {
            fetchUserResources();
          } else {
            fetchAllResources();
          }
        }}
        type={type}
        id={resourcetId}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={resources || []}
          columns={
            resourceType === "personal" || user.role === "USER"
              ? columnsPersonal
              : columnsGroup
          }
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          initialState={{ pagination: { paginationModel } }}
        />
      </Paper>
    </>
  );
};
