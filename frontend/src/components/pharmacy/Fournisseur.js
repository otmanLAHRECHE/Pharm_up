
import * as React from 'react';




export default function Fournisseur(){



    const [fournisseurName, setFournisseurName] = React.useState("")
    const [fournisseurName, setFournisseurName] = React.useState("")
    const [fournisseurName, setFournisseurName] = React.useState("")
    const [fournisseurName, setFournisseurName] = React.useState("")
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
    const [rowData, setRowData] = React.useState("");




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


                  <Dialog open={open} onClose={addMedicClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>Ajouter Fournisseur</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={medicNameError[0]}
                              helperText={medicNameError[1]}
                              required
                              margin="dense"
                              name="fournisseur_name"
                              id="fournisseur_name"
                              label="Nom de fournisseur"
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


