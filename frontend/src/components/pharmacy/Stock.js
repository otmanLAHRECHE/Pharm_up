
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';
import { addStock, addStockToArrivage, deleteStock, getAllStocks, getSelectedStock, updateStock } from '../../actions/stock_data';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'medic_code', headerName: 'Code', width: 100, valueGetter: (params) =>
    `${params.row.medicament.medic_code || ''}`},
    { field: 'medic_name', headerName: 'Medicament', width: 400, valueGetter: (params) =>
    `${params.row.medicament.medic_name || ''}` },
    { field: 'date_arrived', headerName: 'Date d arivage', width: 140 },
    { field: 'date_expired', headerName: 'Date d expiration', width: 140 },
    { field: 'stock_qte', headerName: 'QNT', width: 150 },
  ];

  

export default function Stock(){


    const [medicName, setMedicName] = React.useState(null);
    const [arivage, setArivage] = React.useState(null);
    const [dateArived, setDateArived] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [qnt, setQnt] = React.useState("");

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [dateArivedError, setDateArivedError] = React.useState([false, ""]);
    const [dateExpiredError, setDateExpiredError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);

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


      const addStockClose = () =>{
        setOpen(false);

      }

      const addStockOpen = async () =>{
      

        setMedicName(null);
        setArivage(null);
        setDateArived(null);
        setDateExpired(null);
        setQnt("");
        

        setMedicNameError([false, ""]);
        setArivageError([false, ""]);
        setDateArivedError([false, ""]);
        setDateExpiredError([false, ""]);
        setQntError([false, ""]);

        const token = localStorage.getItem("auth_token");

        setNamesData(await getAllMedicNames(token));
      }

      const addStockSave = async () =>{
        var mode = 0;
        var test = true;

        setMedicNameError([false, ""]);
        setArivageError([false, ""]);
        setDateArivedError([false, ""]);
        setDateExpiredError([false, ""]);
        setQntError([false, ""]);

        if(medicName == null || medicName == ""){
          test = false;
          setMedicNameError([true, "champ est obligatoire"]);
        }
        if(qnt == null || qnt == "" || qnt == "0"){
          test = false;
          setQntError([true, "champ est obligatoire"]);
        }
        if(arivage == null || arivage == ""){
          test = false;
          setArivageError([true, "champ est obligatoire"]);
        }else if(arivage.label == "Nouveau arrivage"){
          mode = 0;
          if(dateArived == null || dateArived == ""){
            test = false;
            setDateArivedError([true, "champ est obligatoire"]);
  
          }else if(dateArived.isValid() == false){
            test = false;
            setDateArivedError([true, "date n est pas valide"]);
  
          }
          if(dateExpired == null || dateExpired == ""){
            test = false;
            setDateExpiredError([true, "champ est obligatoire"]);
  
          }else if(dateExpired.isValid() == false){
            test = false;
            setDateExpiredError([true, "date n est pas valide"]);
  
          }
  
          if(dateArived>= dateExpired){
            setDateArivedError([true, "problem sur la date"]);
            setDateExpiredError([true, "problem sur la date"]);
            test = false
          }

        }else{
          mode = 1;

        }
        
        
        if(test){
          
          setOpen(false);

          if(mode ==0){

            var m = dateArived.get('month')+1;
            const date_a = dateArived.get('date') +"/"+m +"/"+dateArived.get('year');
            m = dateExpired.get('month')+1
            const date_e = dateExpired.get('date') +"/"+m+"/"+dateExpired.get('year');

            const data = {
              "date_arrived":date_a,
              "date_expired":date_e,
              "stock_qte":qnt,
              "id_medic": medicName.id
            }

            const token = localStorage.getItem("auth_token");
            setResponse(await addStock(token, JSON.stringify(data)));

          }else{

            const data = {
              "id_stock":arivage.id,
              "stock_qte":qnt
            }
            
            const token = localStorage.getItem("auth_token");
            setResponse(await addStockToArrivage(token, JSON.stringify(data)));

          }

        }
        else{
          console.log("error");
          setLoadError(true)
        }      
        
      }

      const handleChangeDateArived = (newValue) => {
        setDateArived(newValue);
      };

      const handleChangeDateExpired = (newValue) => {
        setDateExpired(newValue);
      };

      const editStockOpen = async () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{    
          const token = localStorage.getItem("auth_token");
  
          setRowData(await getSelectedStock(token, selectionModel[0])); 
        }

      }

      const editStockClose = () => {
        setOpenUpdate(false);
      }

      const editStockSave = async () =>{
        var test = true;

        
        setDateArivedError([false, ""]);
        setDateExpiredError([false, ""]);
        setQntError([false, ""]);

        
        if(qnt == null || qnt == "" || qnt == "0"){
          test = false;
          setQntError([true, "champ est obligatoire"]);
        }
          if(dateArived == null || dateArived == ""){
            test = false;
            setDateArivedError([true, "champ est obligatoire"]);
  
          }else if(dateArived.isValid() == false){
            test = false;
            setDateArivedError([true, "date n est pas valide"]);
  
          }
          if(dateExpired == null || dateExpired == ""){
            test = false;
            setDateExpiredError([true, "champ est obligatoire"]);
  
          }else if(dateExpired.isValid() == false){
            test = false;
            setDateExpiredError([true, "date n est pas valide"]);
  
          }
  
          if(dateArived>= dateExpired){
            setDateArivedError([true, "problem sur la date"]);
            setDateExpiredError([true, "problem sur la date"]);
            test = false
          }                
        if(test){          
          setOpenUpdate(false);
            var m = dateArived.get('month')+1;
            const date_a = dateArived.get('date') +"/"+m +"/"+dateArived.get('year');
            m = dateExpired.get('month')+1
            const date_e = dateExpired.get('date') +"/"+m+"/"+dateExpired.get('year');

            const data = {
              "date_arrived":date_a,
              "date_expired":date_e,
              "stock_qte":qnt
            }

            const token = localStorage.getItem("auth_token");
            setResponse(await updateStock(token, JSON.stringify(data), rowData.id));  
        }
        else{
          console.log("error");
          setLoadError(true);
        }

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
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);
    
          setMedicName(rowData.medicament.medic_name);
          setArrivageState(true);
          setDateArived(dayjs(rowData.date_arrived, 'YYYY-MM-DD'));
          setDateExpired(dayjs(rowData.date_expired, 'YYYY-MM-DD'));
          setQnt(rowData.stock_qte);
  
          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setDateArivedError([false, ""]);
          setDateExpiredError([false, ""]);
          setQntError([false, ""]);
  
          }
        }catch(e){
          console.log(e)
        }
  
      }, [rowData]);

      React.useEffect(() =>{
        try{
          if (namesData == "no data"){
            setResponseErrorSignal(true);
          } else if(namesData != "") {
            setAllNames(namesData);
            setOpen(true);
          }
        }catch(e){
          console.log(e);
        }
      }, [namesData]);

      React.useEffect(() =>{
        try{
          if (arrivageData == "no data"){
            setResponseErrorSignal(true);
          } else if(arrivageData != "") {
            arrivageData.push({"label":"Nouveau arrivage"})
            setAllArivage(arrivageData);
          }
        }catch(e){
          console.log(e);
        }
      }, [arrivageData]);

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
        <Button startIcon={<InventoryIcon />} onClick={addStockOpen}>Ajouter stock des médicaments</Button>
        <Button startIcon={<EditAttributesIcon />} onClick={editStockOpen}>Modifier le stock de médicament</Button>
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

            <Dialog open={open} onClose={addStockClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Ajouter un médicament au stock</DialogTitle>
                              <DialogContent>

                              
                              <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                        <Autocomplete
                                            disablePortal
                                            value={medicName}
                                            onChange={async (event, newVlue) =>{
                                                setMedicName(newVlue);
                                                console.log(newVlue.id);
                                                setAllArivage([{"label":"Nouveau arrivage"}]);
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
                                        <Grid item xs={6}>
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

                              </Grid>

                              <br></br>
                              
                              
                                

                            <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d arrivage"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled = {datePickersState}
                                                        value={dateArived}
                                                        onChange={handleChangeDateArived}
                                                        renderInput={(params) => <TextField {...params} error={dateArivedError[0]}
                                                        helperText={dateArivedError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                            

                                            </Grid>

                                            <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d expiration"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled = {datePickersState}
                                                        value={dateExpired}
                                                        onChange={handleChangeDateExpired}
                                                        renderInput={(params) => <TextField {...params} error={dateExpiredError[0]}
                                                        helperText={dateExpiredError[1]} 
                                                        required />}
                                                />
                                            </LocalizationProvider>
                                            
                                            </Grid>
                            </Grid>
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

                            
                                  
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addStockClose}>Anuller</Button>
                                <Button onClick={addStockSave}>Sauvgarder</Button>
                              </DialogActions>
            </Dialog>

            <Dialog open={openUpdate} onClose={editStockClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Editer un médicament de stock</DialogTitle>
                              <DialogContent>

                              
                              <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                        <Autocomplete
                                            disablePortal
                                            value={medicName}
                                            disabled = {arrivageState}
                                            onChange={async (event, newVlue) =>{
                                                setMedicName(newVlue);
                                                console.log(newVlue.id);
                                                setAllArivage([{"label":"Nouveau arrivage"}]);
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
                                        <Grid item xs={6}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={arivage}
                                                    disabled={arrivageState}
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

                              </Grid>

                              <br></br>
                              
                              
                                

                            <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d arrivage"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled = {datePickersState}
                                                        value={dateArived}
                                                        onChange={handleChangeDateArived}
                                                        renderInput={(params) => <TextField {...params} error={dateArivedError[0]}
                                                        helperText={dateArivedError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                            

                                            </Grid>

                                            <Grid item xs={6}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date d expiration"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled = {datePickersState}
                                                        value={dateExpired}
                                                        onChange={handleChangeDateExpired}
                                                        renderInput={(params) => <TextField {...params} error={dateExpiredError[0]}
                                                        helperText={dateExpiredError[1]} 
                                                        required />}
                                                />
                                            </LocalizationProvider>
                                            
                                            </Grid>
                            </Grid>
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

                            
                                  
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={editStockClose}>Anuller</Button>
                                <Button onClick={editStockSave}>Sauvgarder</Button>
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
            {selectionError ? <Alt type='error' message='Selectioner un stock' onClose={()=> setSelectionError(false)} /> : null}
          
      
        </React.Fragment>
      )



}