import React, { Fragment, Component } from "react";
import HomeNav from "../components/navigation/home_nav";
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import BackendCalls from '../server/backendCalls'
import ReactPlayer from "react-player"
import { PivotIconCountExample } from '../components/UI/moreVide'
import Backdrop from '../components/UI/backDrop'
import { VideoPlayer } from '../components/UI/displayProAndContentz'

const backend = new BackendCalls()

export default class Video extends Component<any> {
  state: { [key: string] : any}= {
    videoData: {},
    videos: [],
    loading: true,
    
  };

  getContentData = async () => {
    let video = await backend.GetOneVideo(false ,  this.props.match.params.id )
    const allData = await backend.GetVideos(false)
    if(Object.keys(video.data).length === 0) video = await backend.GetOneVideo(true ,  this.props.match.params.id )


    this.setState({
      videoData: {...video.data.video.data, id: video.data.video.id},
      videos: allData.data.video,
      loading: false
    })


  }

  componentDidMount(){
    this.getContentData()
  }


  render() {

      const checkVideoType = (id: string) => {

        let newId = id.split("")
        newId.length = 38
        const mnewid = newId.join('')

        return mnewid === "https://firebasestorage.googleapis.com"
      }

    return (
      <Fragment>
        <HomeNav />
        {this.state.loading ?  <Backdrop />:
        <>
        
        <div className="mainVideo">
          <div className="video">
                   
            { !checkVideoType(this.state.videoData.body)?  <ReactPlayer controls={true} width="100%"  height="98%" className="videoPlayer" style={{objectFit: "cover"}} playing url={this.state.videoData.body} />  : <video src={this.state.videoData.body} controls width="100%"  height="98%" className="videoPlayer" style={{objectFit: "cover"}} ></video>}
            <label className="videoLabel">
             {this.state.videoData.head}
            </label>
          </div>

          <div className="featuredv">
            {/* <div className="featuredV">
              <img src={imgTrial} width="70px" height="40px" alt="" />
              <p>
                Lorem ipsum dolor cing elit. Quasi libero d rem a asperiores ab.
              </p>
              <div className="iconzz">
                <Icon iconName="Share" />
                <Icon iconName="Recent" />
                <div>10 min </div>
              </div>
            </div> */}
           <PivotIconCountExample info={{review_id: this.state.videoData.id }} />
           
          </div>
        </div>

        <div className="">
        <VideoPlayer videos={this.state.videos} />
        </div>

        </>}
      </Fragment>
    );
  }
}
