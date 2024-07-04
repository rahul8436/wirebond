import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function LayoutTab({ status, imageSrc, tableData }) {
  // Transform tableData into rows and columns for DataGrid
  const columns = Object.keys(tableData[0]).map((key) => ({
    field: key,
    headerName: key,
    width: 150,
    sortable: true, // Enable sorting if needed
  }));

  const rows = tableData.map((row, index) => ({ id: index, ...row }));

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: '20px' }}
    >
      <Box sx={{ flex: 1 }}>
        <Card sx={{ boxShadow: 3, marginBottom: '10px', height: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={imageSrc}
              alt='Layout'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: 2, maxHeight: '400px', overflow: 'auto' }}>
        <Card sx={{ height: '100%', boxShadow: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick // Disable selection on row click
            sx={{
              '& .MuiDataGrid-columnHeaderCheckbox': {
                display: 'none', // Hide the checkbox column header
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                textAlign: 'center', // Center align column headers if needed
              },
              '& .MuiDataGrid-cell': {
                whiteSpace: 'nowrap',
              },
              '& .MuiDataGrid-root': {
                height: '100%',
              },
            }}
          />
        </Card>
      </Box>
    </Box>
  );
}

export default LayoutTab;
