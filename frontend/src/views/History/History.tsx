import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { Allocations } from "../../types";
import allocationApi from "../../api/allocation";

export const History = () => {
  const [allocations, setAllocations] = useState<Allocations[]>([]);
  const fetchAllGroup = useCallback(async () => {
    try {
      const allocation = await allocationApi.getAllAllocations();
      setAllocations(allocation);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchAllGroup();
  }, [fetchAllGroup]);
  const columns: GridColDef[] = [
    {
      field: "request",
      headerName: "Người yêu cầu",
      width: 150,
      valueGetter: (params) => {
        if (params !== null && params?.user.username) {
          return params?.user.username;
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "resource",
      headerName: "Tài nguyên yêu cầu",
      width: 150,
      valueGetter: (params) => {
        if (params !== null && params?.name) {
          return params?.name;
        } else {
          return "N/A";
        }
      },
    },
    { field: "resourceType", headerName: "Loại tài nguyên", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    { field: "startTime", headerName: "Thời gian bắt đầu", flex: 1 },
    { field: "endTime", headerName: "Thời gian kết thúc", flex: 1 },
    // {
    //   field: "approvedBy",
    //   headerName: "Được duyệt bởi",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     if (params !== null && params?.name) {
    //       return params?.name;
    //     } else {
    //       return "Chưa được duyệt";
    //     }
    //   },
    // },
    { field: "createdAt", headerName: "Thời gian tạo", flex: 1 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={allocations}
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
