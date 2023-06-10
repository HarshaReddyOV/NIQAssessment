import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useContext} from "react";
import {ProductContext, ProductDetails} from "./Dashboard";

export default function BasicTable() {
  const productOptions: ProductDetails[] = useContext(ProductContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">PRICE</TableCell>
            <TableCell align="center">DESCRIPTION</TableCell>
            <TableCell align="center">RATING</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productOptions.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.title}
                </div>
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <div style={{ maxWidth: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.description}
                </div>
              </TableCell>
              <TableCell align="right">{row.rating.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
