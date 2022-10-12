import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';



export default function SortieItemsTable(props) {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Médicament</TableCell>
            <TableCell align="right">Arivage</TableCell>
            <TableCell align="right">Qnt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
            key ={Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.med_sortie.medicament.medic_name}
              </TableCell>
              <TableCell align="right">{row.med_sortie.date_arrived +" au "+row.med_sortie.date_expired}</TableCell>
              <TableCell align="right">{row.sortie_qte}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
   

  );
}