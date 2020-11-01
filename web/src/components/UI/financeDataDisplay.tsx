import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import button from '@material-ui/core/button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    backgroundColor: "gold"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 10,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

  return (
   <div className="twoCards">
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            PayPal Account 
        </Typography>
        <Typography variant="h5" component="h2">
            Pay-Pal/Card Wallet Data 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          charges: $0
        </Typography>
        <Typography variant="body2" component="p">
          ammount: $0
          <br />
        </Typography>
      </CardContent>
      <CardActions style={{backgroundColor: "black" , color: "gold"}}>
        <button  style={{backgroundColor:"black", border: "none", textAlign: "end" , color: "white"}}>View More</button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            MOMO Account  
        </Typography>
        <Typography variant="h5" component="h2">
            MTN/Airtel Money Wallet Data 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          charges: $0
        </Typography>
        <Typography variant="body2" component="p">
          ammount: $0
          <br />
        </Typography>
      </CardContent>
      <CardActions style={{backgroundColor: "black" , color: "gold"}}>
        <button  style={{backgroundColor:"black", border: "none", textAlign: "end" , color: "white"}} >View More</button>
      </CardActions>
    </Card>
   </div>
  );
}
