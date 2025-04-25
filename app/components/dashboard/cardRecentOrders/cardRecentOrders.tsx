"use client";
import rows from "@app/placeholders/recentOrders.json";
import { Box, Card, CardContent, CardHeader, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "trackingNo", headerName: "Tracking No.", width: 130 },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 180,
    editable: false,
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 150,
    editable: false,
  },
  {
    field: "totalItems",
    headerName: "Total Items",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    type: "number",
    width: 130,
    editable: false,
    valueFormatter: (param) => {
      const value = param as number; // Explicitly cast the value to `number`
      return `$${value.toFixed(2)}`; // Format as currency
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Chip
        sx={{ opacity: 0.75 }}
        label={params.value}
        variant="filled"
        color={
          params.value === "Delivered"
            ? "success"
            : params.value === "Pending"
            ? "warning"
            : params.value === "Shipped"
            ? "info"
            : "error"
        }
        size="small"
      />
    ),
  },
];

export default function CardRecentOrders() {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          color: "textSecondary",
          variant: "h6",
          component: "h6",
        }}
        title="Recent Orders"
      />
      <CardContent>
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={rows.map((row, index) => ({
              id: index,
              ...row,
            }))}
            columns={columns.map((col) => ({
              ...col,
              flex: 1, // Dynamically adjust width based on available space
              minWidth: 100, // Optional: Set a minimum width to ensure readability
            }))}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: "orderDate", sort: "desc" }],
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            density="standard"
            disableRowSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>
  );
}
