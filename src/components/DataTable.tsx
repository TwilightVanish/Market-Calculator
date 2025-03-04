import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomEditComponent from "./CustomEditComponent";
import {formatNumber} from "@/utils/formatNumber";
import styles from '@/app/page.module.css';
import {RowData} from "@/model/RowData";
import ImageCell from "@/components/ImageCell";

interface DataTableProps {
    rows: RowData[];
    admin: boolean;
}

export default function DataTable({ rows, admin }: DataTableProps) {
    const columns: GridColDef[] = [
        { field: "quantity", headerName: "Qty.", width: 80, flex: 1, headerClassName: "data-grid-header", valueFormatter: (value?: number) => formatNumber(value, 2) },
        { field: "name", headerName: "Name", width: 150, flex: 2, headerClassName: "data-grid-header", renderCell: (params) => <ImageCell id={params.id.valueOf().toString()} name={params.value} />},
        { field: "volume", headerName: "Volume", width: 100, flex: 1, headerClassName: "data-grid-header", valueFormatter: (value?: number) => formatNumber(value, 2) },
        { field: "sell", headerName: "Jita Sell", width: 150, flex: 1, headerClassName: "data-grid-header", valueFormatter: (value?: number) => formatNumber(value, 2) },
        { field: "buy", headerName: "Jita Buy", width: 150, flex: 1, headerClassName: "data-grid-header", valueFormatter: (value?: number) => formatNumber(value, 2) },
        {
            field: "rate",
            headerName: "Rate",
            width: 120,
            flex: 1,
            headerClassName: "data-grid-header",
            editable: admin,
            renderCell: (params) => parseInt(params.id.toString()) < 0 ? "" : params.value + "%",
            renderEditCell: (params) => <CustomEditComponent {...params} />,
        },
        { field: "price", headerName: "Price", width: 120, flex: 2, headerClassName: "data-grid-header", valueFormatter: (value?: number) => formatNumber(value, 2) }
    ];

    return (
        <DataGrid
            className={styles["data-grid"]}
            rows={rows}
            columns={columns}
            autoPageSize
            disableColumnResize={true}
            sx={{
                color: "#fff",
                boxShadow: 2,
                border: "none",
                borderColor: "#2E2E2E",
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #444",
                },
                "& .MuiTablePagination-root": {
                    color: "#fff",
                },
                "& .MuiTablePagination-actions": {
                    color: "#fff",
                },
                "& .MuiDataGrid-cell": {
                    borderTop: "1px solid #444",
                    borderBottom: "1px solid #444",
                },
                "& .MuiSvgIcon-root": {
                    color: "#fff",
                },
            }}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "")}
        />
    );
}
