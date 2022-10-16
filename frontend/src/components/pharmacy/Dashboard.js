import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Groups3Icon from '@mui/icons-material/Groups3';
import EventIcon from '@mui/icons-material/Event';
import OutputIcon from '@mui/icons-material/Output';
import AnalyticsIcon from '@mui/icons-material/Analytics';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dashboard_app from './Dashboard_data';
import Medicaments from './Medicaments';
import Fournisseur from './Fournisseur';
import Destinataire from './Destinataire';
import Stock from './Stock';
import Bon_sortie from './Bon_sortie';
import Bon_sortie_details from './Bon_sortie_details';
import Statestiques from './Statistiques';
import Expired_stock from './expired';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [toolBar,setToolBar] = React.useState("Tableau de bord et statestiques")

  const clickDashboard = () =>{
    
      setPage([true,false,false,false,false,false,false,false])
      setToolBar("Tableau de bord et statestiques")
  };

  const clickSortie= () =>{
  
    setPage([false,true,false,false,false,false,false,false])
    setToolBar("Bons de sortie")
   
  
  };

  const clickCommande = () =>{
  
    setPage([false,false,true,false,false,false,false,false])
    setToolBar("Details des bons sortie")
  
  };
  const clickStock= () =>{
  
    setPage([false,false,false,true,false,false,false,false])
    setToolBar("Stock des médicaments")
  
  };
  const clickMedic= () =>{
  
    setPage([false,false,false,false,true,false,false,false])
    setToolBar("Liste des médicaments")
  
  };
  const clickFornisseur= () =>{
  
    setPage([false,false,false,false,false,true,false,false])
    setToolBar("Liste des fournisseurs")
  
  };
  const clickDestinataire= () =>{
  
    setPage([false,false,false,false,false,false,true,false])
    setToolBar("Destinataires")
  
  };
  const clickExpired= () =>{
  
    setPage([false,false,false,false,false,false,false,true])
    setToolBar("Rappel d'expiration")
  
  };


  const [page, setPage] = React.useState([true,false,false,false,false,false,false,false]);
  
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {toolBar}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
                <ListItemButton selected = {page[0]} onClick={clickDashboard}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tableau de bord"/>
                </ListItemButton>
                <ListItemButton selected={page[1]} onClick={clickSortie}>
                  <ListItemIcon>
                    <OutputIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bon de sortie" />
                </ListItemButton>
                <ListItemButton selected={page[2]} onClick={clickCommande}>
                  <ListItemIcon>
                    <TextSnippetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bon de sortie details" />
                </ListItemButton>
                <ListItemButton selected={page[3]} onClick={clickStock}>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stock médicaments" />
                </ListItemButton>
                
            <Divider sx={{ my: 1 }} />
                    <ListSubheader component="div" inset>
                      Autre options
                    </ListSubheader>
                    <ListItemButton selected={page[4]} onClick={clickMedic}>
                      <ListItemIcon>
                        <VaccinesIcon />
                      </ListItemIcon>
                      <ListItemText primary="Médicaments" />
                    </ListItemButton>
                    <ListItemButton selected={page[5]} onClick={clickFornisseur}>
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Fournisseurs" />
                    </ListItemButton>
                    <ListItemButton selected={page[6]} onClick={clickDestinataire}>
                      <ListItemIcon>
                        <Groups3Icon />
                      </ListItemIcon>
                      <ListItemText primary="Déstinataires" />
                    </ListItemButton>
                    <ListItemButton selected={page[7]} onClick={clickExpired}>
                      <ListItemIcon>
                        <EventIcon />
                      </ListItemIcon>
                      <ListItemText primary="Rappel d'expiration" />
                    </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />

        
        {page[0] ? <Statestiques/> : null}
        {page[1] ? <Bon_sortie/> : null}
        {page[2] ? <Bon_sortie_details/> : null}
        {page[3] ? <Stock/> : null}
        {page[4] ? <Medicaments/> : null}
        {page[5] ? <Fournisseur/> : null}
        {page[6] ? <Destinataire/> : null}
        {page[7] ? <Expired_stock/> : null}
        

        
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}