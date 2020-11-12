import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { ShippingAddress , PaymentForm } from '../forms/checkoutForms'

const Newtheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffc107",
    },
    secondary: {
      main: '#000000',
    },
    text : {
        primary: "#ffc107",
        secondary: "#ffffff"
    }
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: "black"
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Delivery Address', 'Confirm Payment', "Receipt"];
}

function getStepContent(stepIndex: number , total: any , shippingCkeck: Function , back: Function) {
  switch (stepIndex) {
    case 0:
      return <ShippingAddress next={shippingCkeck} back={back}/>;
    case 1:
      return <PaymentForm total={total}  next={shippingCkeck} back={back} />;
    case 2:
      return 'Done Receipt';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dataInfo = JSON.parse(localStorage.cart)

  const total = dataInfo.map((elem: any) =>{
    if(elem.amount) {
      return Number(elem.price) * Number(elem.amount )
    } else return Number(elem.price)
  }).reduce((a: number,b: number) => a + b )


  return (
      <div className="stepperBack">

    <ThemeProvider theme={Newtheme}>
    <div className={classes.root}>
      <Stepper style={{backgroundColor: "black"}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step  key={label}>
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, total , handleNext , handleBack)}</Typography>
           
          </div>
        )}
      </div>
    </div>
    </ThemeProvider>
    </div>

  );
}