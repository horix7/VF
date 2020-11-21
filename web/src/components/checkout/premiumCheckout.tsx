import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { PaymentForm } from '../forms/checkoutForms2'
import { SignUpForm }  from '../forms/checkoutSignUp'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {DefaultButton, Icon } from "@fluentui/react"
import { MessageBar, MessageBarType  } from 'office-ui-fabric-react';

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
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(84deg, rgba(27,26,47,1) 0%, rgba(80,80,0,1) 35%, rgba(198,189,0,1) 100%);',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(84deg, rgba(27,26,47,1) 0%, rgba(80,80,0,1) 35%, rgba(198,189,0,1) 100%);',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(84deg, rgba(27,26,47,1) 0%, rgba(80,80,0,1) 35%, rgba(198,189,0,1) 100%);',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(84deg, rgba(27,26,47,1) 0%, rgba(80,80,0,1) 35%, rgba(198,189,0,1) 100%);',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1:  <Icon style={{color: "black", fontWeight:"bold"}} iconName="Accounts" />,
    2:  <Icon style={{color: "black", fontWeight:"bold"}} iconName="PaymentCard"  />,
    3:  <Icon style={{color: "black", fontWeight:"bold"}} iconName="TextDocument"   />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Create Account', 'Confirm Payment', 'Reciept'];
}

function getStepContent(step: number, handleNext: Function) {
  switch (step) {
    case 0:
      return <SignUpForm handleNext={handleNext} />;
    case 1:
      return <PaymentForm  handleNext={handleNext} />;
    case 2:
      return <>
         <MessageBar
         
         messageBarType={MessageBarType.success}
         isMultiline={false}
         >
         Your SubScription Waas successfully Made 
        
       </MessageBar>

       <DefaultButton text="Continue" style={{float: "left", marginTop: "20px"}} onClick={() => window.location.href = "/auth"}  />
      </>;
    default:
      return ' ';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="stepperBack">
    <ThemeProvider theme={Newtheme}>
    <div className={classes.root}>
      <Stepper style={{backgroundColor: "black"}}  alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, handleNext)}</Typography>
            <div>
              {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
    </ThemeProvider>
    </div>
  );
}
