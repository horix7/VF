import React, { Component, Fragment } from 'react'
import { TextField, Button } from "@fluentui/react"


export default class ContactForm extends Component {

         render() {
                  return (
                           <Fragment>
                                   <div className="contactForm">
                                   <TextField label="Your Name" />
                                    <TextField label="Your Email " />
                                    <TextField multiline rows={5} label="Message " />
                                    <br />
                                    <Button primary > Contact Us </Button>
                                   </div>
                           </Fragment>
                  )
         }
}