import React, { Component, Fragment } from 'react'
import { TextField, Button } from "@fluentui/react"
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';


export default class ContactForm extends Component {

        state = {
                name: "",
                email: "",
                message: "",
                loading: false
        }

        handleChanges = (event ) => {
                let newState = {...this.state}
                newState[event.target.name] = event.target.value

                this.setState(newState)
        }

        submitCOntactMessage = () => {

                this.setState({
                        loading: true
                })

               if( Object.values(this.state).some(ele => ele === "")) {
                       alert("Provide Your Information ")
                       this.setState({loading: false}) 
               } else {
                       setTimeout(() => {
                              this.setState({loading: false}) 
                       }, 3000);
               }
        }
         render() {
                  return (
                           <Fragment>
                                   <div className="contactForm">
                                   <TextField  onChange={this.handleChanges} name="name" label="Your Name" />
                                    <TextField  onChange={this.handleChanges}  type="email" name="email" label="Your Email " />
                                    <TextField  onChange={this.handleChanges} multiline rows={5} name="message" label="Message " />
                                    <br />
                                {this.state.loading ? <ProgressIndicator  /> : <Button onClick={this.submitCOntactMessage} primary >  Contact Us </Button> }
                                   </div>
                           </Fragment>
                  )
         }
}