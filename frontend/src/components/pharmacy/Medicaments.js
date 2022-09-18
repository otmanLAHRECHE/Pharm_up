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


    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [unite, setUnite] = React.useState(0);

    const change_dose = (event) => {
      setUnite(event.target.value);
    };

    const addMedicOpen = () => {
      setOpen(true);
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


                <Dialog open={open} onClose={addMedicClose} maxWidth="md">
                    <DialogTitle>Ajouter médicament</DialogTitle>
                        <DialogContent>
                          <TextField
                            margin="dense"
                            id="medic_name"
                            label="Nom de médicament"
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            margin="dense"
                            id="medic_code"
                            label="Code de médicament"
                            fullWidth
                            variant="standard"
                          />
                          

                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <TextField
                                    margin="dense"
                                    id="medic_dose"
                                    label="Dose de médicament"
                                    fullWidth
                                    variant="standard"
                              />

                            </Grid>
                            <Grid item xs={4}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                      <InputLabel id="demo-simple-select-standard-label">Unité de dose</InputLabel>
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
                          />
                          <TextField
                            margin="dense"
                            id="medic_type"
                            label="Type de médicament"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={addMedicClose}>Anuller</Button>
                          <Button >Sauvgarder</Button>
                        </DialogActions>
                  </Dialog>
                         
        </Container>
      
        </React.Fragment>




    )
}