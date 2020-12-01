import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React, {  Component, Fragment } from "react";
import FullScreenDialog from "../UI/fullscreenDialog";
import BackendCalls from "../../server/backendCalls";
import BackDrop from "../UI/backDrop"
import { Label } from "@material-ui/icons";
import { DialogweUploadByBtn }  from '../models/uploadModal'
import homePic from "../../assets/chineke.jpg";
import storePic from "../../assets/store.jpg";
import { PrimaryButton } from "@fluentui/react";



const backend = new BackendCalls()


export default class HomeInfoForm extends Component<any> {
    state: {[key: string] : any } = {
        loading2: false,
        home: {
            home: {
                pic: homePic,
                content: null
            },
            store: {
                pic: storePic,
                content: null
            }
        },
        loading: true,
    }

    getHomePageData = async () => {
        const HomeData = await  backend.GetHomeContent()

        console.log(HomeData)
        this.setState({
            // home: HomeData,
            loading: false
        })
    }

    CreateComponentData = async () => {
        this.setState({
            loading2: true
        })
        const postData = await backend.CreateHomeContent(this.state.home)

        if(postData === "error") {
            alert("Something Went Wrong")
        } else {
            this.setState({
                loading2: false,
                // home: postData.data
            })

            this.props.groBack()

        }

    }
    componentDidMount() {
        this.getHomePageData()
    }


    getUpdateData = (event: any, name: string) => {

        const home = {...this.state.home}

        home[name] = {
            content: event.target.value
        }
        
        this.setState({
            home: home
        })

    }


    render() {
        return (
            <Fragment>
            

                
            {this.state.loading ? <BackDrop /> :
              <FullScreenDialog open={true} close={this.props.groBack} head="Update Home Page Content " >
             
             <div className="HomeEditro">
            

              <div className="imgDescription">
                  <Typography > Home Main Banner Background Image  </Typography>

                  <img width="100px" src={this.state.home.home.pic || homePic} alt="" /> <br/>
                  <DialogweUploadByBtn setImage={(image: any) => {
                      const home = {...this.state.home} 
                      home["home"]["pic"] = image 
                      
                      this.setState({
                          home: home
                      })
                  }} /> 

                  <br/>
                  
                  <TextField multiline rows={2}  className="homeInputs" variant="filled" placeholder="Home Page Content " onChange={(event:any) => this.getUpdateData(event, "home")} />
              </div>

              <div className="imgDescription">
                  <Typography > Store Main Banner Background Image  </Typography>
                  <img width="250px" src={this.state.home.store.pic || storePic } alt="" /> <br/>
                  <DialogweUploadByBtn setImage={(image: any) => {
                      const home = {...this.state.home} 
                      home["store"]["pic"] = image 
                      
                      this.setState({
                          home: home
                      })
                  }} /> 
                  <br/>
                  <TextField multiline rows={2}  className="homeInputs" variant="filled" placeholder="Store Content " onChange={(event:any) => this.getUpdateData(event, "store")} />
              </div>

              <div className="imgDescription">
                  <Typography > About Website </Typography>
                  <TextField multiline rows={3}  className="homeInputs" variant="filled" placeholder="About Content " onChange={(event:any) => this.getUpdateData(event, "about")} />
              </div>

              <div className="imgDescription">
                    Social Media Account 
                <div className="inputFlex">
                  <TextField className="homeInputs" variant="filled" placeholder="Facebook " onChange={(event:any) => this.getUpdateData(event, "facebook")} />
                  <TextField className="homeInputs" variant="filled" placeholder="Instagram" onChange={(event:any) => this.getUpdateData(event, "instagram")} />
                  <TextField className="homeInputs" variant="filled" placeholder="Whatsapp " onChange={(event:any) => this.getUpdateData(event, "whatsapp")} />
                  <TextField className="homeInputs" variant="filled" placeholder="Youtube " onChange={(event:any) => this.getUpdateData(event, "youtube")} />

                </div>
                </div>


                <div className="imgDescription">
                    Contact Information  
                <div className="inputFlex">
                  <TextField className="homeInputs" variant="filled" placeholder="Address " onChange={(event:any) => this.getUpdateData(event, "address")} />
                  <TextField className="homeInputs" variant="filled" placeholder="Phone Number " onChange={(event:any) => this.getUpdateData(event, "number")} />
                  <TextField className="homeInputs" variant="filled" placeholder="Contact Email " onChange={(event:any) => this.getUpdateData(event, "email")} />

                </div>
              </div>

              {this.state.loading2 ? <CircularProgress />: <PrimaryButton onClick={this.CreateComponentData} className="homeInputSub" text="Update Home Content" />}

             </div>


          </FullScreenDialog>}
            </Fragment>
        )
    }
}