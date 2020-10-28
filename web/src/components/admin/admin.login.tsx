import React, {useState} from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {  PrimaryButton, IIconProps } from 'office-ui-fabric-react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import BackendCalls from '../../server/backendCalls';
import {
    Stack,
    IStackTokens,
    MessageBar,
    MessageBarType,
  } from 'office-ui-fabric-react';
  

export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
};


const ErroMssage = (p: any) => (
    <MessageBar
      messageBarType={MessageBarType.error}
      isMultiline={false}
      onDismiss={p.resetChoice}
      dismissButtonAriaLabel="ShieldAlert"
    >
       Login Failed 
     
    </MessageBar>
  );


export const AdminLogin: React.FunctionComponent = () => {

    const AdminIcon: IIconProps = { iconName: 'Admin' };
    const keyIcon: IIconProps = { iconName: 'View' };

    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const [errorMess, setErrorMess ] = useState(false)
    const [loading, setLoading ] = useState(false)

    const inputChangeHandler = (event: any, func: Function) => {
        func(event.target.value)
    }

    const callz = new BackendCalls()

    const adminLogin = async () => {
        setLoading(true)
        const resultz = await callz.Login({email: email, password: password})

        
        if(resultz === "error") {
            setErrorMess(true)
            setLoading(false)

        } else if (resultz.data.role >= 5 ) {
            localStorage.setItem("authToken", resultz.data.AuthToken)
            window.location.reload()
        }
        
    }
  return (
     <div className="signUpF adminLogin">

      <div className="signUpPagezz">
    
   <div>

   </div>
    <div className="adminregister">
    <h1>Sawafit Admin </h1>

    {errorMess ? <div className="erromessage"><ErroMssage /></div> : null }
    <Stack tokens={stackTokens}>
      
      <TextField placeholder="Email Address " type="email" iconProps={AdminIcon}  onChange={(event: any) => inputChangeHandler(event, setEmail)} />
        <div className="paddingTop">
        <TextField
        type="password"
        placeholder="Password"
        canRevealPassword={true} 
        iconProps={keyIcon}
        onChange={(event: any) => inputChangeHandler(event, setPassword)}

        // description="A colorful description!"
      />
        </div>
      
      <div className="buttonSize">
     {!loading ? <PrimaryButton text="Login" onClick={adminLogin}/> :  <div>
        <Spinner label="authenticating..." ariaLive="assertive" labelPosition="right" />
      </div>}
      </div>

    </Stack>

    </div>

    </div>
    </div>
  );
};
