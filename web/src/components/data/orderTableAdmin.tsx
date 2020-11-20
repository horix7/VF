import React, { Key } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "black",
      color: "gold",
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

function createData(name: any, price: any, options: any , amount: any, total: any, image: any) {
  return { name, price, options, amount, total, image };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props: any) {

const classes = useStyles();
const rows = [...props.data.map((elem: any) => createData(elem.head , elem.price,  elem.options || {options: "default "}, elem.amount || 1 , Number(elem.price) * (Number(elem.amount) || 1), elem.images[0] ))]
const orderSum = [... props.data].map((elem: any) =>  Number(elem.price) * (Number(elem.amount) || 1)).reduce((a,b) => a + b )

console.log(rows)

return (
    <TableContainer style={{width: "90%" , marginLeft: "5%"}} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> # </StyledTableCell>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">price &nbsp;($)</StyledTableCell>
            <StyledTableCell align="right">options </StyledTableCell>
            <StyledTableCell align="right">amount</StyledTableCell>
            <StyledTableCell align="right">total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, key: Key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="right"> <img width="50" height="50" src={row.image} alt=""/></StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right"> <List component="nav"  aria-label="mailbox folders"> 
              {Object.keys(row.options).map((elem: any, key: Key ) => (
                <ListItem key={key} button divider>
                <ListItemText primary={elem} secondary={row.options[elem]} />
              </ListItem>
              ))}  </List> </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
            </StyledTableRow>
          ))}

        <StyledTableRow>
              <StyledTableCell style={{color: "gold", fontWeight: "bold"}} component="th" scope="row">
                Total 
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell style={{color: "black", fontWeight: "bold"}} align="right">{orderSum}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
