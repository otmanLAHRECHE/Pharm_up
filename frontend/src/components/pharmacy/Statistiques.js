import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Grid from '@mui/material/Grid';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';


import Alt from '../layouts/alert';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { getFirstBonSortieItems } from '../../actions/bon_sortie_data';
import { getAllStocksExpiredAlredyFirst, getAllStocksExpiredNotyetFirst } from '../../actions/stock_data';

import Title from './Title';


const columns = [
  { field: 'id', headerName: 'Id', width: 60, hide: true },
  { field: 'bon_sortie_nbr', headerName: 'Nbr de bon', width: 100, valueGetter: (params) =>
  `${params.row.bon_sortie.bon_sortie_nbr || ''}` },
  { field: 'date', headerName: 'Date', width: 140, valueGetter: (params) =>
  `${params.row.bon_sortie.date || ''}`  },
  { field: 'source', headerName: 'Destinataire', width: 200, valueGetter: (params) =>
  `${params.row.bon_sortie.source.name || ''} ${params.row.bon_sortie.source.service || ''}` },
  { field: 'medic_name', headerName: 'Médicament', width: 200, valueGetter: (params) =>
  `${params.row.med_sortie.medicament.medic_name || ''}` },
  { field: 'date_arrived', headerName: 'Date d arrivation', width: 140, valueGetter: (params) =>
  `${params.row.med_sortie.date_arrived || ''}` },
  { field: 'date_expired', headerName: 'Date d expiration', width: 140, valueGetter: (params) =>
  `${params.row.med_sortie.date_expired || ''}` },
  { field: 'sortie_qnt', headerName: 'Qnt de sortie', width: 140, valueGetter: (params) =>
  `${params.row.sortie_qte || ''}` },
  
];

const columns1 = [
  { field: 'id', headerName: 'Id', width: 60 },
  { field: 'medic_code', headerName: 'Code', width: 100, valueGetter: (params) =>
  `${params.row.medicament.medic_code || ''}`},
  { field: 'medic_name', headerName: 'Medicament', width: 400, valueGetter: (params) =>
  `${params.row.medicament.medic_name || ''}` },
  { field: 'date_arrived', headerName: 'Date d arivage', width: 140 },
  { field: 'date_expired',cellClassName: 'notyet', headerName: 'Date d expiration', width: 140 },
  { field: 'stock_qte', headerName: 'QNT', width: 150 },
];

const columns2 = [
  { field: 'id', headerName: 'Id', width: 60 },
  { field: 'medic_code', headerName: 'Code', width: 100, valueGetter: (params) =>
  `${params.row.medicament.medic_code || ''}`},
  { field: 'medic_name', headerName: 'Medicament', width: 400, valueGetter: (params) =>
  `${params.row.medicament.medic_name || ''}` },
  { field: 'date_arrived', headerName: 'Date d arivage', width: 140 },
  { field: 'date_expired',cellClassName: 'expired', headerName: 'Date d expiration', width: 140 },
  { field: 'stock_qte', headerName: 'QNT', width: 150 },
];


export default function Statestiques(){
    const theme = useTheme

    const [data, setData] = React.useState([]);
    const [data1, setData1] = React.useState([]);
    const [data2, setData2] = React.useState([]);
    
    const [loading, setLoading] = React.useState(false);
    const [loading1, setLoading1] = React.useState(false);
    const [loading2, setLoading2] = React.useState(false);


    
    const [response, setResponse] = React.useState("");
    const [response1, setResponse1] = React.useState("");
    const [response2, setResponse2] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/otmanLAHRECHE">
          EPSP Djanet Pharm_Up 
        </Link>{' '}
        -- created by otman LAHRECHE
        {'.'}
      </Typography>
    );
  }


  React.useEffect(() => {

  
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
        setData(await getFirstBonSortieItems(token));
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, [response]);

  React.useEffect(() => {

  
    if (response2 == "error"){
      setResponseErrorSignal(true);
    } else if(response2 != "") {
      setResponseSuccesSignal(true);
    }

  }, [response2]);


  React.useEffect(() => {

    setLoading1(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        setData1(await getAllStocksExpiredNotyetFirst(token));
        setLoading1(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, [response2]);

  React.useEffect(() => {

  
    if (response1 == "error"){
      setResponseErrorSignal(true);
    } else if(response1 != "") {
      setResponseSuccesSignal(true);
    }

  }, [response1]);


  React.useEffect(() => {

    setLoading2(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        setData2(await getAllStocksExpiredAlredyFirst(token));
        setLoading2(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, [response1]);


  return(

    <React.Fragment>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          
          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
              <Title>Rappel de la date d'expiration des médicaments</Title>

              </Grid>
              <Grid item xs={12}>
                      <Paper
                      sx={{
                        height: 290,
                                        width: '100%',
                                        '& .notyet': {
                                        backgroundColor: '#ffff1a',
                                        color: '#1a1a00',
                                        },
                                        '& .expired': {
                                        backgroundColor: '#ff3300',
                                        color: '#000000',
                                        },
                      }}
                    >

                                <DataGrid
                                      rows={data1}
                                      columns={columns1}
                                      getCellClassName={(params) => {
                                        if (params.field != 'date_expired') {
                                          return '';
                                        }else if(dayjs(params.value, 'YYYY-MM-DD') > dayjs(new Date())){
                                          return 'notyet';

                                        }else{
                                            console.log("expired");
                                            return 'expired';

                                        }
                                      }}
                                      pageSize={10}
                                      checkboxSelection = {false}
                                      loading={loading1}
                                      disableMultipleSelection={true}
                                      
                                  />

                    </Paper>

              </Grid>
            </Grid>
            
          </Grid>
          
          <Grid item xs={12}>
          <Grid container spacing={0.5}>
              <Grid item xs={12}>
              <Title>Médicaments périmés</Title>
              </Grid>
              <Grid item xs={12}>
              <Paper
              sx={{
                height: 290,
                                width: '100%',
                                '& .notyet': {
                                backgroundColor: '#ffff1a',
                                color: '#1a1a00',
                                },
                                '& .expired': {
                                backgroundColor: '#ff3300',
                                color: '#000000',
                                },
              }}
            >

                          <DataGrid
                              rows={data2}
                              columns={columns2}
                              getCellClassName={(params) => {
                                if (params.field != 'date_expired') {
                                  return '';
                                }else if(dayjs(params.value, 'YYYY-MM-DD') > dayjs(new Date())){
                                   return 'notyet';

                                }else{
                                    console.log("expired");
                                    return 'expired';

                                }
                              }}
                              pageSize={10}
                              checkboxSelection = {false}
                              loading={loading2}
                              disableMultipleSelection={true}
                              
                          />
              
            </Paper>
              </Grid>
            </Grid>
            
          </Grid>
          
          <Grid item xs={12}>

          <Grid container spacing={0.5}>
              <Grid item xs={12}>
              <Title>Dernières bon sortie</Title>

              </Grid>
              <Grid item xs={12}>
              <Paper sx={{ height: 400,
                                width: '100%',}}>

                       <DataGrid
                              rows={data}
                              columns={columns}
                              pageSize={10}
                              checkboxSelection = {false}
                              loading={loading}
                              disableMultipleSelection={true}
                              
                          />
            </Paper>

              </Grid>
            </Grid>
            
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>

      {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
      {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            
  
    </React.Fragment>



)


}