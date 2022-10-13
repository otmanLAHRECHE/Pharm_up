import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';

import SortieItemsTable from '../layouts/sortie_items_table';
import { getAllDestinataireForSelect } from '../../actions/fournisseur_source_data';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';
import { getSelectedStock } from '../../actions/stock_data';
import { internal_processStyles } from '@mui/styled-engine';
import { addBonSortieItem, checkBonSortieId,  deleteBonSortieItem,  getAllBonSortieItems, getSelectedBonSortieItem, updateBonSortieItem } from '../../actions/bon_sortie_data';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'bon_sortie_nbr', headerName: 'Nbr de bon', width: 100, valueGetter: (params) =>
    `${params.row.bon_sortie.bon_sortie_nbr || ''}` },
    { field: 'date', headerName: 'Date', width: 140, valueGetter: (params) =>
    `${params.row.bon_sortie.date || ''}`  },
    { field: 'source', headerName: 'Destinataire', width: 200, valueGetter: (params) =>
    `${params.row.bon_sortie.source.name || ''} ${params.row.bon_sortie.source.service || ''}` },
    { field: 'medic_name', headerName: 'Médicament', width: 200, valueGetter: (params) =>
    `${params.row.med_sortie.medicament.medic_name || ''}` },
    { field: 'date_arrived', headerName: 'Date d arrivation', width: 140, valueGetter: (params) =>
    `${params.row.med_sortie.date_arrived || ''}` },
    { field: 'date_expired', headerName: 'Date d expiration', width: 140, valueGetter: (params) =>
    `${params.row.med_sortie.date_expired || ''}` },
    { field: 'sortie_qnt', headerName: 'Qnt de sortie', width: 140, valueGetter: (params) =>
    `${params.row.sortie_qte || ''}` },
    
  ];



  export default function Bon_sortie_details(){

    
    const [dateFilter, setDateFilter] = React.useState(dayjs());
    
    const [idBonSortie, setIdBonSortie] = React.useState("");
    const [medicName, setMedicName] = React.useState(null);
    const [arivage, setArivage] = React.useState(null);
    const [qnt, setQnt] = React.useState("");

    const [idBonSortieError, setIdBonSortieError] = React.useState([false, ""]);
    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);

    const [callBack, setCallBack] = React.useState("");

    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    

    const [bonNbrError, setBonNbrError] = React.useState([false, ""]);
    const [sourceError, setSourceError] = React.useState([false, ""]);
    const [dateError, setDateError] = React.useState([false, ""]);

    const [dateFilterError, setDateFilterError] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [sortieQntError, setSortieQntError] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allSources, setAllSources] = React.useState([]);
    const [allArivage, setAllArivage] = React.useState([]);

    const [currentStockItem, setCurrentStockItem] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [dataSortie, setDataSortie] = React.useState([]);
    const [namesData, setNamesData] = React.useState([]);
    const [idChecker, setIdChecker] = React.useState("");
    const [sourceData, setSourceData] = React.useState([]);
    const [arrivageData, setArrivageData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [selectionModelItems, setSelectionModelItems] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loadingSortieItem, setLoadingSortieItem] = React.useState(false);

    const [dataError, setDataError] = React.useState(false);


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
    };

    const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);


    }

    const addBonSortieItemOpen = async () =>{

        setIdBonSortie("");
        setMedicName(null);
        setArivage(null);
        setQnt("");

        
        setIdBonSortieError([false, ""]);
        setMedicNameError([false, ""]);
        setArivageError([false, ""]);
        setQntError([false, ""]);

        const token = localStorage.getItem("auth_token");
        setNamesData(await getAllMedicNames(token));


    }

    const addBonSortieClose = () =>{
        setOpen(false);
    }

    const addBonSortieSave = async () =>{

        var test = true;

        if(idBonSortie == null || idBonSortie == ""){
            test = false;
            setIdBonSortieError([true, "ce champ est obligatoire"])
        }

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

        }


        if (test){

            if (Number(currentStockItem.stock_qte)< Number(qnt)){
                setSortieQntError(true);
            }else{
                const token = localStorage.getItem("auth_token");
                setIdChecker(await checkBonSortieId(token, Number(idBonSortie)));
            }

            

        }
    }

    const editBonSortieItemOpen = async() =>{

        if(selectionModel.length == 0){
            setSelectionError(true);
          }else{    
            const token = localStorage.getItem("auth_token");
    
            setRowData(await getSelectedBonSortieItem(token, selectionModel[0])); 
          }
        
    }

    

    const editBonSortieItemClose = () =>{
        setOpenUpdate(false);

    }

    const editBonSortieItemSave = async () =>{
        var test = true;

        setQntError([false, ""]);


        if(qnt == null || qnt == "" || qnt == "0"){
            test = false;
            setQntError([true, "champ est obligatoire"]);
        }

        if(test){

            setOpenUpdate(false);

            const data={
                "sortie_qte":qnt
            }
            const token = localStorage.getItem("auth_token");
            setResponse(await updateBonSortieItem(token, JSON.stringify(data), rowData.id));
        }


    }

    const deleteBonSortieItemOpen = () =>{
        if(selectionModel.length == 0){
            setSelectionError(true);
          }else{   
            setOpenDelete(true);
          }  
    }

    const deleteBonSortieItemClose = () =>{
        setOpenDelete(false);

    }

    const deleteConfirmation = async () =>{

        setOpenDelete(false);
        const token = localStorage.getItem("auth_token");
        setResponse(await deleteBonSortieItem(token, selectionModel[0]));

    }



    React.useEffect(() => {
        console.log(rowData);
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);

          setQnt(rowData.sortie_qte);
  
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
            console.log("inside else if ",arrivageData);
            setAllArivage(arrivageData);
          }
        }catch(e){
          console.log(e);
        }
    }, [arrivageData]);

    React.useEffect(() => {
        const upload = async (da) =>{
          const token = localStorage.getItem("auth_token");
            await addBonSortieItem(token, JSON.stringify(da));
        }
        if (idChecker == ""){

        } else{
            if(idChecker.st == true){
                const d = {
                    "id_bon_sortie":Number(idBonSortie),
                    "id_stock_med":arivage.id,
                    "sortie_qte":qnt
                };
                  upload(d);
                  setResponseSuccesSignal(true);
                

            }else{
                setDataError(true);
            }
                      
            setIdChecker("");
            setOpen(false);
           
        }
  
      }, [idChecker]);

      React.useEffect(() => {

  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);

      React.useEffect(() => {

        setLoading(true);
        setDateFilterError([false, ""]);

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var month = dateFilter.get("month")+1
            var year = dateFilter.get('year')
            setData(await getAllBonSortieItems(token, month, year));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        

        if (dateFilter.isValid() == false || dateFilter ==""){
          setDateFilterError([true, "une erreur sur le champ de date"]);
          setDateFilterNotErr(true);
        }else{
          fetchData();
        }
  
        
  
      }, [response, dateFilter]);

      React.useEffect(() =>{
          
        try{
          if (currentStockItem == "no data"){
            setResponseErrorSignal(true);
          } else if(currentStockItem != "") {
          }
        }catch(e){
          console.log(e);
        }
      }, [currentStockItem]);







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
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addBonSortieItemOpen}>Ajouter bon de sortie item</Button>
                <Button startIcon={<EditAttributesIcon />} onClick={editBonSortieItemOpen}>Modifier bon de sortie item qnt</Button>
                <Button startIcon={<DeleteForeverIcon />} onClick={deleteBonSortieItemOpen}>Supprimer bon de sortie item</Button>
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
                <DialogTitle>Ajouter un bon de sortie item</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <TextField
                                                error={idBonSortieError[0]}
                                                helperText={idBonSortieError[1]}
                                                margin="dense"
                                                id="bon_sortie_nbr"
                                                label="Id de bon sortie"
                                                fullWidth
                                                variant="standard"
                                                type="number"
                                                onChange={(event) => {setIdBonSortie(event.target.value)}}
                                        />

                                      </Grid>
                                      <Grid item xs={4}>
                                            <Autocomplete
                                                disablePortal
                                                value={medicName}
                                                onChange={async (event, newVlue) =>{
                                                    setMedicName(newVlue);

                                                    if (newVlue != null){
                                                        const token = localStorage.getItem("auth_token");
                                                        setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));
                                                    }else{
                                                        setAllArivage([]);
                                                    }                                                                                                
                                                }}
                                                id="combo-box-demo"
                                                options={allNames}
                                                renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                                helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                                required/>}
                                            /> 
                                      
                                      </Grid>

                                      <Grid item xs={4}>
                                                <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={arivage}
                                                            onChange={async (event, newVlue) =>{
                                                                setArivage(newVlue);

                                                                if(newVlue == null){
                                                                    console.log("arrivage...",newVlue);

                                                                }else{
                                                                    const token = localStorage.getItem("auth_token");
                                                                    setCurrentStockItem(await getSelectedStock(token, newVlue.id));

                                                                }                                                                

                                                            }}
                                                            options={allArivage}
                                                            renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                            helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                            required/>}
                                                        />                                                                                      
                                      </Grid>

                                      <Grid item xs={6}>
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
                    </Grid>
                  </DialogContent>
                            <DialogActions>
                              <Button onClick={addBonSortieClose}>Anuller</Button>
                              <Button onClick={addBonSortieSave}>Sauvgarder</Button>
                            </DialogActions>   

                  
          </Dialog>

          <Dialog open={openUpdate} onClose={editBonSortieItemClose}  maxWidth="lg" fullWidth={true}>
          <DialogTitle>Ajouter un bon de sortie item</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <TextField
                                                error={idBonSortieError[0]}
                                                helperText={idBonSortieError[1]}
                                                disabled={true}
                                                margin="dense"
                                                id="bon_sortie_nbr"
                                                label="Id de bon sortie"
                                                fullWidth
                                                variant="standard"
                                                type="number"
                                                onChange={(event) => {setIdBonSortie(event.target.value)}}
                                        />

                                      </Grid>
                                      <Grid item xs={4}>
                                            <Autocomplete
                                                disablePortal
                                                value={medicName}
                                                disabled={true}
                                                onChange={async (event, newVlue) =>{
                                                    setMedicName(newVlue);

                                                    if (newVlue != null){
                                                        const token = localStorage.getItem("auth_token");
                                                        setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));
                                                    }else{
                                                        setAllArivage([]);
                                                    }                                                                                                
                                                }}
                                                id="combo-box-demo"
                                                options={allNames}
                                                renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                                helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                                required/>}
                                            /> 
                                      
                                      </Grid>

                                      <Grid item xs={4}>
                                                <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={arivage}
                                                            disabled={true}
                                                            onChange={async (event, newVlue) =>{
                                                                setArivage(newVlue);

                                                                if(newVlue == null){
                                                                    console.log("arrivage...",newVlue);

                                                                }else{
                                                                    const token = localStorage.getItem("auth_token");
                                                                    setCurrentStockItem(await getSelectedStock(token, newVlue.id));

                                                                }                                                                

                                                            }}
                                                            options={allArivage}
                                                            renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                            helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                            required/>}
                                                        />                                                                                      
                                      </Grid>

                                      <Grid item xs={6}>
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
                    </Grid>
                  </DialogContent>
                            <DialogActions>
                              <Button onClick={editBonSortieItemClose}>Anuller</Button>
                              <Button onClick={editBonSortieItemSave}>Sauvgarder</Button>
                            </DialogActions> 

                  
          </Dialog>

          <Dialog open={openDelete}
                                  TransitionComponent={Transition}
                                  keepMounted
                                  onClose={deleteBonSortieItemClose}
                                  aria-describedby="alert-dialog-slide-description"
                                >
                                  <DialogTitle>{"Confirmer la suppression d'un bon de sortie Item"}</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                    Êtes-vous sûr de la décision de supprimer le bon de sortie item, la quantite de médicament sortie sur ce item sera annuler et l'etat de stock reviens a etat prévédente?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={deleteBonSortieItemClose}>Anuller</Button>
                                    <Button onClick={deleteConfirmation}>Supprimer</Button>
                                  </DialogActions>
                    </Dialog>
          
        </Container>


          {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
          {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
          {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
          {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
          {sortieQntError ? <Alt type='error' message='la quantité remplie n est pas desponible' onClose={()=> setSortieQntError(false)} /> : null}
          {dataError ? <Alt type='error' message='Invalide id de bon sortie' onClose={()=> setDataError(false)} /> : null}
          {dateFilterNotErr ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDateFilterNotErr(false)} /> : null}
        
          
      </React.Fragment>



      );










  }