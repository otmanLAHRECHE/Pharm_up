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

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import { getAllMedicaments } from '../../actions/medicament_data';

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
  
  


export default function Medicaments(){


    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      let active = true;
  
      (async () => {
        setLoading(true);
        const d = await getAllMedicaments(localStorage.getItem("auth_token"));
  
        if (!active) {
          return;
        }
  
        setData(d);
        setLoading(false);
      })();
  
      return () => {
        active = false;
      };
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
                              rowsPerPageOptions={[10]}
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
                          <ListItemButton>
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
                         
        </Container>
      
        </React.Fragment>




    )
}