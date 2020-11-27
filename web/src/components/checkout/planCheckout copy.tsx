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
import { CustomPaymentForm2 } from '../forms/checkoutForms'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {DefaultButton, Icon } from "@fluentui/react"
import { Dropdown, MessageBar, MessageBarType, PrimaryButton, TextField  } from 'office-ui-fabric-react';
import BackendCalss  from '../../server/backendCalls'

const backend = new BackendCalss()


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
    1:  <Icon style={{color: "black", fontWeight:"bold"}} iconName="PaymentCard"  />,
    2:  <Icon style={{color: "black", fontWeight:"bold"}} iconName="TextDocument"   />,
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
  return [ 'Confirm Payment', 'Reciept'];
}


export default function CustomizedSteppers(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setname] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [email, setemail] = React.useState('');
  const [gender, setgender] = React.useState('');
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

const postOrder = async() => {
  const meal = {
    name: name,
    email: email,
    phone: phone,
    gender: gender
  }

  if(Object.values(meal).some((elem: any) => elem === "")) {
      return "error"
  } else {
    const createMeal = await backend.createMealPlanRequest(meal)

    if(createMeal === "error") {
        return "error"
    } else {
      handleNext()
      return true 
    }
  }

}
const GetStepContent: React.FunctionComponent<any> = (props: any) => {
  switch (props.step) {

    case 0:
      return <> 
      <div className="formHolder">
      <div className="checkoutFF">
      <TextField label="Your Names " value={name} type="text" onChange={(event : any) =>  setname(event.target.value)} />
            <TextField label="Your Email Address "value={email}  type="email" onChange={(event : any) =>  setemail(event.target.value)} />
            <TextField label="Your Phone Number "value={phone} type="phone" onChange={(event : any) =>  setphone(event.target.value)} />
            <Dropdown
              selectedKey={gender}
              label="Your Gender"
              onChange={(event: any, option: any) => setgender(option.key)}

              options={[
                {
                  key: "MALE",
                  text: "MALE"
                },
                {
                  key: "FEMALE",
                  text: "FEMALE"
                }
              ]}
            />
      </div>
      </div>
         <CustomPaymentForm2 next={props.handleNext} total={props.total}/>
         {/* <PrimaryButton text="submit" onClick={props.handleNext} /> */}
      </>;
    case 1:
      return <>
         <MessageBar
         
         messageBarType={MessageBarType.success}
         isMultiline={false}
         >
         Your Plan Request Was Made  successfully Made 
        
       </MessageBar>

       <DefaultButton text="Continue" style={{float: "left", marginTop: "20px"}} onClick={() => window.location.href = "/"}  />
      </>;
    default:
      return null;
  }
}


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

            <GetStepContent step={activeStep} handleNext={postOrder} total={Number(JSON.parse(localStorage.mealPlan).price)} /> 
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
