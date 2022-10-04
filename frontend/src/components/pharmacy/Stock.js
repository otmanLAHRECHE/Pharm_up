
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'medic_code', headerName: 'Code PCH', width: 100 },
    { field: 'medic_name', headerName: 'Medicament', width: 400 },
    { field: 'date_arrived', headerName: 'Date d arivage', width: 170 },
    { field: 'date_expired', headerName: 'Date d expiration', width: 170 },
    { field: 'stock_qte', headerName: 'QNT', width: 150 },
  ];

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];

export default function Stock(){


    const [medicName, setMedicName] = React.useState("");
    const [arivage, setArivage] = React.useState("");
    const [dateArived, setDateArived] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [qnt, setQnt] = React.useState("");

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [dateArivedError, setDateArivedError] = React.useState([false, ""]);
    const [dateExpiredError, setDateExpiredError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");

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
      }


      const addStockClose = () =>{
        setOpen(false);

      }

      const addStockOpen = () =>{
        setOpen(true);
      }

      const addStockSave = async () =>{
        
      }



      return(
        <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>

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
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button startIcon={<InventoryIcon />} onClick={addStockOpen}>Etat de stock des médicaments</Button>
        <Button startIcon={<EditAttributesIcon />} >Modifier le stock de médicament</Button>
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

            <Dialog open={open} onClose={addStockClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Ajouter un médicament au stock</DialogTitle>
                              <DialogContent>
                              <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                        <Autocomplete
                                            disablePortal
                                            value={medicName}
                                            onChange={(event, newVlue) =>{
                                                setMedicName(newVlue);
                                                
                                            }}
                                            id="combo-box-demo"
                                            options={top100Films}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                            helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" />}
                                        />

                                        </Grid>
                                        <Grid item xs={6}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={arivage}
                                                    onChange={(event, newVlue) =>{
                                                        setArivage(newVlue);
                                                        
                                                    }}
                                                    options={top100Films}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                    helperText={arivageError[1]} fullWidth variant="standard" label="Médicaments" />}
                                                />  
                                        
                                        </Grid>

                              </Grid>
                              
                              
                                

                            <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <DesktopDatePicker
                                                    label="Date d arivage"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={dateArived}
                                                    onChange={(event) => {setDateArived(event.target.value)}}
                                                    renderInput={(params) => <TextField {...params} error={dateArivedError[0]}
                                                    helperText={dateArivedError[1]} />}
                                            />

                                            </Grid>

                                            <Grid item xs={6}>
                                            <DesktopDatePicker
                                                    label="Date d expiration"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={dateExpired}
                                                    onChange={(event) => {setDateExpired(event.target.value)}}
                                                    renderInput={(params) => <TextField {...params} error={dateExpiredError[0]}
                                                    helperText={dateExpiredError[1]} />}
                                            />
                                            </Grid>
                            </Grid>
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
                                  
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addStockClose}>Anuller</Button>
                                <Button onClick={addStockSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
          </Container>
      
        </React.Fragment>
      )



}