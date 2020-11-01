import React, { Component, Fragment } from "react";
import Axios from 'axios'
import VideoForm from '../components/forms/create_video'
import AdminNav  from '../components/navigation/admin_nav'
import StorePage from '../components/admin/storePage'
import ContentPage from '../components/admin/content.admin'
import Clients from '../components/admin/clients'
import { AdminLogin } from '../components/admin/admin.login'
import BackendCalls from '../server/backendCalls'
import DashPage from '../components/admin/dash.admin'

const backend = new BackendCalls()

export default class AdminDash extends Component {

    state = {
        openSate : "dash"
    }

    componentDidMount () {
        Axios.get(`${localStorage.backendUrl}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(results => {
            console.log(results.data)
        })
    }
    setActive:Function = (elementId : string) => {
        const elemnt = document.getElementById(elementId)
      if(elemnt !== null ) {
        elemnt.classList.add('active')
      
    }

   
    }
    changeOpenState = async (openState: string ) => {

        this.setState({openSate : openState})

            console.log(openState)
        if(openState === "logout") {
            const logout  = await backend.Logout()
            localStorage.clear()

            if(logout.status === 200) {
                window.location.reload()

            }
        }   
    }
      

    render() {
       

        return (
            <Fragment >

          {localStorage.authToken ?  <> 
            <body className="navBack">
            <AdminNav onUpdate={this.changeOpenState}/>

            <main>
                    <div className="mainBody">
                    {this.state.openSate === "createPro"? <StorePage />  : null}
            {this.state.openSate === "createArt"? <ContentPage />  : null}
            {/* {this.state.openSate === "createVid"? <VideoForm content={{}} categories={[]}  />  : null} */}
            {this.state.openSate === "client" ? <Clients />  : null}
            {this.state.openSate === "dash" ? <DashPage />  : null}
           
                    </div>
            </main>

            </body>


         

          </> :  <AdminLogin /> }
            </Fragment>
        )   
    }
}