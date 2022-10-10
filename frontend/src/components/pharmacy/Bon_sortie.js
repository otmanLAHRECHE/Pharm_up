import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';

import SortieItemsTable from '../layouts/sortie_items_table';



const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'bon_sortie_nbr', headerName: 'Nbr de bon', width: 100},
    { field: 'source', headerName: 'Destination', width: 200, valueGetter: (params) =>
    `${params.row.source.name || ''} ${params.row.source.service || ''}` },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'sortie_items', headerName: 'Les items de sortie',width: 580 , renderCell: () => (
      <SortieItemsTable rows={params.row.sortie_items}/>
    ),
   },
  ];

  const columnsSortie = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'id_stock', headerName: 'Id_stock', width: 60, hide: true },
    { field: 'id_medic', headerName: 'Id_medic', width: 60, hide: true },
    { field: 'medic_name', headerName: 'nom de medicament', width: 280},
    { field: 'arrivage', headerName: 'Arrivage', width: 180},
    { field: 'qnt', headerName: 'Qnt de stock', width: 150},
    { field: 'sortie_qnt', headerName: 'Qnt de sortie', width: 150},
   
  ];


  

  export default function Bon_sortie(){

    const [bonNbr, setBonNbr] = React.useState("");
    const [source, setSource] = React.useState(null);
    const [date, setDate] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState("");

    const [medicName, setMedicName] = React.useState(null);
    const [arivage, setArivage] = React.useState(null);
    const [qnt, setQnt] = React.useState("");

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);
    

    const [bonNbrError, setBonNbrError] = React.useState([false, ""]);
    const [sourceError, setSourceError] = React.useState([false, ""]);
    const [dateError, setDateError] = React.useState([false, ""]);

    const [dateFilterError, setDateFilterError] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allSources, setAllSources] = React.useState([]);
    const [allArivage, setAllArivage] = React.useState([]);


    const [datePickersState,setDatePickersState] = React.useState(false);
    const [arrivageState, setArrivageState] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [dataSortie, setDataSortie] = React.useState([]);
    const [namesData, setNamesData] = React.useState([]);
    const [arrivageData, setArrivageData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");
    const [loadingSortieItem, setLoadingSortieItem] = React.useState(false);

    const theme = useTheme

      function Copyright(props) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/otmanLAHRECHE">
                EPSP Djanet Pharm_Up V1.0 
              </Link>{' '}
              -- created by otman LAHRECHE
              {'.'}
            </Typography>
          );
        }

        const addBonSortieOpen = async () =>{

          setOpen(true);

          setBonNbr("");
          setMedicName(null);
          setArivage(null);
          setQnt("");

          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setQntError([false, ""]);

        };

        const addBonSortieClose = () =>{
          setOpen(false);
        }

        const editBonSortieOpen = () =>{

        };

        const deleteBonSortieOpen = () =>{

        };

        const handleChangeDate = (newValue) =>{
          setDate(newValue);

        }

        const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

        }

        const addBonSortieSave = async () =>{

        }

        const editSortieItem = () =>{

        }

        const addSortieIem = () =>{

        }

        return(

          <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>

              <Grid item xs={6}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        views={['year', 'month']}
                                                        label="Selectioner le mois"
                                                        value={dateFilter}
                                                        onChange={handleChangeFilterDate}
                                                        renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                        helperText={dateFilterError[1]} 
                                                        required/>}
                                                />

              </LocalizationProvider>

              </Paper>
                
              </Grid>

              <Grid item xs={6}>

              <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                        m: 1,
                        },
                    }}
                >
                <ButtonGroup variant="outlined" aria-label="outlined primary button group" orientation="vertical">
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={addBonSortieOpen}>Ajouter bon de sortie</Button>
                  <Button startIcon={<EditAttributesIcon />} onClick={editBonSortieOpen}>Modifier bon de sortie</Button>
                  <Button startIcon={<DeleteForeverIcon />} onClick={deleteBonSortieOpen}>Supprimer bon de sortie</Button>
                </ButtonGroup>
                </Box>
                
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 700, width: '100%' }}>
                          <DataGrid
                            components={{
                              Toolbar: GridToolbar,
                            }}
                              rows={data}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection = {false}
                              loading={loading}
                              disableMultipleSelection={true}
                              onSelectionModelChange={(newSelectionModel) => {
                                setSelectionModel(newSelectionModel);
                              }}
                              selectionModel={selectionModel}
                              
                              
                          />
                    </div>   
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />

            <Dialog open={open} onClose={addBonSortieClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Ajouter un bon de sortie</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={bonNbrError[0]}
                                                  helperText={bonNbrError[1]}
                                                  margin="dense"
                                                  id="bon_sortie_nbr"
                                                  label="Bon de sortie Nbr"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  onChange={(event) => {setBonNbr(event.target.value)}}
                                          />

                                        </Grid>
                                        <Grid item xs={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    value={source}
                                                    onChange={(event, newVlue) =>{
                                                        setSource(newVlue);
                                                        console.log(newVlue.label); 
                                                        
                                                    }}
                                                    options={allSources}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params} error={sourceError[0]}
                                                    helperText={sourceError[1]} fullWidth variant="standard" label="Destination" 
                                                    required/>}
                                                />  
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date}
                                                        onChange={handleChangeDate}
                                                        renderInput={(params) => <TextField {...params} error={dateError[0]}
                                                        helperText={dateError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>

                                <Grid item xs={4}>
                                <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                
                                
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Autocomplete
                                            disablePortal
                                            value={medicName}
                                            onChange={async (event, newVlue) =>{
                                                setMedicName(newVlue);
                                                console.log(newVlue.id);

                                                const token = localStorage.getItem("auth_token");
                                                setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));
  
                                                
                                            }}
                                            id="combo-box-demo"
                                            options={allNames}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                            helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                            required/>}
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                    <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={arivage}
                                                    onChange={(event, newVlue) =>{
                                                        setArivage(newVlue);
                                                        console.log(newVlue.label); 

                                                        if(newVlue.label == "Nouveau arrivage"){
                                                          setDatePickersState(false);
                                                        }else{
                                                          setDatePickersState(true);
                                                        }
                                                        
                                                    }}
                                                    options={allArivage}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                    helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                    required/>}
                                                />  

                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                          error={qntError[0]}
                                          helperText={qntError[1]}
                                          required
                                          margin="dense"
                                          label="Qnt"
                                          fullWidth
                                          variant="standard"
                                          value = {qnt}
                                          onChange={(event) => {setQnt(event.target.value)}}
                                      />

                                    </Grid>
                                    <Grid item xs={12}>
                                    <ButtonGroup variant="text" aria-label="text button group">                                      
                                        <Button startIcon={<EditAttributesIcon />} onClick={editSortieItem}>Modifier</Button>
                                        <Button startIcon={<AddCircleOutlineIcon />} onClick={addSortieIem}>Ajouter au liste</Button>                                        
                                    </ButtonGroup>
                                    </Grid>

                                  </Grid>
                                  </Box>
                                  </Grid>  
                                <Grid item xs={8}>  
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: 400, width: '100%' }}>
                                          <DataGrid
                                            components={{
                                              Toolbar: GridToolbar,
                                            }}
                                              rows={dataSortie}
                                              columns={columnsSortie}
                                              pageSize={15}
                                              checkboxSelection = {false}
                                              loading={loading}
                                              disableMultipleSelection={true}
                                              onSelectionModelChange={(newSelectionModel) => {
                                                setSelectionModel(newSelectionModel);
                                              }}
                                              selectionModel={selectionModel}
                                              
                                          />
                                    </div>   
                                </Paper>


                                </Grid>
                            </Grid> 
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addBonSortieClose}>Anuller</Button>
                                <Button onClick={addBonSortieSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>
            
          </Container>


            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un bon de sortie' onClose={()=> setSelectionError(false)} /> : null}
          
      
        </React.Fragment>



        );

  }