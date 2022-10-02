import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import { getAllMedic, addNewMedic, getSelectedMedic } from '../../actions/medicament_data';
import Alt from '../layouts/alert';

const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'medic_code', headerName: 'Code PCH', width: 100 },
    { field: 'medic_name', headerName: 'Médicament', width: 400 },
    {
      field: 'Dose de médicament',
      headerName: 'Dosage',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 140,
      valueGetter: (params) =>
        `${params.row.medic_dose || ''} ${params.row.dose_unit || ''}`,
    },
    
    { field: 'medic_type', headerName: 'Type et Classe', width: 300 },
    
    { field: 'medic_place', headerName: 'Place de médicament', width: 150 },
  ];

export default function Medicaments(){

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [medicCodeError, setMedicCodeError] = React.useState([false, ""]);
    const [medicDoseError, setMedicDoseError] = React.useState([false, ""]);
    const [unitDoseError, setUnitDoseError] = React.useState([false, ""]);
    const [medicTypeError, setMedicTypeError] = React.useState([false, ""]);

    const [medicName, setMedicName] = React.useState("");
    const [medicCode, setMedicCode] = React.useState("");
    const [medicDose, setMedicDose] = React.useState("");
    const [unitDose, setUnitDose] = React.useState("");
    const [medicPlace, setMedicPlace] = React.useState("");
    const [medicType, setMedicType] = React.useState("");
    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [unite, setUnite] = React.useState(0);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [typeValue, setTypeValue] = React.useState();
    const [rowData, setRowData] = React.useState("");
    
    

    const addMedicSave = async () => {

      var test = true;

      setMedicNameError([false, ""])
      setMedicCodeError([false, ""])
      setMedicDoseError([false, ""])
      setUnitDoseError([false, ""])
      setMedicTypeError([false, ""])


      if (medicName == ""){
        setMedicNameError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicCode == ""){
        setMedicCodeError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicDose == "" && unite!=0){
        setMedicDoseError([true, "Ce champ est obligatoire quand l'unité de dose est définé!"])
        test = false;
      }

      if (medicDose != "" && unite==0){
        setUnitDoseError([true, "Ce champ est obligatoire"])
        test = false;
      }
      if (medicType == ""){
        setMedicTypeError([true, "Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpen(false);

        const data = {
          medic_name:medicName,
          medic_code:medicCode,
          medic_dose:medicDose,
          dose_unit:unitDose,
          medic_place:medicPlace,
          medic_type:medicType,
        }

        console.log("data", JSON.stringify(data));


        const token = localStorage.getItem("auth_token");

        setResponse(await addNewMedic(token, JSON.stringify(data))); 
        
      }
      else{
        
        setLoadError(true)
        console.log("error")

      }

    };
    const change_type = (event) => {

        if (event.target.value == ""){
          setMedicType("")
        }else if (event.target.value == 1){
          setMedicType("type1")
        }else if (event.target.value == 2){
          setMedicType("type2")
        }else if (event.target.value == 3){
          setMedicType("type3")
        }else if (event.target.value == 4){
          setMedicType("type4")
        }else if (event.target.value == 5){
          setMedicType("type5")
        }else if (event.target.value == 6){
          setMedicType("type6")
        }

    };
    const change_dose = (event) => {
      setUnite(event.target.value);
      if (event.target.value == 0){
        setUnitDose("None")

      }else if (event.target.value == 1){
        setUnitDose("mg")

      }else if (event.target.value == 2){
        setUnitDose("ml")

      }else if (event.target.value == 3){
        setUnitDose("l")

      }
    };
    const addMedicOpen = () => {

      
      
      setLoadError(false)
      setOpen(true);
      setUnite(0)
      setMedicName("");
      setMedicCode("")
      setMedicDose("")
      setUnitDose("")
      setMedicPlace("")
      setMedicType("")
      setUnitDose("None")
      setMedicNameError([false, ""])
      setMedicCodeError([false, ""])
      setMedicDoseError([false, ""])
      setUnitDoseError([false, ""])
      setMedicTypeError([false, ""])
      setResponseErrorSignal(false);
      setResponseSuccesSignal(false);
    };
    const addMedicClose = () => {
      setOpen(false);
    };

    const editMedicOpen= async () => {
      
      console.log(selectionError);
      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{    
        const token = localStorage.getItem("auth_token");

        setRowData(await getSelectedMedic(token, selectionModel[0])); 
      }

    };
  
    const editMedicClose = () => {
      setOpenUpdate(false);
    };

    const deleteMedic = () => {
      setOpen(true);
    };

    React.useEffect(() => {

      console.log(selectionError);

      if (selectionError == true){
        setSelectionError(false);
      }

    }, [selectionError]);

    React.useEffect(() => {

      console.log(rowData);

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        setLoadError(false);
  
        console.log(rowData.id)
  
        setMedicName(rowData.medic_name);
        setMedicCode(rowData.medic_code)
        setMedicDose(rowData.medic_dose)
        setMedicPlace(rowData.medic_place)
        
        
        if(rowData.medic_type == "type1"){
          setTypeValue(1);
        }else if(rowData.medic_type == "type2"){
          setTypeValue(2);
        }else if(rowData.medic_type == "type3"){
          setTypeValue(3);
        }else if(rowData.medic_type == "type4"){
          setTypeValue(4);
        }else if(rowData.medic_type == "type5"){
          setTypeValue(5);
        }else if(rowData.medic_type == "type6"){
          setTypeValue(6);
        }
  
        if(rowData.dose_unit == "None"){
          setUnite(0)
        }else if(rowData.dose_unit == "ml"){
          setUnite(2)
        }else if(rowData.dose_unit == "mg"){
          setUnite(1)
        }else if(rowData.dose_unit == "l"){
          setUnite(3)
        }
  
  
        setMedicNameError([false, ""])
        setMedicCodeError([false, ""])
        setMedicDoseError([false, ""])
        setUnitDoseError([false, ""])
        setMedicTypeError([false, ""])
        setResponseErrorSignal(false);
        setResponseSuccesSignal(false);    
        }

      }catch(e){

        console.log(e)

      }

      

    }, [rowData]);
   
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

      const fetchData = async () => {
        try {
          const token = localStorage.getItem("auth_token");
          setData(await getAllMedic(token));
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

                <Grid container spacing={1.5}>
                  <Grid item xs={9}>
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
                  </Grid>
                  <Grid item xs={3}>
                     <List
                          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Manager les médicaments
                            </ListSubheader>
                          }
                        >
                          <ListItemButton onClick={addMedicOpen}>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ajouter médicament" />
                          </ListItemButton>
                          <ListItemButton onClick={editMedicOpen}>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Modifier médicament" />
                          </ListItemButton>
                          <ListItemButton>
                            <ListItemIcon>
                              <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supprimer médicament" />
                          </ListItemButton>
                        </List>

                  </Grid>
                </Grid>  


                <Dialog open={open} onClose={addMedicClose}  maxWidth="md" fullWidth={true}>
                    <DialogTitle>Ajouter médicament</DialogTitle>
                        <DialogContent>
                          <TextField
                            error={medicNameError[0]}
                            helperText={medicNameError[1]}
                            required
                            margin="dense"
                            name="medic_name"
                            id="medic_name"
                            label="Nom de médicament"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {setMedicName(event.target.value)}}
                          />
                          <TextField
                            error={medicCodeError[0]}
                            helperText={medicCodeError[1]}
                            required
                            margin="dense"
                            id="medic_code"
                            label="Code de médicament"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {setMedicCode(event.target.value)}}
                          />
                          

                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <TextField
                                    error={medicDoseError[0]}
                                    helperText={medicDoseError[1]}
                                    margin="dense"
                                    id="medic_dose"
                                    label="Dose de médicament"
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) => {setMedicDose(event.target.value)}}
                              />

                            </Grid>
                            <Grid item xs={4}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                      <InputLabel id="demo-simple-select-standard-label"
                                      error={unitDoseError[0]}
                                      helperText={unitDoseError[1]}>Unité de dose</InputLabel>
                                      <Select                            
                                          
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={unite}
                                          label="Unité de Dose"
                                          onChange={change_dose}
                                      >
                                            <MenuItem value={0}>none</MenuItem>
                                            <MenuItem value={1}>mg</MenuItem>
                                            <MenuItem value={2}>ml</MenuItem>
                                            <MenuItem value={3}>l</MenuItem>
                                      </Select>

                                   </FormControl>
                            </Grid>
                          </Grid>
                          
                          <TextField           
                            margin="dense"
                            id="medic_place"
                            label="Place de médicament"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {setMedicPlace(event.target.value)}}
                          />
                          
                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                <InputLabel required htmlFor="grouped-select"
                                error={medicTypeError[0]}
                                helperText={medicTypeError[1]}>Type de médicament</InputLabel>
                                  <Select defaultValue="" id="grouped-select" label="Type de médicament"
                                  onChange={change_type}>
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <ListSubheader>Category 1</ListSubheader>
                                    <MenuItem value={1}>Option 1</MenuItem>
                                    <MenuItem value={2}>Option 2</MenuItem>
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={3}>Option 3</MenuItem>
                                    <MenuItem value={4}>Option 4</MenuItem>
                                    
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={5}>Option 3</MenuItem>
                                    <MenuItem value={6}>Option 4</MenuItem>
                                  </Select>
                              </FormControl>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={addMedicClose}>Anuller</Button>
                          <Button onClick={addMedicSave}>Sauvgarder</Button>
                        </DialogActions>
                  </Dialog>


                  <Dialog open={openUpdate} onClose={editMedicClose}  maxWidth="md" fullWidth={true}>
                    <DialogTitle>Modifier le médicament</DialogTitle>
                        <DialogContent>
                          <TextField
                            error={medicNameError[0]}
                            helperText={medicNameError[1]}
                            required
                            margin="dense"
                            name="medic_name"
                            id="medic_name"
                            label="Nom de médicament"
                            fullWidth
                            variant="standard"
                            value={medicName}
                            onChange={(event) => {setMedicName(event.target.value)}}
                          />
                          <TextField
                            error={medicCodeError[0]}
                            helperText={medicCodeError[1]}
                            required
                            margin="dense"
                            id="medic_code"
                            label="Code de médicament"
                            fullWidth
                            variant="standard"
                            value={medicCode}
                            onChange={(event) => {setMedicCode(event.target.value)}}
                          />
                          

                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <TextField
                                    error={medicDoseError[0]}
                                    helperText={medicDoseError[1]}
                                    margin="dense"
                                    id="medic_dose"
                                    label="Dose de médicament"
                                    fullWidth
                                    variant="standard"
                                    type="number"
                                    value={medicDose}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) => {setMedicDose(event.target.value)}}
                              />

                            </Grid>
                            <Grid item xs={4}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                      <InputLabel id="demo-simple-select-standard-label"
                                      error={unitDoseError[0]}
                                      helperText={unitDoseError[1]}>Unité de dose</InputLabel>
                                      <Select                            
                                          
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={unite}
                                          label="Unité de Dose"
                                          onChange={change_dose}
                                      >
                                            <MenuItem value={0}>none</MenuItem>
                                            <MenuItem value={1}>mg</MenuItem>
                                            <MenuItem value={2}>ml</MenuItem>
                                            <MenuItem value={3}>l</MenuItem>
                                      </Select>

                                   </FormControl>
                            </Grid>
                          </Grid>
                          
                          <TextField           
                            margin="dense"
                            id="medic_place"
                            label="Place de médicament"
                            fullWidth
                            variant="standard"
                            value={medicPlace}
                            onChange={(event) => {setMedicPlace(event.target.value)}}
                          />
                          
                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                <InputLabel required htmlFor="grouped-select"
                                error={medicTypeError[0]}
                                helperText={medicTypeError[1]}>Type de médicament</InputLabel>
                                  <Select defaultValue="" id="grouped-select" label="Type de médicament"
                                  onChange={change_type}
                                  value ={typeValue}>
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <ListSubheader>Category 1</ListSubheader>
                                    <MenuItem value={1}>Option 1</MenuItem>
                                    <MenuItem value={2}>Option 2</MenuItem>
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={3}>Option 3</MenuItem>
                                    <MenuItem value={4}>Option 4</MenuItem>
                                    
                                    <ListSubheader>Category 2</ListSubheader>
                                    <MenuItem value={5}>Option 3</MenuItem>
                                    <MenuItem value={6}>Option 4</MenuItem>
                                  </Select>
                              </FormControl>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={editMedicClose}>Anuller</Button>
                          <Button onClick={addMedicSave}>Sauvgarder</Button>
                        </DialogActions>
                  </Dialog>
                         
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' /> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' /> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' /> : null}
        {selectionError ? <Alt type='error' message='Selectioner un médicament' /> : null}
      
        </React.Fragment>




    )
}