import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { RegisterParams } from "../../context/types";
import { EditAccount } from "./EditAccount";
import axios from "axios";
import adminApi from "../../api/admin";
import { useAuth } from "../../context/useAuth";

export const Account = () => {
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
  const fetchAllAccounts = useCallback(async () => {
    try {
      const accountData = await adminApi.getAllAccount();
      const accounts = (accountData || []).map((account: RegisterParams) => ({
        ...account,
        id: account.id, // Ensure DataGrid has unique `id`
      }));
      setData(accounts);
      setFilteredData(accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllAccounts();
  }, [fetchAllAccounts]);

  const handleAdd = useCallback(
    async (newAccount: RegisterParams) => {
      try {
        const response = await accountApi.create(newAccount);
        const addedAccount = {
          id: response.account.id!,
          ...newAccount,
        };
        setData((prev) => [...prev, addedAccount]);
        setFilteredData((prev) => [...prev, addedAccount]);
        setDialogOpen(false);
        fetchAllAccounts();
        setMessage("Thêm thành công!");
        setSeverity("success");
        setOpenAlert(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage("Thêm thất bại");
        setSeverity("error");
        setOpenAlert(true);
      }
    },
    [fetchAllAccounts, setMessage, setOpenAlert, setSeverity]
  );

  const handleEdit = useCallback(
    async (updatedAccount: RegisterParams) => {
      try {
        await accountApi.edit(updatedAccount.account_id!, updatedAccount);
        setDialogOpen(false);
        fetchAllAccounts();
        setMessage("Sửa thất bại");
        setSeverity("success");
        setOpenAlert(true);
      } catch (error) {
        console.error("Error updating account:", error);
        setMessage("Sửa thất bại");
        setSeverity("error");
        setOpenAlert(true);
      }
    },
    [fetchAllAccounts, setMessage, setOpenAlert, setSeverity]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this account?")) {
        try {
          await accountApi.delete(id);
          // setData((prev) => prev.filter((item) => item.account_id !== id));
          fetchAllAccounts();
          setMessage("Xóa thành công");
          setSeverity("success");
          setOpenAlert(true);
        } catch (error) {
          console.error("Error deleting account:", error);
          setMessage("Xóa thất bại");
          setSeverity("error");
          setOpenAlert(true);
        }
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
    { field: "email", headerName: "Email", width: 300 },
    { field: "username", headerName: "Tên đăng nhập", width: 300 },
    { field: "password", headerName: "Mật khẩu", width: 300 },
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
            onClick={() => handleDelete(params.row.account_id)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className="account-container" style={{ width: "95%" }}>
      {/* <Typography variant="h2">Accounts</Typography> */}
      {/* <h1 className="account-header">Accounts</h1> */}
      <Button
        variant="contained"
        onClick={() => {
          setEditData(undefined); // Clear edit data
          setDialogOpen(true); // Open dialog for new account
        }}
        sx={{ marginBottom: 10 }}
      >
        Thêm tài khoản
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
      <EditAccount
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={editData ? handleEdit : handleAdd}
        data={editData}
      />
    </div>
  );
};
