import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridRowMode, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import dayjs from 'dayjs';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';

import SortieItemsTable from '../layouts/sortie_items_table';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'bon_sortie_nbr', headerName: 'Nbr de bon', width: 100},
    { field: 'source', headerName: 'Destination', width: 200, valueGetter: (params) =>
    `${params.row.source.name || ''} ${params.row.source.service || ''}` },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'sortie_items', headerName: 'Les items de sortie', renderCell: () => (
      <SortieItemsTable rows={params.row.sortie_items}/>
    ),
   },
  ];

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  
  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
  };
  

  export default function Bon_sortie(){

    const [bonNbr, setBonNbr] = React.useState("");
    const [source, setSource] = React.useState(null);
    const [date, setDate] = React.useState("");
    

    const [bonNbrError, setBonNbrError] = React.useState([false, ""]);
    const [sourceError, setSourceError] = React.useState([false, ""]);
    const [dateError, setDateError] = React.useState([false, ""]);

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allSources, setAllSources] = React.useState([]);


    const [datePickersState,setDatePickersState] = React.useState(false);
    const [arrivageState, setArrivageState] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [namesData, setNamesData] = React.useState([]);
    const [arrivageData, setArrivageData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");

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
        const [rows, setRows] = React.useState([]);
        const [rowModesModel, setRowModesModel] = React.useState({});
      
        const handleRowEditStart = (params, event) => {
          event.defaultMuiPrevented = true;
        };
      
        const handleRowEditStop = (params, event) => {
          event.defaultMuiPrevented = true;
        };
      
        const handleEditClick = (id) => () => {
          setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        };
      
        const handleSaveClick = (id) => () => {
          setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        };
      
        const handleDeleteClick = (id) => () => {
          setRows(rows.filter((row) => row.id !== id));
        };
      
        const handleCancelClick = (id) => () => {
          setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
          });
      
          const editedRow = rows.find((row) => row.id === id);
          if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
          }
        };
      
        const processRowUpdate = (newRow) => {
          const updatedRow = { ...newRow, isNew: false };
          setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
          return updatedRow;
        };



        const addBonSortieOpen = () =>{

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

        const addBonSortieSave = async () =>{

        }

        const columnsItems = [
          { field: 'name', headerName: 'Name', width: 180, editable: true },
          { field: 'age', headerName: 'Age', type: 'number', editable: true },
          {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
          },
          {
            field: 'lastLogin',
            headerName: 'Last Login',
            type: 'dateTime',
            width: 220,
            editable: true,
          },
          {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];

              }
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];

            },
          },
        ];




        return(

          <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={6}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

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
                <ButtonGroup variant="outlined" aria-label="outlined button group" orientation="vertical">
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
                                                error={bonSortieNbrError[0]}
                                                helperText={bonSortieNbrError[1]}
                                                margin="dense"
                                                id="bon_sortie_nbr"
                                                label="Bon de sortie Nbr"
                                                fullWidth
                                                variant="standard"
                                                type="number"
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                                onChange={(event) => {setBonNbr(event.target.value)}}
                                        />

                                        </Grid>
                                        <Grid item xs={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={source}
                                                    onChange={(event, newVlue) =>{
                                                        setSource(newVlue);
                                                        console.log(newVlue.label); 
                                                        
                                                    }}
                                                    options={allArivage}
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
                                <Grid item xs={12}>  


                                </Grid>
                            </Grid> 
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addBonSortieClose}>Anuller</Button>
                                <Button onClick={addBonSortieSave}>Sauvgarder</Button>
                              </DialogActions>
            </Dialog>

            

            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteStockClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un médicament de stock"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le médicament de stock ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteStockClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
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