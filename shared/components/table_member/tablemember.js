import { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons//Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export const TableMember = ({ rows }) => {
  let num = 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Especialidad</TableCell>
            <TableCell align="right">Ataque físico</TableCell>
            <TableCell align="right">Ataque mágico</TableCell>
            <TableCell align="right">Defensa física</TableCell>
            <TableCell align="right">Defensa mágica</TableCell>
            {/* <TableCell align="right">Especs. secundarias</TableCell> */}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                key={num}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {++num}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.job}</TableCell>
                <TableCell align="right">{row.patk}</TableCell>
                <TableCell align="right">{row.matk}</TableCell>
                <TableCell align="right">{row.pdef}</TableCell>
                <TableCell align="right">{row.mdef}</TableCell>
                {/* <TableCell align="right">{row.especs_secundarias}</TableCell> */}
                <TableCell align="right">
                  <IconButton aria-label="edit" color="info">
                    <EditIcon />
                  </IconButton>{" "}
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => console.log(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit login"
                    color="secondary"
                    onClick={() => console.log(row.id)}
                  >
                    <VpnKeyIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
