import React, { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  Card,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LayoutTab from './components/LayoutTab';
import data from './service/data.json';
import SequenceTab from './components/SequenceTab';
import StatusIndicator from './components/StatusIndicator';
import axios from 'axios';

function App() {
  const [arcFileName, setArcFileName] = useState('Not selected any file');
  const [recipeFileName, setRecipeFileName] = useState('Not selected any file');
  const [arcFileSelected, setArcFileSelected] = useState(false);
  const [recipeFileSelected, setRecipeFileSelected] = useState(false);
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Sequence, 1 for Layout
  const [layoutData, setLayoutData] = useState(null);
  const [sequenceData, setSequenceData] = useState(null);
  const [arcFile, setArcFile] = useState(null); // State variable for arc file
  const [recipeFile, setRecipeFile] = useState(null); // State variable for recipe file

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : 'Not selected any file';
    if (fileType === 'arc') {
      setArcFileName(fileName);
      setArcFile(file); // Set arc file to state
      setArcFileSelected(file ? true : false);
    } else if (fileType === 'recipe') {
      setRecipeFileName(fileName);
      setRecipeFile(file); // Set recipe file to state
      setRecipeFileSelected(file ? true : false);
    }
  };

  const handleWirebondValidation = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('recipie_file', recipeFile, recipeFileName);
      formData.append('arc_file', arcFile, arcFileName);

      const response = await axios.post(
        'http://mklvmesdev01.timk.make.ti.com:8000/validate?arc_file_type=YAML',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        }
      );

      setLayoutData(response.data.layout);
      setSequenceData(response.data.sequence);
      setValidationCompleted(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    setLoading(true);
    setLayoutData(data.layout);
    setSequenceData(data.sequence);
    setTimeout(() => {
      setValidationCompleted(true);
      setLoading(false);
    }, 2000); // Simulating a delay for validation process
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          flex: '0 1 auto',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: 3,
          borderRadius: '8px',
        }}
      >
        <Typography variant='h5' gutterBottom>
          Wirebond Validation
        </Typography>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2} alignItems='center' direction='column'>
              <Grid item>
                <Button
                  variant='contained'
                  component='label'
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    width: '100%',
                    backgroundImage:
                      'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    color: 'white',
                  }}
                >
                  Upload Arc File
                  <input
                    type='file'
                    hidden
                    onChange={(e) => handleFileChange(e, 'arc')}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Typography variant='body2'>{arcFileName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2} alignItems='center' direction='column'>
              <Grid item>
                <Button
                  variant='contained'
                  component='label'
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    width: '100%',
                    backgroundImage:
                      'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                  }}
                >
                  Upload Recipe File
                  <input
                    type='file'
                    hidden
                    onChange={(e) => handleFileChange(e, 'recipe')}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Typography variant='body2'>{recipeFileName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2} alignItems='center' direction='column'>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CheckCircleIcon />}
                  onClick={handleValidation}
                  disabled={!arcFileSelected || !recipeFileSelected || loading}
                  sx={{ width: '100%' }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Validate'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {validationCompleted && (
        <Card
          sx={{
            flex: '1 1 auto',
            padding: '20px',
            boxShadow: 3,
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          <Typography variant='h6' gutterBottom>
            Validation Results
          </Typography>
          <Paper sx={{ width: '100%', marginBottom: '20px' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              <Tab label='Sequence' />
              <Tab label='Layout' />
            </Tabs>
          </Paper>
          {tabValue === 0 && (
            <Box>
              <StatusIndicator
                label='Sequence Status:'
                status={sequenceData.isPass}
              />
              <SequenceTab sequence={sequenceData} />
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <StatusIndicator
                label='Layout Status:'
                status={layoutData.isPass}
              />
              <LayoutTab
                status={layoutData.isPass}
                imageSrc={layoutData.image}
                tableData={layoutData.data}
              />
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
}

export default App;
