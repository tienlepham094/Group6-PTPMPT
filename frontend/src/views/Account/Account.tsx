import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { useAuth } from "../../context/useAuth";
import groupApi from "../../api/group";
import usergroupApi from "../../api/usergroup";
import { AddMember } from "./AddMember";

interface Group {
  id: number;
  name: string;
}
interface User {
  id: number;
  email: string;
  name: string;
}
export const Account = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[] | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [users, setUsers] = useState<User[] | []>([]);
  const [idToDelete, setIdToDelete] = useState<number>(); // State for resource to delete
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<"add" | "edit" | "delete">("add");
  const fetchAllAccounts = useCallback(async () => {
    try {
      const groups = await groupApi.getAllGroup();
      setGroups(groups);
      setSelectedGroupId(groups[0].id);
      const fetchedUsers = await usergroupApi.getUsersByGroupId(groups[0].id);
      const userList = fetchedUsers.map((item: { user: User }) => item.user);
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, []);
  const handleSelectGroup = useCallback(
    async (value: number | "") => {
      try {
        if (user.role === "ADMIN") {
          const groups = await groupApi.getAllGroup();
          setGroups(groups);
        } else {
          const groups = await groupApi.getGroupsByManagerId(user.id);
          setGroups(groups);
        }
        // setSelectedGroupId(groups[0].id);
        setSelectedGroupId((value as number) || groups[0].id);
        const fetchedUsers = await usergroupApi.getUsersByGroupId(
          value as number
        );
        const userList = fetchedUsers.map((item: { user: User }) => item.user);
        setUsers(userList);
      } catch (error) {
        console.log(error);
      }
    },
    [user.id]
  );
  useEffect(() => {
    handleSelectGroup(selectedGroupId);
  }, [handleSelectGroup, selectedGroupId]);

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 2 },
    { field: "username", headerName: "Tên đăng nhập", flex: 1 },
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
            variant="contained"
            color="error"
            onClick={() => {
              setIdToDelete(params.row.id);
              setType("delete");
              setDialogOpen(true);
            }}
          >
            Xóa thành viên
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
        <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <TextField
            label="Nhóm quản lý"
            select
            value={selectedGroupId || 0}
            placeholder="Nhóm"
            onChange={(event) =>
              handleSelectGroup(event.target.value as number | "")
            }
          >
            {groups?.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ marginLeft: 2 }}
          color="primary"
          onClick={() => {
            setType("add");
            setDialogOpen(true);
          }}
        >
          Thêm thành viên
        </Button>
      </Box>
      <AddMember
        onClose={() => {
          setDialogOpen(false);
          // fetchAllAccounts();
          handleSelectGroup(selectedGroupId);
        }}
        open={dialogOpen}
        setOpen={setDialogOpen}
        type={type}
        id={idToDelete}
        groupId={selectedGroupId}
      />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
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
