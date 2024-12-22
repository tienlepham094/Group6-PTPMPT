import { useCallback, useEffect, useState } from "react";
import groupApi from "../../api/group";
import { Groups } from "../../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Paper } from "@mui/material";
import { AddGroup } from "./AddGroup";

export const Group = () => {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [openAddGroup, setOpenAddGroup] = useState<boolean>(false);
  const [type, setType] = useState<"add" | "edit" | "delete">("add");
  const [groupId, setGroupId] = useState<number>();

  const fetchAllGroup = useCallback(async () => {
    try {
      const group = await groupApi.getAllGroup();
      setGroups(group);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchAllGroup();
  }, [fetchAllGroup]);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Tên nhóm", flex: 2 },
    {
      field: "manager",
      headerName: "Chủ nhóm",
      flex: 1,

      valueGetter: (params) => {
        if (params !== null && params?.username) {
          return params?.username;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
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
              setGroupId(params.row.id);
              setOpenAddGroup(true);
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setType("delete");
              setOpenAddGroup(true);
              //   setUserToDelete(params.row.id);
              //   setOpenDeleteDialog(true);
            }}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
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
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 2 }}
          onClick={() => {
            setType("add");
            setOpenAddGroup(true);
          }}
        >
          Thêm nhóm
        </Button>
      </Box>
      <AddGroup
        open={openAddGroup}
        setOpen={setOpenAddGroup}
        type={type}
        onClose={fetchAllGroup}
        id={groupId}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={groups}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          initialState={{ pagination: { paginationModel } }}
        />
      </Paper>
    </>
  );
};
