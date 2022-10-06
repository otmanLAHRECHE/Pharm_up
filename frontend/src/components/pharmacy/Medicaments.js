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
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import { getAllMedic, addNewMedic, getSelectedMedic, updateMedic, deleteMedic } from '../../actions/medicament_data';
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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
    const [openDelete, setOpenDelete] = React.useState(false);
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

    const editMedicSave = async () => {

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
        setOpenUpdate(false);

        const data = {
          medic_name:medicName,
          medic_code:medicCode,
          medic_dose:medicDose,
          dose_unit:unitDose,
          medic_place:medicPlace,
          medic_type:medicType,
        }

        const token = localStorage.getItem("auth_token");
        setResponse(await updateMedic(token, JSON.stringify(data), rowData.id)); 

        setOpenUpdate(false);
        
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
          setMedicType("ALLERGOLOGIE")
        }else if (event.target.value == 2){
          setMedicType("ANESTHESIOLOGIE")
        }else if (event.target.value == 3){
          setMedicType("ANTALOGIQUES")
        }else if (event.target.value == 4){
          setMedicType("ANTI-INFLAMMATOIRES")
        }else if (event.target.value == 5){
          setMedicType("CARDIOLOGIE ET ANGEIOLOGIE")
        }else if (event.target.value == 6){
          setMedicType("DERMATOLOGIE")
        }else if (event.target.value == 7){
          setMedicType("ENDOCRINOLOGIE ET HORMONES")
        }else if (event.target.value == 8){
          setMedicType("GASTRO-ENTEROLOGIE")
        }else if (event.target.value == 9){
          setMedicType("GYNECOLOGIE")
        }else if (event.target.value == 10){
          setMedicType("HEMATOLOGIE ET HEMOSTATE")
        }else if (event.target.value == 11){
          setMedicType("HORS NOMENCLATURE")
        }else if (event.target.value == 12){
          setMedicType("INFECTIOLOGIE")
        }else if (event.target.value == 13){
          setMedicType("METABOLISME-NUTRITION-DIABETE")
        }else if (event.target.value == 14){
          setMedicType("NEUROLOGIE")
        }else if (event.target.value == 15){
          setMedicType("OPHTALMOLOGIE")
        }else if (event.target.value == 16){
          setMedicType("PARASITOLOGIE")
        }else if (event.target.value == 17){
          setMedicType("PNEUMOLOGIE")
        }else if (event.target.value == 18){
          setMedicType("PSYCHIATRIE")
        }else if (event.target.value == 19){
          setMedicType("TOXICOLOGIE")
        }else if (event.target.value == 20){
          setMedicType("UROLOGIE ET NEPHROLOGIE")
        }else if (event.target.value == 21){
          setMedicType("REACTIFS BIOCHIMIE")
        }else if (event.target.value == 22){
          setMedicType("REACTIFS SEROLOGIE")
        }else if (event.target.value == 23){
          setMedicType("CHIMIQUES")
        }else if (event.target.value == 24){
          setMedicType("REACTIFS HEMATOLOGIE")
        }else if (event.target.value == 25){
          setMedicType("DIVERS")
        }else if (event.target.value == 26){
          setMedicType("REACTIFS IMMUNOLOGIE")
        }else if (event.target.value == 27){
          setMedicType("AIGUILLES ET INSTRUMENTATIONS")
        }else if (event.target.value == 28){
          setMedicType("COLLE ET VERNIS CHIRURGICAUX")
        }else if (event.target.value == 29){
          setMedicType("CONSOMMABLES DIVERS")
        }else if (event.target.value == 30){
          setMedicType("FILMS ET PRODUITS DE DEVELOPPEMENT")
        }else if (event.target.value == 31){
          setMedicType("LIGATURES")
        }else if (event.target.value == 32){
          setMedicType("NON TISSE")
        }else if (event.target.value == 33){
          setMedicType("PANSEMENT")
        }else if (event.target.value == 34){
          setMedicType("AUTRES PRODUITS REACTIFS")
        }else if (event.target.value == 35){
          setMedicType("CONSOMMABLE DE LABORATOIRE")
        }else if (event.target.value == 36){
          setMedicType("INSTRUMENTATION")
        }else if (event.target.value == 37){
          setMedicType("DENTAIRES CHIMIQUES ET LABO")
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

    const deleteMedicOpen = () => {

      console.log(selectionError);

      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{   
        setOpenDelete(true);
      }
    };

    const deleteMedicClose = () => {
      setOpenDelete(false);
    };


    const deleteConfirmation = async () =>{

      setOpenDelete(false);
      const token = localStorage.getItem("auth_token");
      setResponse(await deleteMedic(token, selectionModel[0])); 

    };   

    React.useEffect(() => {

      console.log(rowData.medic_type);

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        console.log(rowData.id)
  
        setMedicName(rowData.medic_name);
        setMedicCode(rowData.medic_code)
        setMedicDose(rowData.medic_dose)
        setMedicPlace(rowData.medic_place)

        setMedicType(rowData.medic_type)
        
        
        if(rowData.medic_type == "ALLERGOLOGIE"){
          setTypeValue(1);
        }else if(rowData.medic_type == "ANESTHESIOLOGIE"){
          setTypeValue(2);
        }else if(rowData.medic_type == "ANTALOGIQUES"){
          setTypeValue(3);
        }else if(rowData.medic_type == "ANTI-INFLAMMATOIRES"){
          setTypeValue(4);
        }else if(rowData.medic_type == "CARDIOLOGIE ET ANGEIOLOGIE"){
          setTypeValue(5);
        }else if(rowData.medic_type == "DERMATOLOGIE"){
          setTypeValue(6);
        }else if(rowData.medic_type == "ENDOCRINOLOGIE ET HORMONES"){
          setTypeValue(7);
        }else if(rowData.medic_type == "GASTRO-ENTEROLOGIE"){
          setTypeValue(8);
        }else if(rowData.medic_type == "GYNECOLOGIE"){
          setTypeValue(9);
        }else if(rowData.medic_type == "HEMATOLOGIE ET HEMOSTATE"){
          setTypeValue(10);
        }else if(rowData.medic_type == "HORS NOMENCLATURE"){
          setTypeValue(11);
        }else if(rowData.medic_type == "INFECTIOLOGIE"){
          setTypeValue(12);
        }else if(rowData.medic_type == "METABOLISME-NUTRITION-DIABETE"){
          setTypeValue(13);
        }else if(rowData.medic_type == "NEUROLOGIE"){
          setTypeValue(14);
        }else if(rowData.medic_type == "OPHTALMOLOGIE"){
          setTypeValue(15);
        }else if(rowData.medic_type == "PARASITOLOGIE"){
          setTypeValue(16);
        }else if(rowData.medic_type == "PNEUMOLOGIE"){
          setTypeValue(17);
        }else if(rowData.medic_type == "PSYCHIATRIE"){
          setTypeValue(18);
        }else if(rowData.medic_type == "TOXICOLOGIE"){
          setTypeValue(19);
        }else if(rowData.medic_type == "UROLOGIE ET NEPHROLOGIE"){
          setTypeValue(20);
        }else if(rowData.medic_type == "REACTIFS BIOCHIMIE"){
          setTypeValue(21);
        }else if(rowData.medic_type == "REACTIFS SEROLOGIE"){
          setTypeValue(22);
        }else if(rowData.medic_type == "CHIMIQUES"){
          setTypeValue(23);
        }else if(rowData.medic_type == "REACTIFS HEMATOLOGIE"){
          setTypeValue(24);
        }else if(rowData.medic_type == "DIVERS"){
          setTypeValue(25);
        }else if(rowData.medic_type == "REACTIFS IMMUNOLOGIE"){
          setTypeValue(26);
        }else if(rowData.medic_type == "AIGUILLES ET INSTRUMENTATIONS"){
          setTypeValue(27);
        }else if(rowData.medic_type == "COLLE ET VERNIS CHIRURGICAUX"){
          setTypeValue(28);
        }else if(rowData.medic_type == "CONSOMMABLES DIVERS"){
          setTypeValue(29);
        }else if(rowData.medic_type == "FILMS ET PRODUITS DE DEVELOPPEMENT"){
          setTypeValue(30);
        }else if(rowData.medic_type == "LIGATURES"){
          setTypeValue(31);
        }else if(rowData.medic_type == "NON TISSE"){
          setTypeValue(32);
        }else if(rowData.medic_type == "PANSEMENT"){
          setTypeValue(33);
        }else if(rowData.medic_type == "AUTRES PRODUITS REACTIFS"){
          setTypeValue(34);
        }else if(rowData.medic_type == "CONSOMMABLE DE LABORATOIRE"){
          setTypeValue(35);
        }else if(rowData.medic_type == "INSTRUMENTATION"){
          setTypeValue(36);
        }else if(rowData.medic_type == "DENTAIRES CHIMIQUES ET LABO"){
          setTypeValue(37);
        }
        
        setUnitDose(rowData.dose_unit);
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
                          <ListItemButton onClick={deleteMedicOpen}>
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
                                      <ListSubheader>Medicaments</ListSubheader>
                                      <MenuItem value={1}>ALLERGOLOGIE</MenuItem>
                                      <MenuItem value={2}>ANESTHESIOLOGIE</MenuItem>
                                      <MenuItem value={3}>ANTALOGIQUES</MenuItem>
                                      <MenuItem value={4}>ANTI-INFLAMMATOIRES</MenuItem>
                                      <MenuItem value={5}>CARDIOLOGIE ET ANGEIOLOGIE</MenuItem>
                                      <MenuItem value={6}>DERMATOLOGIE</MenuItem>
                                      <MenuItem value={7}>ENDOCRINOLOGIE ET HORMONES</MenuItem>
                                      <MenuItem value={8}>GASTRO-ENTEROLOGIE</MenuItem>
                                      <MenuItem value={9}>GYNECOLOGIE</MenuItem>
                                      <MenuItem value={10}>HEMATOLOGIE ET HEMOSTATE</MenuItem>
                                      <MenuItem value={11}>HORS NOMENCLATURE</MenuItem>
                                      <MenuItem value={12}>INFECTIOLOGIE</MenuItem>
                                      <MenuItem value={13}>METABOLISME-NUTRITION-DIABETE</MenuItem>
                                      <MenuItem value={14}>NEUROLOGIE</MenuItem>
                                      <MenuItem value={15}>OPHTALMOLOGIE</MenuItem>
                                      <MenuItem value={16}>PARASITOLOGIE</MenuItem>
                                      <MenuItem value={17}>PNEUMOLOGIE</MenuItem>
                                      <MenuItem value={18}>PSYCHIATRIE</MenuItem>
                                      <MenuItem value={19}>TOXICOLOGIE</MenuItem>
                                      <MenuItem value={20}>UROLOGIE ET NEPHROLOGIE</MenuItem>
                                      <ListSubheader>Reactifs</ListSubheader>
                                      <MenuItem value={21}>REACTIFS BIOCHIMIE</MenuItem>
                                      <MenuItem value={22}>REACTIFS SEROLOGIE</MenuItem>
                                      <MenuItem value={23}>CHIMIQUES</MenuItem>
                                      <MenuItem value={24}>REACTIFS HEMATOLOGIE</MenuItem>
                                      <MenuItem value={25}>DIVERS</MenuItem>
                                      <MenuItem value={26}>REACTIFS IMMUNOLOGIE</MenuItem>
                                      
                                      <ListSubheader>Consommables</ListSubheader>
                                      <MenuItem value={27}>AIGUILLES ET INSTRUMENTATIONS</MenuItem>
                                      <MenuItem value={28}>COLLE ET VERNIS CHIRURGICAUX</MenuItem>
                                      <MenuItem value={29}>CONSOMMABLES DIVERS</MenuItem>
                                      <MenuItem value={30}>FILMS ET PRODUITS DE DEVELOPPEMENT</MenuItem>
                                      <MenuItem value={31}>LIGATURES</MenuItem>
                                      <MenuItem value={32}>NON TISSE</MenuItem>
                                      <MenuItem value={33}>PANSEMENT</MenuItem>

                                      <ListSubheader>Laboratoire</ListSubheader>
                                      <MenuItem value={34}>AUTRES PRODUITS REACTIFS</MenuItem>
                                      <MenuItem value={35}>CONSOMMABLE DE LABORATOIRE</MenuItem>
                                      <MenuItem value={36}>INSTRUMENTATION</MenuItem>

                                      <ListSubheader>Dentaire</ListSubheader>
                                      <MenuItem value={37}>DENTAIRES CHIMIQUES ET LABO</MenuItem>
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
                                    <ListSubheader>Medicaments</ListSubheader>
                                    <MenuItem value={1}>ALLERGOLOGIE</MenuItem>
                                    <MenuItem value={2}>ANESTHESIOLOGIE</MenuItem>
                                    <MenuItem value={3}>ANTALOGIQUES</MenuItem>
                                    <MenuItem value={4}>ANTI-INFLAMMATOIRES</MenuItem>
                                    <MenuItem value={5}>CARDIOLOGIE ET ANGEIOLOGIE</MenuItem>
                                    <MenuItem value={6}>DERMATOLOGIE</MenuItem>
                                    <MenuItem value={7}>ENDOCRINOLOGIE ET HORMONES</MenuItem>
                                    <MenuItem value={8}>GASTRO-ENTEROLOGIE</MenuItem>
                                    <MenuItem value={9}>GYNECOLOGIE</MenuItem>
                                    <MenuItem value={10}>HEMATOLOGIE ET HEMOSTATE</MenuItem>
                                    <MenuItem value={11}>HORS NOMENCLATURE</MenuItem>
                                    <MenuItem value={12}>INFECTIOLOGIE</MenuItem>
                                    <MenuItem value={13}>METABOLISME-NUTRITION-DIABETE</MenuItem>
                                    <MenuItem value={14}>NEUROLOGIE</MenuItem>
                                    <MenuItem value={15}>OPHTALMOLOGIE</MenuItem>
                                    <MenuItem value={16}>PARASITOLOGIE</MenuItem>
                                    <MenuItem value={17}>PNEUMOLOGIE</MenuItem>
                                    <MenuItem value={18}>PSYCHIATRIE</MenuItem>
                                    <MenuItem value={19}>TOXICOLOGIE</MenuItem>
                                    <MenuItem value={20}>UROLOGIE ET NEPHROLOGIE</MenuItem>
                                    <ListSubheader>Reactifs</ListSubheader>
                                    <MenuItem value={21}>REACTIFS BIOCHIMIE</MenuItem>
                                    <MenuItem value={22}>REACTIFS SEROLOGIE</MenuItem>
                                    <MenuItem value={23}>CHIMIQUES</MenuItem>
                                    <MenuItem value={24}>REACTIFS HEMATOLOGIE</MenuItem>
                                    <MenuItem value={25}>DIVERS</MenuItem>
                                    <MenuItem value={26}>REACTIFS IMMUNOLOGIE</MenuItem>
                                    
                                    <ListSubheader>Consommables</ListSubheader>
                                    <MenuItem value={27}>AIGUILLES ET INSTRUMENTATIONS</MenuItem>
                                    <MenuItem value={28}>COLLE ET VERNIS CHIRURGICAUX</MenuItem>
                                    <MenuItem value={29}>CONSOMMABLES DIVERS</MenuItem>
                                    <MenuItem value={30}>FILMS ET PRODUITS DE DEVELOPPEMENT</MenuItem>
                                    <MenuItem value={31}>LIGATURES</MenuItem>
                                    <MenuItem value={32}>NON TISSE</MenuItem>
                                    <MenuItem value={33}>PANSEMENT</MenuItem>

                                    <ListSubheader>Laboratoire</ListSubheader>
                                    <MenuItem value={34}>AUTRES PRODUITS REACTIFS</MenuItem>
                                    <MenuItem value={35}>CONSOMMABLE DE LABORATOIRE</MenuItem>
                                    <MenuItem value={36}>INSTRUMENTATION</MenuItem>

                                    <ListSubheader>Dentaire</ListSubheader>
                                    <MenuItem value={37}>DENTAIRES CHIMIQUES ET LABO</MenuItem>
                                  </Select>
                              </FormControl>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={editMedicClose}>Anuller</Button>
                          <Button onClick={editMedicSave}>Sauvgarder</Button>
                        </DialogActions>
                  </Dialog>


                  <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteMedicClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un médicament"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  Êtes-vous sûr de la décision de supprimer le médicament ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={deleteMedicClose}>Anuller</Button>
                                  <Button onClick={deleteConfirmation}>Supprimer</Button>
                                </DialogActions>
                  </Dialog>
                         
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='error' message='Selectioner un médicament' onClose={()=> setSelectionError(false)} /> : null}
      
        </React.Fragment>




    )
}