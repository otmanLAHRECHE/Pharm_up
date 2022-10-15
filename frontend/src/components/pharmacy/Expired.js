import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';



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

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';
import { addStock, addStockToArrivage, deleteStock, getAllStocks, getSelectedStock, updateStock } from '../../actions/stock_data';





const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'medic_code', headerName: 'Code PCH', width: 100, valueGetter: (params) =>
    `${params.row.medicament.medic_code || ''}`},
    { field: 'medic_name', headerName: 'Medicament', width: 400, valueGetter: (params) =>
    `${params.row.medicament.medic_name || ''}` },
    { field: 'date_arrived', headerName: 'Date d arivage', width: 140 },
    { field: 'date_expired', headerName: 'Date d expiration', width: 140 },
    { field: 'stock_qte', headerName: 'QNT', width: 150 },
  ];





export default function Expired_stock(){

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allArivage, setAllArivage] = React.useState([{"label":"Nouveau arrivage"}]);


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


        const deleteStockOpen = () =>{

            if(selectionModel.length == 0){
              setSelectionError(true);
            }else{   
              setOpenDelete(true);
            }
            
          }
    
          const deleteStockClose = () =>{
            setOpenDelete(false);
          }
    
          const deleteConfirmation = async () =>{
    
            setOpenDelete(false);
            const token = localStorage.getItem("auth_token");
            setResponse(await deleteStock(token, selectionModel[0])); 
          }


          React.useEffect(() => {

  
            if (response == "error"){
              setResponseErrorSignal(true);
            } else if(response != "") {
              setResponseSuccesSignal(true);
            }
      
          }, [response]);
    
    
          React.useEffect(() => {
    
            setLoading(true);
      
            const fetchData = async () => {
              try {
                const token = localStorage.getItem("auth_token");
                setData(await getAllStocks(token));
                setLoading(false);
              } catch (error) {
                console.log("error", error);
              }
            };
        
            fetchData();
      
          }, [response]);
    


    return(

        <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>

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
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button startIcon={<DeleteForeverIcon />} onClick={deleteStockOpen}>Supprimer de stock</Button>
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
            {selectionError ? <Alt type='error' message='Selectioner un stock' onClose={()=> setSelectionError(false)} /> : null}
          
      
        </React.Fragment>
        

        
    )







}