import React, {Fragment, Key} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import OrderTable from '../data/orderTableAdmin'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  name: string,
  phone: string,
  country: string,
  address: string,
  date: string,
  total: string,
  info: any
) {
  return {
    name,
    phone,
    country,
    address,
    date,
    total,
    info,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  return (
    <Fragment>

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.country}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details  
              </Typography>
              <OrderTable data={row.info} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    
    </Fragment>
  );
}

export default function CollapsibleTable(props: any) {

  const rows = props.data.map((element: any) => createData(element.product.user.names,  element.product.user.phone,element.product.user.country , element.product.user.address, element.product.user.house , element.product.user.total , element.product.data))
    
  return (
    <div className="tableHolder">
  <div className="spacing">

  </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Customer Name  </TableCell>
            <TableCell align="right"> Phone Number </TableCell>
            <TableCell align="right">  House  </TableCell>
            <TableCell align="right">  Country </TableCell>
            <TableCell align="right">  Address </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, key: Key) => (
            <Row key={key} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}