import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { RegisterParams } from "../../context/types";
import { EditAccount } from "./EditAccount";
import { useAuth } from "../../context/useAuth";
import groupApi from "../../api/group";
import usergroupApi from "../../api/usergroup";

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
  const { setMessage, setOpenAlert, setSeverity } = useAuth();
  const [filteredData, setFilteredData] = useState<RegisterParams[]>([]);
  const [editData, setEditData] = useState<RegisterParams | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[] | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<number | "">("");
  const [users, setUsers] = useState<User[] | null>();
  const fetchAllAccounts = useCallback(async () => {
    try {
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

  const handleAdd = useCallback(
    async (newAccount: RegisterParams) => {
      // try {
      //   const response = await accountApi.create(newAccount);
      //   const addedAccount = {
      //     id: response.account.id!,
      //     ...newAccount,
      //   };
      //   setData((prev) => [...prev, addedAccount]);
      //   setFilteredData((prev) => [...prev, addedAccount]);
      //   setDialogOpen(false);
      //   fetchAllAccounts();
      //   setMessage("Thêm thành công!");
      //   setSeverity("success");
      //   setOpenAlert(true);
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // } catch (error) {
      //   setMessage("Thêm thất bại");
      //   setSeverity("error");
      //   setOpenAlert(true);
      // }
    },
    [fetchAllAccounts, setMessage, setOpenAlert, setSeverity]
  );

  const handleEdit = useCallback(
    async (updatedAccount: RegisterParams) => {
      // try {
      //   await accountApi.edit(updatedAccount.account_id!, updatedAccount);
      //   setDialogOpen(false);
      //   fetchAllAccounts();
      //   setMessage("Sửa thất bại");
      //   setSeverity("success");
      //   setOpenAlert(true);
      // } catch (error) {
      //   console.error("Error updating account:", error);
      //   setMessage("Sửa thất bại");
      //   setSeverity("error");
      //   setOpenAlert(true);
      // }
    },
    [fetchAllAccounts, setMessage, setOpenAlert, setSeverity]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this account?")) {
        // try {
        //   await accountApi.delete(id);
        //   // setData((prev) => prev.filter((item) => item.account_id !== id));
        //   fetchAllAccounts();
        //   setMessage("Xóa thành công");
        //   setSeverity("success");
        //   setOpenAlert(true);
        // } catch (error) {
        //   console.error("Error deleting account:", error);
        //   setMessage("Xóa thất bại");
        //   setSeverity("error");
        //   setOpenAlert(true);
        // }
      }
    },
    [fetchAllAccounts, setMessage, setOpenAlert, setSeverity]
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
    { field: "email", headerName: "Email", flex: 2 },
    { field: "name", headerName: "Tên đăng nhập", flex: 1 },
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
              setEditData(params.row);
              setDialogOpen(true);
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
                // handleDelete(params.row.id);
              }
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
          variant="contained"
          onClick={() => {
            setEditData(undefined); // Clear edit data
            setDialogOpen(true); // Open dialog for new account
          }}
          sx={{ marginLeft: 2 }}
        >
          Thêm tài khoản
        </Button>
      </Box>
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
      <EditAccount
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={editData ? handleEdit : handleAdd}
        data={editData}
      />
    </>
  );
};
