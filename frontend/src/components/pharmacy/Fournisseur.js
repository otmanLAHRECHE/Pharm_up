
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


import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import { addNewFournisseur, deleteFournisseur, getAllFournisseur, getSelectedFournisseeur, updateFournisseur } from '../../actions/fournisseur_source_data';


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'Fournisseur', width: 180 },
    { field: 'address', headerName: 'Adress', width: 150 },
    { field: 'email_adress', headerName: 'Email', width: 230 },
    { field: 'phone_nbr', headerName: 'Numero de telephone', width: 150 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });





export default function Fournisseur(){



    const [fournisseurName, setFournisseurName] = React.useState("")
    const [fournisseurAdress, setFournisseurAdress] = React.useState("")
    const [fournisseurEmailAdr, setFournisseurEmailAdr] = React.useState("")
    const [fournisseurPhone, setFournisseurPhone] = React.useState("")

    const [fournisseurNameError, setFournisseurNameError] = React.useState([false, ""]);
    const [fournisseurAdressError, setFournisseurAdressError] = React.useState([false, ""]);
    const [fournisseurEmailAdrError, setFournisseurEmailAdrError] = React.useState([false, ""]);
    const [fournisseurPhoneError, setFournisseurPhoneError] = React.useState([false, ""]);

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




    const addFournisseurOpen = () =>{
      setOpen(true);
      setFournisseurName("");
      setFournisseurAdress("")
      setFournisseurEmailAdr("")
      setFournisseurPhone("")

      setFournisseurNameError([false, ""])
      setFournisseurAdressError([false, ""])
      setFournisseurEmailAdrError([false, ""])
      setFournisseurPhoneError([false, ""])

    }

    const editFournisseurOpen = async () =>{
     


      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{    
        const token = localStorage.getItem("auth_token");

        setRowData(await getSelectedFournisseeur(token, selectionModel[0])); 
      }

    }

    const addFournClose = () =>{

      setOpen(false);

    }

    const updateFournClose = () =>{
      setOpenUpdate(false);

    }

    const deleteFournisseurOpen = () =>{
      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{   
        setOpenDelete(true);
      }

    }

    const deleteFournClose = () =>{
      setOpenDelete(false);

    }


    const addFournSave = async () =>{

      var test = true;

      setFournisseurNameError([false, ""])
      setFournisseurAdressError([false, ""])
      setFournisseurEmailAdrError([false, ""])
      setFournisseurPhoneError([false, ""])


      if (fournisseurName == ""){
        setFournisseurNameError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (fournisseurAdress == ""){
        setFournisseurAdressError([true,"Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpen(false);

        const data = {
          name:fournisseurName,
          address:fournisseurAdress,
          email_adress:fournisseurEmailAdr,
          phone_nbr:fournisseurPhone,
        }

        console.log("data", JSON.stringify(data));


        const token = localStorage.getItem("auth_token");

        setResponse(await addNewFournisseur(token, JSON.stringify(data))); 
        
      }
      else{
        setLoadError(true);
        console.log("error");

      }

    }
    const updateFournSave = async () =>{

      var test = true;

      setFournisseurNameError([false, ""])
      setFournisseurAdressError([false, ""])
      setFournisseurEmailAdrError([false, ""])
      setFournisseurPhoneError([false, ""])


      if (fournisseurName == ""){
        setFournisseurNameError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (fournisseurAdress == ""){
        setFournisseurAdressError([true,"Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpen(false);

        const data = {
          name:fournisseurName,
          address:fournisseurAdress,
          email_adress:fournisseurEmailAdr,
          phone_nbr:fournisseurPhone,
        }

        console.log("data", JSON.stringify(data));


        const token = localStorage.getItem("auth_token");

        setResponse(await updateFournisseur(token, JSON.stringify(data), rowData.id)); 

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
      setResponse(await deleteFournisseur(token, selectionModel[0])); 
        
    }

    

    React.useEffect(() => {


      console.log(rowData);

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        console.log(rowData.id)
  
        setFournisseurName(rowData.name);
        setFournisseurAdress(rowData.address);
        setFournisseurEmailAdr(rowData.email_adress)
        setFournisseurPhone(rowData.phone_nbr)

        setFournisseurNameError([false, ""])
        setFournisseurAdressError([false, ""])
        setFournisseurEmailAdrError([false, ""])
        setFournisseurPhoneError([false, ""])

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
            setData(await getAllFournisseur(token));
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
                              Manager les fournisseurs
                            </ListSubheader>
                          }
                        >
                          <ListItemButton onClick={addFournisseurOpen}>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ajouter fournisseur" />
                          </ListItemButton>
                          <ListItemButton onClick={editFournisseurOpen}>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Modifier fournisseur" />
                          </ListItemButton>
                          <ListItemButton onClick={deleteFournisseurOpen}>
                            <ListItemIcon>
                              <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supprimer fournisseur" />
                          </ListItemButton>
                        </List>

                  </Grid>
                </Grid>  


                  <Dialog open={open} onClose={addFournClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>Ajouter Fournisseur</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={fournisseurNameError[0]}
                              helperText={fournisseurNameError[1]}
                              required
                              margin="dense"
                              name="fournisseur_name"
                              id="fournisseur_name"
                              label="Nom de fournisseur"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setFournisseurName(event.target.value)}}
                            />
                            <TextField
                              error={fournisseurAdressError[0]}
                              helperText={fournisseurAdressError[1]}
                              required
                              margin="dense"
                              id="fournisseur_adress"
                              label="Adress"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setFournisseurAdress(event.target.value)}}
                            />
                            

                            <Grid container spacing={2}>
                              <Grid item xs={8}>
                                <TextField
                                      error={fournisseurEmailAdrError[0]}
                                      helperText={fournisseurEmailAdrError[1]}
                                      margin="dense"
                                      id="fournisseur_email"
                                      label="Email adress"
                                      fullWidth
                                      variant="standard"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {setFournisseurEmailAdr(event.target.value)}}
                                />

                              </Grid>
                              <Grid item xs={4}>
                              <TextField
                                      error={fournisseurPhoneError[0]}
                                      helperText={fournisseurPhoneError[1]}
                                      margin="dense"
                                      id="fournisseur_phone"
                                      label="Numéro de telephone"
                                      fullWidth
                                      variant="standard"
                                      type="number"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {setFournisseurPhone(event.target.value)}}
                                />
                              </Grid>
                            </Grid>
                            
                              
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={addFournClose}>Anuller</Button>
                            <Button onClick={addFournSave}>Sauvgarder</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openUpdate} onClose={updateFournClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>Modifier un Fournisseur</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={fournisseurNameError[0]}
                              helperText={fournisseurNameError[1]}
                              required
                              margin="dense"
                              name="fournisseur_name"
                              id="fournisseur_name"
                              label="Nom de fournisseur"
                              fullWidth
                              variant="standard"
                              value={fournisseurName}
                              onChange={(event) => {setFournisseurName(event.target.value)}}
                            />
                            <TextField
                              error={fournisseurAdressError[0]}
                              helperText={fournisseurAdressError[1]}
                              required
                              margin="dense"
                              id="fournisseur_adress"
                              label="Adress"
                              fullWidth
                              variant="standard"
                              value={fournisseurAdress}
                              onChange={(event) => {setFournisseurAdress(event.target.value)}}
                            />
                            

                            <Grid container spacing={2}>
                              <Grid item xs={8}>
                                <TextField
                                      error={fournisseurEmailAdrError[0]}
                                      helperText={fournisseurEmailAdrError[1]}
                                      margin="dense"
                                      id="fournisseur_email"
                                      label="Email adress"
                                      fullWidth
                                      variant="standard"
                                      value={fournisseurEmailAdr}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {setFournisseurEmailAdr(event.target.value)}}
                                />

                              </Grid>
                              <Grid item xs={4}>
                              <TextField
                                      error={fournisseurPhoneError[0]}
                                      helperText={fournisseurPhoneError[1]}
                                      margin="dense"
                                      id="fournisseur_phone"
                                      label="Numéro de telephone"
                                      fullWidth
                                      variant="standard"
                                      type="number"
                                      value={fournisseurPhone}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {setFournisseurPhone(event.target.value)}}
                                />
                              </Grid>
                            </Grid>
                            
                              
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={updateFournClose}>Anuller</Button>
                            <Button onClick={updateFournSave}>Sauvgarder</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteFournClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un fournisseur"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  Êtes-vous sûr de la décision de supprimer le fournisseur ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={deleteFournClose}>Anuller</Button>
                                  <Button onClick={deleteConfirmation}>Supprimer</Button>
                                </DialogActions>
                  </Dialog>
                         
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='error' message='Selectioner un fournisseur' onClose={()=> setSelectionError(false)} /> : null}
      
        </React.Fragment>


    )


}


