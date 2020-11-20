import React, { Key } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "gold",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
      backgroundColor: "black",
      color: "white"
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

function createData(name: string, price: number, options: any, amount: number, total: number) {
  return { name, price, options ,amount, total };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props: any) {
  const classes = useStyles();
    
const rows = [...props.data.map((elem: any) => createData(elem.head , elem.price, elem.options, elem.amount || 1 , Number(elem.price) * (Number(elem.amount) || 1)))];
  return (
    <TableContainer style={{width: "90%" , marginLeft: "5%"}} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">price &nbsp;($)</StyledTableCell>
            <StyledTableCell align="right">options &nbsp;($)</StyledTableCell>
            <StyledTableCell align="right">amount</StyledTableCell>
            <StyledTableCell align="right">total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, key: Key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{JSON.parse(row.options)}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
            </StyledTableRow>
          ))}

        <StyledTableRow>
              <StyledTableCell style={{color: "gold", fontWeight: "bold"}} component="th" scope="row">
                Total Price 
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell style={{color: "gold", fontWeight: "bold"}} align="right">{props.total}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
