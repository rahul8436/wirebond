import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function SequenceTab({ sequence }) {
  const { image, isPass, data, ...otherKeys } = sequence;

  // Prepare the key-value pairs for the additional card
  const keyValuePairs = Object.entries(otherKeys);

  // Extract the keys dynamically from the first data object for DataGrid columns
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key,
    width: 150,
    sortable: true,
  }));

  // Prepare rows for DataGrid
  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: '20px' }}
    >
      {/* Left Section */}
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
              src={image}
              alt='Sequence'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 2, maxHeight: '400px', overflow: 'auto' }}>
        <Card
          sx={{
            boxShadow: 3,
            marginBottom: '10px',
            transition: 'box-shadow 0.3s',
            '&:hover': { boxShadow: 5 },
          }}
        >
          <CardContent>
            {/* <Typography variant='h6' gutterBottom>
              Settings
            </Typography> */}
            <TableContainer>
              <Table size='small'>
                <TableBody>
                  {keyValuePairs.map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell
                        sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}
                      >
                        {key}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {value.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

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

export default SequenceTab;
