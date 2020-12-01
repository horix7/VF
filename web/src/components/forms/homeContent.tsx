import { TextField } from "@material-ui/core";
import React, {  Component, Fragment } from "react";
import FullScreenDialog from "../UI/fullscreenDialog";
import BackendCalls from "../../server/backendCalls";
import BackDrop from "../UI/backDrop"
import { Label } from "@material-ui/icons";
import { DialogweUploadByBtn }  from '../models/uploadModal'


const backend = new BackendCalls()


export default class HomeInfoForm extends Component<any> {
    state: {[key: string] : any } = {
        home: {},
        loading: true,
    }

    getHomePageData = async () => {
        const HomeData = await  backend.GetHomeContent()

        this.setState({
            home: HomeData,
            loading: false
        })
    }

    CreateComponentData = async () => {
        this.setState({
            loading: true
        })
        const postData = await backend.CreateHomeContent(this.state.home)

        if(postData === "error") {
            alert("Something Went Wrong")
        } else {
            this.setState({
                loading: false,
                home: postData.data
            })
        }
    }
    componentDidMount() {
        this.getHomePageData()
    }


    render() {
        return (
            <Fragment>
            

                
            {this.state.loading ? <BackDrop /> :
              <FullScreenDialog open={true} close={this.props.goBack} head="Update Home Page Content " >
              <div className="imgDescription">
                  <Label > Home Content On the Home MainBanner  </Label>
                  <TextField variant="filled" placeholder="Home Page Content " name="head"  />
              </div>

              <div className="imgDescription">
                  <Label > Home Main Banner Background Image  </Label>
                  <img src={this.state.home.home.pic} alt="" />
                  <TextField variant="filled" placeholder="Home Page Content " name="head"  />
              </div>

              <div className="imgDescription">
                  <Label > Store Main Banner Background Image  </Label>
                  <img src={this.state.home.store.pic} alt="" />
                  <DialogweUploadByBtn /> <br/> <br/>
                  or 
                  <TextField variant="filled" placeholder="Image Link " name="head"  />
                  <br/>
                  <TextField variant="filled" placeholder="Store Content " name="head"  />
              </div>

              <div className="imgDescription">
                  <Label > Home Main  </Label>
                  <TextField variant="filled" placeholder="Home Page Content " name="head"  />
              </div>




          </FullScreenDialog>}
            </Fragment>
        )
    }
}