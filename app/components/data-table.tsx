import {DataGrid} from '@mui/x-data-grid';

export default function DataTable({columns, rows}) {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 50,
                    },
                },
            }}
            pageSizeOptions={[50, 100]}
            disableRowSelectionOnClick
            disableColumnMenu
        />
    );
}
