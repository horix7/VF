import * as React from 'react';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, Dropdown } from '@fluentui/react';
import Backend from '../../server/backendCalls'
import FitnessForm from '../forms/mealPlanBackForm'

const backend = new Backend()

const modelProps = {
  isBlocking: false,
  topOffsetFixed: false,
};



export default class  DialogTopOffsetFixedExample extends React.Component<any> {
 
    state: {[key: string] : any }= {
        hideDialog: true ,
        accepted: false 
    }

    // componentDidMount() {
    //     this.getFitPlanForm()
    // }


    getFitPlanForm = async () => {
        const formData = await backend.GetQuestions()

        this.setState({
            formData: formData.data
        })

    }

    toggleHideDialog = () => {
        const newState  ={...this.state}

        this.setState({
            hideDialog: !newState.hideDialog
        })

    }
    render() {


        return (
          <>
            <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this.toggleHideDialog} text="Take A Survey" />
            
            <Dialog hidden={this.state.hideDialog} onDismiss={this.toggleHideDialog} minWidth={320} maxWidth={700} modalProps={modelProps}>
           
           {this.state.accepted ? <>
            <TextField label="Your Names " value={this.state.name} type="text" onChange={(event : any) =>  this.setState({ name: event.target.value})} />
            <TextField label="Your Email Address "value={this.state.email}  type="email" onChange={(event : any) =>  this.setState({ email: event.target.value})} />
            <TextField label="Your Phone Number "value={this.state.phone} type="phone" onChange={(event : any) =>  this.setState({ phone: event.target.value})} />
            <Dropdown
              selectedKey={this.state.gender}
              label="Your Gender"
              onChange={(event: any, option: any) =>  this.setState({ names: option.key})}

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
            </> : 
            <>
                <FitnessForm close={this.toggleHideDialog}  />
             </>}
             
             
            </Dialog>
          </>
        );
    }
};
