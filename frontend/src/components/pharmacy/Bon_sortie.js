import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';
import { addStock, addStockToArrivage, deleteStock, getAllStocks, getSelectedStock, updateStock } from '../../actions/stock_data';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'medic_code', headerName: 'Code PCH', width: 100, valueGetter: (params) =>
    `${params.row.medicament.medic_code || ''}`},
    { field: 'medic_name', headerName: 'Medicament', width: 400, valueGetter: (params) =>
    `${params.row.medicament.medic_name || ''}` },
    { field: 'date_arrived', headerName: 'Date d arivage', width: 140 },
    { field: 'date_expired', headerName: 'Date d expiration', width: 140 },
    { field: 'stock_qte', headerName: 'QNT', width: 150 },
  ];

  

  export default function Bon_sortie(){

    const [bonNbr, setBonNbr] = React.useState("");
    const [source, setSource] = React.useState(null);
    const [date, setDate] = React.useState("");
    const [sortieItems, setSortieItems] = React.useState([]);
    

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [dateArivedError, setDateArivedError] = React.useState([false, ""]);
    const [dateExpiredError, setDateExpiredError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allArivage, setAllArivage] = React.useState([{"label":"Nouveau arrivage"}]);


    const [datePickersState,setDatePickersState] = React.useState(false);
    const [arrivageState, setArrivageState] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [namesData, setNamesData] = React.useState([]);
    const [arrivageData, setArrivageData] = React.useState([]);
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

  }