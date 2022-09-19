import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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

import { getAllMedic } from '../../actions/medicament_data';

const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'medic_name', headerName: 'Médicament', width: 130 },
    { field: 'medic_code', headerName: 'Code', width: 130 },
    {
      field: 'Dose de médicament',
      headerName: 'Dose de médicament',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 140,
      valueGetter: (params) =>
        `${params.row.medic_dose || ''} ${params.row.dose_unit || ''}`,
    },
    
    { field: 'medic_type', headerName: 'Type de médicament', width: 150 },
    
    { field: 'medic_place', headerName: 'Place de médicament', width: 150 },
  ];

  const token = localStorage.getItem("auth_token");
  
  


export default function Medicaments(){

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [medicCodeError, setMedicCodeError] = React.useState([false, ""]);
    const [medicDoseError, setMedicDoseError] = React.useState([false, ""]);
    const [unitDoseError, setUnitDoseError] = React.useState([false, ""]);
    const [medicPlaceError, setMedicPlaceError] = React.useState([false, ""]);
    const [medicTypeError, setMedicTypeError] = React.useState([false, ""]);

    const [medicName, setMedicName] = React.useState("");
    const [medicCode, setMedicCode] = React.useState("");
    const [medicDose, setMedicDose] = React.useState("");
    const [unitDose, setUnitDose] = React.useState("");
    const [medicPlace, setMedicPlace] = React.useState("");
    const [medicType, setMedicType] = React.useState("");

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [unite, setUnite] = React.useState(0);
    const [type, setType] = React.useState("")


    

    const addMedicSave = async () => {

      

      console.log()

      }


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
    };
  
    const addMedicClose = () => {
      setOpen(false);
    };

    const editMedicOpen= () => {
      setOpenUpdate(true);
    };
  
    const editMedicClose = () => {
      setOpenUpdate(false);
    };

    const deleteMedic = () => {
      setOpen(true);
    };

    
  

    React.useEffect(() => {

      setLoading(true);

      const fetchData = async () => {
        try {
          setData(await getAllMedic(token));
          setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();

    }, []);

    return(

        <React.Fragment>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Grid container spacing={1.5}>
                  <Grid item xs={9}>
                    <div style={{ height: 700, width: '100%' }}>
                          <DataGrid
                              rows={data}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection
                              loading={loading}
                              disableSelectionOnClick
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
                          <ListItemButton>
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
                            onChange={(event) => {setMedicName(event.target.value)}}
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
                            error={unitDoseError[0]}
                            helperText={unitDoseError[1]}
                            margin="dense"
                            id="medic_place"
                            label="Place de médicament"
                            fullWidth
                            variant="standard"
                          />
                          
                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                <InputLabel required htmlFor="grouped-select"
                                error={medicTypeError[0]}
                                helperText={medicTypeError[1]}>Grouping</InputLabel>
                                  <Select defaultValue="" id="grouped-select" label="Type de médicament">
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
                         
        </Container>
      
        </React.Fragment>




    )
}