import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, PrimaryButton , MessageBar, MessageBarType  } from 'office-ui-fabric-react';
import BackendCalls from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';


const backend = new BackendCalls()
export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
};




export const SignUpForm: React.FunctionComponent<any> = (props: any) => {


  const [email , setEmail] = React.useState("")
  const [loading , setloading] = React.useState(false)
  const [erroMade , seterroMade] = React.useState(false)
  const [erroMade2 , seterroMade2] = React.useState(false)
  const [loading1 , setloading1] = React.useState(false)
  const [password , setPassword] = React.useState("")
  const [names , setNames] = React.useState("")

  const handleLogin = async () => {
    setloading1(true)

    const data = {
      email: email,
      password: password
    }

    if(Object.values(data).some((elem: any) => elem === "")) {
      alert("Missing Information ")
    } else {
        
      const postLogin = await backend.Login(data)
        if(postLogin.status === 200) {
          localStorage.setItem("authToken" , postLogin.data.AuthToken)
          localStorage.setItem("userId" , postLogin.data.id)
          props.handleNext()
        }else {
          setloading1(false)
          seterroMade(true)
        }
    }

  }

  
  const handleSignUp = async () => {
    setloading(true)
    const data = {
      name: names,
      email: email,
      password: password
    }

    if(Object.values(data).some((elem: any) => elem === "")) {
      alert("Missing Information ")
    } else {
      const postLogin = await backend.SignUp(data)

      if(postLogin.status === 201) {
        localStorage.setItem("authToken" , postLogin.data.AuthToken)
        localStorage.setItem("userId" , postLogin.data.id)
        props.handleNext()
      }else {
      setloading(false)
      seterroMade2(true)

      }
    }

  }

  return (

<div className="signUpF">

<div className="signUpPages">

<div className="register">
<h1>Register</h1>
{erroMade2 ?  <div style={{width:"70%" , paddingBottom: "20px"}} >
  <MessageBar
        
         messageBarType={MessageBarType.error}
         isMultiline={false}
         >
         Authentication Failed  
        
       </MessageBar>

 </div> : null }
<Stack  tokens={stackTokens}>
<TextField
label="Your  names "
  // eslint-disable-next-line react/jsx-no-bind
  description="Full Names"
  onChange={(event: any) => setNames(event.target.value)}
/>
<TextField label="Your Email Address " type="email" onChange={(event: any) => setEmail(event.target.value)}  />
<TextField
  type="password"
  onChange={(event: any) => setPassword(event.target.value)}
  label="Create Password"
  canRevealPassword={true} 
  // description="A colorful description!"
/>
<div className="buttonSize">

{ loading ?  <div>  <Spinner label="authenticating..." ariaLive="assertive" labelPosition="right" />  </div>  : <DefaultButton text="Sign Up" onClick={handleSignUp} />}

</div>
</Stack>

</div>
<div className="register">
<h1>Login</h1>
{erroMade ? 
 <div style={{width:"70%" , paddingBottom: "20px"}} >
  <MessageBar
         
         messageBarType={MessageBarType.error}
         isMultiline={false}
         >
         Authentication Failed  
        
       </MessageBar>

 </div> : null }
<Stack tokens={stackTokens}>

<TextField label="Email Address " type="email" onChange={(event: any) => setEmail(event.target.value)}  />
<TextField
  type="password"
  onChange={(event: any) => setPassword(event.target.value)}
  label="Password"
  canRevealPassword={true} 
  // description="A colorful description!"
/>

<div className="buttonSize">
{ loading1 ?  <div>  <Spinner label="authenticating..." ariaLive="assertive" labelPosition="right" />  </div> : <PrimaryButton text="Login" onClick={handleLogin}/>}
</div>

</Stack>

</div>

</div>
</div>

    
      
    );
};
