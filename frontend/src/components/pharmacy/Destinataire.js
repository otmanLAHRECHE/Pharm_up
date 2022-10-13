import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';

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


import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import { addNewDestinataire,  deleteDestinataire,  getAllDestinataire,  getSelectedDestinataire,  updateDestinataire} from '../../actions/fournisseur_source_data';


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'Nom de destinataire', width: 180 },
    { field: 'service', headerName: 'Service', width: 150 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




  export default function Destinataire(){


    const [serviceService, setServiceService] = React.useState("")
    const [serviceName, setServiceName] = React.useState("")

    const [serviceServiceError, setServiceServiceError] = React.useState([false, ""]);
    const [serviceNameError, setServiceNameError] = React.useState([false, ""]);

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");



    const addServiceOpen = () =>{
        setOpen(true);
        setServiceName("");
        setServiceService("");
  
        setServiceNameError([false, ""]);
        setServiceServiceError([false, ""]);
  
    }

    const editServiceOpen = async () =>{
     
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{    
          const token = localStorage.getItem("auth_token");
  
          setRowData(await getSelectedDestinataire(token, selectionModel[0])); 
        }
  
      }


  
      const addServiceClose = () =>{
        setOpen(false);
  
      }
  
      const updateServiceClose = () =>{
        setOpenUpdate(false);
  
      }
  
      const deleteServiceOpen = () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
  
      }
  
      const deleteServiceClose = () =>{
        setOpenDelete(false);
  
      }

      const addServiceSave = async () =>{

        var test = true;
  
        setServiceNameError([false, ""])
        setServiceServiceError([false, ""])
  
  
        if (serviceName == ""){
            setServiceNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (serviceService == ""){
            setServiceServiceError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          console.log("good to go....")
          setOpen(false);
  
          const data = {
            name:serviceName,
            service:serviceService,
          }
  
          console.log("data", JSON.stringify(data));
  
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await addNewDestinataire(token, JSON.stringify(data))); 
          
        }
        else{
          setLoadError(true);
          console.log("error");
  
        }
  
      }

      const updateServiceSave = async () =>{
        var test = true;
  
        setServiceNameError([false, ""])
        setServiceServiceError([false, ""])
  
  
        if (serviceName == ""){
            setServiceNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (serviceService == ""){
            setServiceServiceError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          console.log("good to go....")
          setOpen(false);
  
          const data = {
            name:serviceName,
            service:serviceService,
          }
  
          console.log("data", JSON.stringify(data));
  
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await updateDestinataire(token, JSON.stringify(data), rowData.id)); 
  
          setOpenUpdate(false);
          
        }
        else{
          setLoadError(true);
          console.log("error");
  
        }
          
      }


      const deleteConfirmation = async () =>{

        setOpenDelete(false);
        const token = localStorage.getItem("auth_token");
        setResponse(await deleteDestinataire(token, selectionModel[0])); 
          
      }


      React.useEffect(() => {


        console.log(rowData);
  
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);
          console.log(rowData.id)
    
          setServiceName(rowData.name);
          setServiceService(rowData.service);
  
          setServiceNameError([false, ""]);
          setServiceServiceError([false, ""]);
  
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
              setData(await getAllDestinataire(token));
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
                      <Grid item xs={3}>
                         <List
                              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                              component="nav"
                              aria-labelledby="nested-list-subheader"
                              subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                  Manager les Destinataire
                                </ListSubheader>
                              }
                            >
                              <ListItemButton onClick={addServiceOpen}>
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ajouter Destinataire" />
                              </ListItemButton>
                              <ListItemButton onClick={editServiceOpen}>
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="Modifier destinataire" />
                              </ListItemButton>
                              <ListItemButton onClick={deleteServiceOpen}>
                                <ListItemIcon>
                                  <DeleteForeverIcon />
                                </ListItemIcon>
                                <ListItemText primary="Supprimer destinataire" />
                              </ListItemButton>
                            </List>
    
                      </Grid>
                    </Grid>  
    
    
                      <Dialog open={open} onClose={addServiceClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Ajouter un destinataire</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={serviceNameError[0]}
                                  helperText={serviceNameError[1]}
                                  required
                                  margin="dense"
                                  name="service_name"
                                  id="service_name"
                                  label="Nom de destinataire"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setServiceName(event.target.value)}}
                                />
                                <TextField
                                  error={serviceServiceError[0]}
                                  helperText={serviceServiceError[1]}
                                  required
                                  margin="dense"
                                  id="service_service"
                                  label="Service"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setServiceService(event.target.value)}}
                                />
                                  
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addServiceClose}>Anuller</Button>
                                <Button onClick={addServiceSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openUpdate} onClose={updateServiceClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Modifier un destinataire</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={serviceNameError[0]}
                                  helperText={serviceNameError[1]}
                                  required
                                  margin="dense"
                                  name="service_name"
                                  id="service_name"
                                  label="Nom de destinataire"
                                  fullWidth
                                  variant="standard"
                                  value={serviceName}
                                  onChange={(event) => {setServiceName(event.target.value)}}
                                />
                                <TextField
                                  error={serviceServiceError[0]}
                                  helperText={serviceServiceError[1]}
                                  required
                                  margin="dense"
                                  id="fournisseur_adress"
                                  label="Service"
                                  fullWidth
                                  variant="standard"
                                  value={serviceService}
                                  onChange={(event) => {setServiceService(event.target.value)}}
                                />
                                 
                              </DialogContent>
                              <DialogActions>
                              <Button onClick={updateServiceClose}>Anuller</Button>
                                <Button onClick={updateServiceSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteServiceClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un destinataire"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le destinataire ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteServiceClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
                             
            </Container>
    
    
            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un Destinataire' onClose={()=> setSelectionError(false)} /> : null}
          
            </React.Fragment>
    
    
        )
    




  }