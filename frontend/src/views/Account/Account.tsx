import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import { RegisterParams } from "../../context/types";
import { EditAccount } from "./EditAccount";
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
  const { setMessage, setOpenAlert, setSeverity, user } = useAuth();
  const [groups, setGroups] = useState<Group[] | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<number>();
  const [users, setUsers] = useState<User[] | null>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Add delete dialog state
  const [userToDelete, setUserToDelete] = useState<User | null>(null); // State for resource to delete

  const [idToDelete, setIdToDelete] = useState<number>(); // State for resource to delete

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [type, setType] = useState<"add" | "edit" | "delete">("add");
  const [userId, setUserId] = useState<number>();
  const fetchAllAccounts = useCallback(async () => {
    try {
      console.log("first");

      const groups = await groupApi.getGroupsByManagerId(user.id);
      setGroups(groups);
      setSelectedGroupId(groups[0].id);
      const fetchedUsers = await usergroupApi.getUsersByGroupId(groups[0].id);
      const userList = fetchedUsers.map((item: { user: User }) => item.user);
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, [user.id]);
  const handleSelectGroup = useCallback(async (value: number | "") => {
    setSelectedGroupId(value);
    try {
      const fetchedUsers = await usergroupApi.getUsersByGroupId(
        value as number
      );
      const userList = fetchedUsers.map((item: { user: User }) => item.user);
      setUsers(userList);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchAllAccounts();
  }, [fetchAllAccounts]);

  const handleAdd = useCallback(async (newAccount: RegisterParams) => {}, []);

  const handleEdit = useCallback(
    async (updatedAccount: RegisterParams) => {},
    []
  );

  const handleRemoveFromGroup = useCallback(async () => {
    try {
      await usergroupApi.removeUserFromGroup(userToDelete?.id);
    } catch (error) {
      console.log(error);
    }
  }, [userToDelete?.id]);

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
          {/* <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // setEditData(params.row);
              setType("edit");

              setDialogOpen(true);
            }}
          >
            Chỉnh sửa
          </Button> */}
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
          onClick={() => setDialogOpen(true)}
        >
          Thêm thành viên
        </Button>
      </Box>
      <AddMember
        onClose={() => {
          console.log("first");
          fetchAllAccounts();
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
          checkboxSelection
          sx={{ border: 0 }}
          initialState={{ pagination: { paginationModel } }}
        />
      </Paper>
    </>
  );
};
