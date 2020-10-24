import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
};



export const SignUpForm: React.FunctionComponent = () => {

  return (
     <div className="signUpF">


    <h1 className="sawafit">SAWAFIT</h1>

      <div className="signUpPages">
    
    <div className="register">
    <h1>Register</h1>
    <Stack  tokens={stackTokens}>
      <TextField
      label="Your  names "
        // eslint-disable-next-line react/jsx-no-bind
        description="Full Names"
      />
      <TextField label="Your Email Address " type="email"  />
      <TextField
        type="password"
        label="Create Password"
        canRevealPassword={true} 
        // description="A colorful description!"
      />
      <div className="buttonSize">

      <DefaultButton text="Sign Up"/>

      </div>
    </Stack>

    </div>
    <div className="register">
    <h1>Login</h1>
    <Stack tokens={stackTokens}>
      
      <TextField label="Email Address " type="email"  />
      <TextField
        type="password"
        label="Password"
        canRevealPassword={true} 
        // description="A colorful description!"
      />
      
      <div className="buttonSize">
      <PrimaryButton text="Login"/>
      </div>

    </Stack>

    </div>

    </div>
    </div>
  );
};
