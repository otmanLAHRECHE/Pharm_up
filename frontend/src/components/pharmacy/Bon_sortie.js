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
import { addBonSortie, addBonSortieItem, deleteBonSortie, getAllBonSortieOfMonth, getSelectedBonSortie, updateBonSortie } from '../../actions/bon_sortie_data';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'bon_sortie_nbr', headerName: 'Nbr de bon', width: 100},
    { field: 'source', headerName: 'Destination', width: 200, valueGetter: (params) =>
    `${params.row.source.name || ''} ${params.row.source.service || ''}` },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'sort', headerName: 'Les items de sortie',width: 640 , renderCell: (params) => (
      <SortieItemsTable rows={params.row.sortie_items_set}/>
    ),
   },
  ];

  

  
  var sortieItemsTableData = [];


  

  export default function Bon_sortie(){

    const [bonNbr, setBonNbr] = React.useState("");
    const [source, setSource] = React.useState(null);
    const [date, setDate] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState(dayjs());

    const [medicName, setMedicName] = React.useState(null);
    const [arivage, setArivage] = React.useState(null);
    const [qnt, setQnt] = React.useState("");

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

    function CustomToolbar() {
      return (
        <GridToolbarContainer>
          <GridToolbarFilterButton />
          <Button startIcon={<DeleteForeverIcon />} onClick={deleteItem}>
            Supprimer
          </Button>
        </GridToolbarContainer>
      );
    }

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

          sortieItemsTableData = [];
          setDataSortie(sortieItemsTableData);
          setBonNbr("");
          setMedicName(null);
          setArivage(null);
          setQnt("");
          setDate("");
          setSource(null);


          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setQntError([false, ""]);
          setDateError([false, ""]);
          setBonNbrError([false, ""]);
          setSourceError([false, ""]);


          const token = localStorage.getItem("auth_token");

          setSourceData(await getAllDestinataireForSelect(token));

          setNamesData(await getAllMedicNames(token));

        };

        const addBonSortieClose = () =>{
          setOpen(false);
        }



        const handleChangeDate = (newValue) =>{
          setDate(newValue);

        }

        const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

          console.log("filter date...", newValue);

        }

        const editBonSortieOpen = async () =>{
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{    
            const token = localStorage.getItem("auth_token");

            setSourceData(await getAllDestinataireForSelect(token));
    
            setRowData(await getSelectedBonSortie(token, selectionModel[0])); 
          }


        };

        const addBonSortieSave = async () =>{
          var test = true;

          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setQntError([false, ""]);
          setDateError([false, ""]);
          setBonNbrError([false, ""]);
          setSourceError([false, ""]);

          if (bonNbr == ""){
            test = false;
            setBonNbrError([true, "champ est obligatoire"]);
          }

          if(source == null || source == ""){
            test = false;
            setSourceError([true, "champ est obligatoire"]);
          }

          if(date == null || date == ""){
            test = false;
            setDateError([true, "champ est obligatoire"]);
          }else if(date.isValid() == false){
            test = false;
            setDateError([true, "date n est pas valide"]);
          }
          if(sortieItemsTableData.length == 0){
            test = false;
            setDataError(true);
          }

          if(test){
            var m = date.get('month')+1;
            const d = date.get('date') +"/"+m +"/"+date.get('year');

            const data = {
              "bon_sortie_nbr":Number(bonNbr),
              "id":source.id,
              "date":d,
            }

            const token = localStorage.getItem("auth_token");
            setCallBack(await addBonSortie(token, JSON.stringify(data)));                        

          }else{
            console.log("error");
            setLoadError(true);

          }


        }

        const addSortieIem = async () =>{
          var test = true;

          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setQntError([false, ""]);


          if(qnt == null || qnt == "" || qnt == "0"){
            test = false;
            setQntError([true, "champ est obligatoire"]);
          }

          if(medicName == null || medicName == ""){
            test = false;
            setMedicNameError([true, "champ est obligatoire"]);
          }
          if(arivage == null || arivage == ""){
            test = false;
          setArivageError([true, "champ est obligatoire"]);

          }


          if(test){
            console.log("good to go");

            if (Number(currentStockItem.stock_qte)< Number(qnt)){
                setSortieQntError(true);

            }else{
              var data = {
                "id": Math.random(),
                "id_stock": currentStockItem.id,
                "medic_name": medicName.label,
                "arrivage":arivage.label,
                "qnt":currentStockItem.stock_qte,
                "sortie_qnt":qnt,
              }
              sortieItemsTableData = Object.assign([], sortieItemsTableData);
              sortieItemsTableData.push(data);
              setDataSortie(sortieItemsTableData);
              setMedicName(null);
              setArivage(null);
              setQnt("");
              console.log(sortieItemsTableData);
            }

            


          }


        }


        React.useEffect(() => {
          console.log(rowData);
          try{
    
            if (rowData == "no data"){
              setResponseErrorSignal(true);
            } else if(rowData != "") {
      
            setOpenUpdate(true);
      
            setBonNbr(rowData.bon_sortie_nbr);
            setSource({"id":rowData.source.id, "label":rowData.source.name +" "+rowData.source.service});
            setDate(dayjs(rowData.date, 'YYYY-MM-DD'));
    
            setBonNbrError([false, ""]);
            setSourceError([false, ""]);
            setDateError([false, ""]);
    
            }
          }catch(e){
            console.log(e)
          }
    
        }, [rowData]);

        React.useEffect(() =>{
          try{
            if (sourceData == "no data"){
              setResponseErrorSignal(true);
            } else if(sourceData != "") {
              setAllSources(sourceData);
            }
          }catch(e){
            console.log(e);
          }
        }, [sourceData]);

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
            } else{
              console.log("arrivage data returned from the api...",arrivageData);
              setAllArivage(arrivageData);
            }
          }catch(e){
            console.log(e);
          }
        }, [arrivageData]);

        React.useEffect(() =>{
          
          try{
            if (currentStockItem == "no data"){
              setResponseErrorSignal(true);
            } else if(currentStockItem != "") {
              console.log(currentStockItem);
            }
          }catch(e){
            console.log(e);
          }
        }, [currentStockItem]);

        React.useEffect(() => {

          console.log(response);
    
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
              setData(await getAllBonSortieOfMonth(token, month, year));
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

        React.useEffect(() => {

          const upload = async (da) =>{
            const token = localStorage.getItem("auth_token");
              await addBonSortieItem(token, JSON.stringify(da));
          }

          const upload2 = async (da) =>{
            const token = localStorage.getItem("auth_token");           
              setResponse(await addBonSortieItem(token, JSON.stringify(da)));
          }

    
          if (callBack == ""){

          } else{

            console.log("callback..........", callBack.id_bon_sortie);
            console.log("length..........", sortieItemsTableData.length);

            for(var i=0; i<sortieItemsTableData.length; i++){

              if(i != sortieItemsTableData.length - 1){
                const d = {
                  "id_bon_sortie":Number(callBack.id_bon_sortie),
                  "id_stock_med":sortieItemsTableData[i].id_stock,
                  "sortie_qte":sortieItemsTableData[i].sortie_qnt
                };

                upload(d);

                

  
              }else{
                const d = {
                  "id_bon_sortie":Number(callBack.id_bon_sortie),
                  "id_stock_med":sortieItemsTableData[i].id_stock,
                  "sortie_qte":sortieItemsTableData[i].sortie_qnt
                };

                upload2(d);
                

              }                    
            }
            setResponseSuccesSignal(true);
            setCallBack("");
            setOpen(false);
          }
    
        }, [callBack]);


        const deleteItem = () =>{
          var index = null;
          var table = [];
          for (var i =0; i< sortieItemsTableData.length; i++){
            if (sortieItemsTableData[i].id == selectionModelItems[0]){
              index = i; 
            }else{
              table.push(sortieItemsTableData[i])
            }
          }
          if (index != null){
            sortieItemsTableData = table;
            setDataSortie(sortieItemsTableData);
          }
        }

        const deleteBonSortieOpen = () =>{

          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{   
            setOpenDelete(true);
          }
          
        }

        const deleteBonSortieClose = () =>{
          setOpenDelete(false);
        }
  
        const deleteConfirmation = async () =>{
  
          setOpenDelete(false);
          const token = localStorage.getItem("auth_token");
          setResponse(await deleteBonSortie(token, selectionModel[0])); 
        }

        const editBonSortieClose = () =>{
          setOpenUpdate(false);
        }

        const editBonSortieSave = async () =>{
          var test = true;

          setBonNbrError([false, ""]);
          setSourceError([false, ""]);
          setDateError([false, ""]);


          if (bonNbr == ""){
            test = false;
            setBonNbrError([true, "champ est obligatoire"]);
          }

          if(source == null || source == ""){
            test = false;
            setSourceError([true, "champ est obligatoire"]);
          }

          if(date == null || date == ""){
            test = false;
            setDateError([true, "champ est obligatoire"]);
          }else if(date.isValid() == false){
            test = false;
            setDateError([true, "date n est pas valide"]);
          }

          if(test){
            setOpenUpdate(false);

            var m = date.get('month')+1;
            const d = date.get('date') +"/"+m +"/"+date.get('year');

            const data = {
              "bon_sortie_nbr":Number(bonNbr),
              "id":source.id,
              "date":d,
            }

            const token = localStorage.getItem("auth_token");
            setResponse(await updateBonSortie(token, JSON.stringify(data), rowData.id)); 

          }else{
            console.log("error");
          setLoadError(true)
          }


        }


        const columnsSortie = [
          { field: 'id', headerName: 'Id', width: 60, hide: true },
          { field: 'id_stock', headerName: 'Id_stock', width: 60, hide: true },
          { field: 'id_medic', headerName: 'Id_medic', width: 60, hide: true },
          { field: 'medic_name', headerName: 'nom de medicament', width: 280},
          { field: 'arrivage', headerName: 'Arrivage', width: 220},
          { field: 'qnt', headerName: 'Qnt de stock', width: 100},
          { field: 'sortie_qnt', headerName: 'Qnt de sortie', width: 100},
         
        ];

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
                              getRowHeight={() => 'auto'}
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
                                                        
                                                    }}
                                                    options={allSources}
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
                                    <Grid item xs={12}>
                                    <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={arivage}
                                                    onChange={async (event, newVlue) =>{
                                                        setArivage(newVlue);
                                                        console.log("arrivage...",newVlue);

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
                                              Toolbar: CustomToolbar,
                                            }}
                                              rows={dataSortie}
                                              columns={columnsSortie}
                                              pageSize={15}
                                              checkboxSelection = {false}
                                              loading={loading}
                                              disableMultipleSelection={true}
                                              onSelectionModelChange={(newSelectionModel) => {
                                                setSelectionModelItems(newSelectionModel);
                                              }}
                                              selectionModel={selectionModelItems}
                                              
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

            <Dialog open={openUpdate} onClose={editBonSortieClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Editer un bon de sortie</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={bonNbrError[0]}
                                                  helperText={bonNbrError[1]}
                                                  value={bonNbr}
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
                                                        
                                                    }}
                                                    options={allSources}
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

                    </DialogContent>
                              <DialogActions>
                                <Button onClick={editBonSortieClose}>Anuller</Button>
                                <Button onClick={editBonSortieSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>

            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteBonSortieClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un bon de sortie"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le bon de sortie ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteBonSortieClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
            
          </Container>


            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
            {sortieQntError ? <Alt type='error' message='la quantité remplie n est pas desponible' onClose={()=> setSortieQntError(false)} /> : null}
            {dataError ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDataError(false)} /> : null}
            {dateFilterNotErr ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDateFilterNotErr(false)} /> : null}
          
            sortieQntError
        </React.Fragment>



        );

  }