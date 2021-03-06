/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import man from '../assets/man.png'
import women from '../assets/woman.png'
import rec from '../assets/recc.png'
import rectangle2 from '../assets/rectangle.png'

import rect from '../assets/recta.png'
import round from '../assets/round.png'
import maintainWOman from '../assets/maintainWOman.png'
import habits from '../assets/habits.png'
import leaner from '../assets/leaner.png'
import gainMuslce from '../assets/gain.png'
import normalabs from '../assets/normalabs.png'
import extraabs from '../assets/extraabs.png'
import belly from '../assets/belly.png'
import mediumabs from '../assets/mediumabs.png'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ComboBox, Dropdown ,TextField } from "@fluentui/react";
import {  CustomPaymentForm } from '../components/forms/checkoutForms'
import { MessageBar, MessageBarType, ProgressIndicator  } from 'office-ui-fabric-react';
import BackendCallz from '../server/backendCalls'

const backend = new  BackendCallz()

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
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
      backgroundColor: "black",
    },
  }),
);

const options: IChoiceGroupOption[] = [
  {
    key: 'MALE',
    imageSrc: man,
    selectedImageSrc: man,
    imageSize: { width: 90, height: 120 },
    text: 'MALE', // This text is long to show text wrapping.
  },
  {
    key: 'FEMALE',
    imageSrc: women,
    selectedImageSrc: women,
    imageSize: { width: 90, height: 120 },
    text: 'FEMALE',
  },
];


const options2: IChoiceGroupOption[] = [
  {
    key: 'LOSE',
    imageSrc: normalabs,
    selectedImageSrc: normalabs,
    imageSize: { width: 90, height: 120 },
    text: 'Lose Weight', // This text is long to show text wrapping.
  },
  {
    key: 'GAIN',
    imageSrc: mediumabs,
    selectedImageSrc: mediumabs,
    imageSize: { width: 90, height: 120 },
    text: 'Gain Weight',
  },

  {
    key: 'MANTAIN',
    imageSrc: extraabs,
    selectedImageSrc: extraabs,
    imageSize: { width: 90, height: 120 },
    text: 'Mantain Weight',
  },
];


const options5: IChoiceGroupOption[] = [
  {
    key: 'LOSE',
    imageSrc: maintainWOman,
    selectedImageSrc: maintainWOman,
    imageSize: { width: 90, height: 120 },
    text: 'Lose Weight', // This text is long to show text wrapping.
  },
  {
    key: 'GAIN',
    imageSrc: gainMuslce,
    selectedImageSrc: gainMuslce,
    imageSize: { width: 90, height: 120 },
    text: 'Gain Muscle',
  },

  {
    key: 'Get Leaner',
    imageSrc: leaner,
    selectedImageSrc: leaner,
    imageSize: { width: 90, height: 120 },
    text: 'Get Leaner \n Lose Extra Pounds',
  },
  {
    key: 'Develop Healthy Habits ',
    imageSrc: habits,
    selectedImageSrc: habits,
    imageSize: { width: 90, height: 120 },
    text: 'Develop Healthy \n Habits ',
  },
];



const options3: IChoiceGroupOption[] = [
  {
    key: 'ectomorph',
    imageSrc: normalabs,
    selectedImageSrc: normalabs,
    imageSize: { width: 90, height: 120 },
    text: 'ectomorph', // This text is long to show text wrapping.
  },
  {
    key: 'mesomorph',
    imageSrc: mediumabs,
    selectedImageSrc: mediumabs,
    imageSize: { width: 90, height: 120 },
    text: 'mesomorph',
  },

  {
    key: 'endomorph',
    imageSrc: belly,
    selectedImageSrc: belly,
    imageSize: { width: 90, height: 120 },
    text: 'endomorph',
  },
];



const options4: IChoiceGroupOption[] = [
  {
    key: 'Reactangle',
    imageSrc: rect,
    selectedImageSrc: rect,
    imageSize: { width: 90, height: 120 },
    text: 'Reactangle', // This text is long to show text wrapping.
  },
  {
    key: 'hourglass',
    imageSrc: rectangle2,
    selectedImageSrc: rectangle2,
    imageSize: { width: 90, height: 120 },
    text: 'hourglass',
  },

  {
    key: 'pear',
    imageSrc: rec,
    selectedImageSrc: rec,
    imageSize: { width: 90, height: 120 },
    text: 'pear',
  },
  {
    key: 'Round',
    imageSrc: round,
    selectedImageSrc: round,
    imageSize: { width: 90, height: 120 },
    text: 'Round',
  },
];





function getSteps() {
  return ['Choose Your Gender', 'Target' , "Vegetables  dairy Protein  and meat " ];
}



export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [gender, setKey] = useState("MALE");
  const [target, setTarget] = useState("LOSE");
  const [Paid, setPaid] = useState(false);
  const [errorMade, seterrorMade] = useState({
    loading: false,
    error: false
  });
  const [bodyType, setbodyType] = useState("");
  const [activities, setactivities] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [rest, setrest] = useState("");
  const [water, setwater] = useState("");
  const [behavior, setbehavior] = useState("");
  const [motive, setmotive] = useState("");
  const [performs, setperforms] = useState("");
  const [phone, setphone] = useState("");
  const [pysicalActivities, setpysicalActivities] = useState("");
  const [badBehaviors, setbadBehaviorz] = useState<any[]>([]);
  const [vegetables, setvegetables] = useState<any[]>([]);
  const [diary, setdiary] = useState<any[]>([]);
  const [meats, setmeats] = useState<any[]>([]);
  const [lastTime, setlastTime] = useState("");
  const [curentWeight, setcurentWeight] = useState(0);
  const [currentAge, setcurrentAge] = useState("");
  const [targetWeight, settargetWeight] = useState(0);
  const [currentHeight, setcurrentHeight] = useState(0);
  const [mesaures, setmesaures] = useState("kg");

  
  const [mesaurez, setmesaurez] = useState({
    height: "cm",
    weight: "kg",
    option: "METRIC",
    key: "kg cm"
  });

  const submitAll = async() => {
    const meal: {[key: string] : any} = {
      name: userName,
      email: userEmail,
      phone: phone,
      gender: gender,
      body_type: bodyType,
      target: target,
      activities: activities,
      rest: rest,
      water: water,
      behavior: behavior,
      current_age: currentAge,
      current_weight: curentWeight + " " + mesaurez.weight,
      current_height: currentHeight + " " + mesaurez.height,
      target_weight: targetWeight + mesaures,
      last_time_in_form: lastTime,
      motivation: motive ,
      performance: performs,
      pysical_activities: pysicalActivities,
      bad_behaviors: badBehaviors,
      vegetables: vegetables,
      diary: diary,
      meats: meats,

    }

    const failed: any[] = []

    Object.keys(meal).forEach((elem: string) => {
      if( meal[elem] === null || meal[elem] === undefined || meal[elem] === "" || meal[elem] === 0 || meal[elem] === []) {
        failed.push(elem)
      }
    })

    seterrorMade({
      error: false,
      loading: true
    })

    
    if(Paid) {

      if(failed.length === 0) {
       
        let postMealRequest = await backend.createMealPlanRequest(meal)

        if(postMealRequest === "error") {
          seterrorMade({
            error: true,
            loading: false
          })
        }
      } else {
        let errorString = failed.join("\n")
        alert("Missing This Information \n \n" + errorString)
        seterrorMade({
          error: false,
          loading: false
        })
      }
    } else {
     setTimeout(() => {
      seterrorMade({
        error: true,
        loading: false
      })
     }, 2000);

    }
  }

  const setbadBehaviors = (arr: any) => {
    let newArr = [...badBehaviors]
    if(badBehaviors.some((elem: string) => elem === "None Of Above")) {
      setbadBehaviorz([])
    } else if( badBehaviors.some((elem: string) => elem === arr.key)) {
      setbadBehaviorz(badBehaviors)
    } else {
      newArr.push(arr.key)
      if(arr.key !== "None Of Above") {
        setbadBehaviorz(newArr)
      } else {
        setbadBehaviorz(["None Of Above"])
      }
    }
    
   
  }

  const setmeatz = (arr: any ) => {
    let newArr = [...meats]
    if(meats.some((elem: string) => elem === "None")) {
      setmeats([])
    } else if( meats.some((elem: string) => elem === arr.key)) {
      setmeats(meats)
    } else {
      newArr.push(arr.key)
      if(arr.key !== "None") {
        setmeats(newArr)
      } else {
        setmeats(["None"])
      }
    }
    
   
  }


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

  const  GetStepContent = (step: number) => {

  

    switch (step) {
      case 0:
        return (<>
          <div>
            <ChoiceGroup defaultSelectedKey="MALE" selectedKey={gender} options={options} onChanged={(event: any) => setKey(event.key)} />
          </div>
        </>);
      case 1:
        return (<>
          <div className="choicestepper">
            <p>Well-balanced nutrition provides multiple health benefits. We will focus on the one most important to you.</p>
            <p className="higlight">What would you like to achieve?</p>
            <ChoiceGroup defaultSelectedKey="MALE" selectedKey={target} options={ gender === "MALE" ? options2 : options5} onChanged={(event: any) => setTarget(event.key)} />
          </div>
        </>);

 
      case 2:
        return (<>
           <div className="choicestepper inputsStepper">
            <p>Vegetables </p>
  
           <Dropdown
              placeholder="Select Vegetables"
              label="Sweet, now pick the ingredients you wish to have more of."
              defaultSelectedKeys={vegetables}
              multiSelect
              onChange={(event: any, option: any ) => setvegetables(vegetables.concat(option.key))}
              options={[
                {
                  key: "Broccoli",
                  text: "Broccoli"
                },
                {
                  key: "Mushrooms",
                  text: "Mushrooms"
                },
                {
                  key: "Sweet Potatoes ",
                  text: "Sweet Potatoes "
                },
                {
                  key: "Toomatoes",
                  text: "Toomatoes"
                },
                {
                  key: "Spinach ",
                  text: "Spinach "
                },
                {
                  key: "Peas",
                  text: "Peas"
                },
                {
                  key: "Zucchini",
                  text: "Zucchini"
                },
                {
                  key: "Pepper",
                  text: "Pepper"
                }
              ]}
            />
          <p>  Dairy and protein </p>
          <Dropdown
              placeholder="Select Dairy and protein"
              label="How about some protein-rich ingredients?"
              defaultSelectedKeys={diary}
              multiSelect
              onChange={(event: any, option: any ) => setdiary(diary.concat(option.key))}
              options={[
                {
                  key: "avacado",
                  text: "avacado"
                },
                {
                  key: "eggs",
                  text: "eggs"
                },
                {
                  key: "yogurt  ",
                  text: "yogurt  "
                },
                {
                  key: "cottage cheese",
                  text: "cottage cheese"
                },
                {
                  key: "tofu ",
                  text: "tofu "
                },
                {
                  key: "olives",
                  text: "olives"
                },
                {
                  key: "Peanut Butter ",
                  text: "Peanut Butter "
                },
                {
                  key: "Nuts",
                  text: "Nuts"
                }
              ]}
            />
  
          <p>  Meats </p>
          <Dropdown
              placeholder="Select Meats"
              label="Finally, which meats would you like to include in your meal plan?"
              defaultSelectedKeys={meats}
              multiSelect
              onChange={(event: any, option: any ) => setmeatz({key: option.key,  text: option.text})}
              options={[
                {
                  key: "Turkey",
                  text: "Turkey"
                },
                {
                  key: "Fish",
                  text: "Fish"
                },
                {
                  key: "Beef ",
                  text: "Beef "
                },
                {
                  key: "Chicken",
                  text: "Chicken"
                },
                {
                  key: "Pork",
                  text: "Pork"
                },
                {
                  key: "None",
                  text: "None"
                }
              ]}
            />
        
          </div>  
          </>);
     
      default:
        return null;
    }
  }


  return (
    <ThemeProvider theme={Newtheme}>
    <div className={classes.root}>
      <Stepper style={{textAlign: "start",backgroundColor: "black"}}  activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{GetStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {activeStep !== steps.length - 1 ? <Button
                    variant="contained"
                    color="primary"
                    onClick= {handleNext}
                    className={classes.button}
                  >
                   Next
                  </Button> :  null }
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </ThemeProvider>
  );
}
