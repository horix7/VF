import React, { Key } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import MoreModal from '../models/mealModal'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "white",
      color: "black",
    },
    body: {
      fontSize: 14,
      color: "black"
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

function createData(names: any, email: any, phone: any , gender: any, age: any, id: any) {
  return { names, email, phone, gender, age, id };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: 20,
  },
});

export default function CustomizedTables(props: any) {

  console.log("====> " , props)
const classes = useStyles();
const rows = [...props.data.map((elem: any) => createData(elem.product.name , elem.product.email,  elem.product.phone , elem.product.gender , elem.product.target , elem ))]


return (
  <div className="tableHolder">
  <div className="spacing">
   
  </div>
    <TableContainer style={{width: "100%" , marginLeft: "0%"}} component={Paper}>
  <Typography style={{color: "black"}}> Meal Request </Typography>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Customer </StyledTableCell>
            <StyledTableCell>  Email Address </StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">gender </StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right"> more </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, key: Key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="right"> {row.names}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right"> {row.gender} </StyledTableCell>
              <StyledTableCell align="right">{row.age ? "Custom" : "Order"}</StyledTableCell>
              <StyledTableCell align="right">{ row.age ? <MoreModal data={row.id}/>: null}</StyledTableCell>
            </StyledTableRow>
          ))}

       
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
