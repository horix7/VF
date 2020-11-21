import React, {Component, Fragment } from 'react'
// import {  } from '@fluentui/react'
import ShareBtn from "../UI/shareBtn";
// import { HiOutlineShare } from 'react-icons/hi'
import { IconContext} from 'react-icons'
import { AiOutlineYoutube } from 'react-icons/ai'

export default class Video extends Component<any> {

    state = {

    }


    render() {

        return (
            <Fragment>
               
                    
                <div className="video_box" >
                    <div className="vide_img_box" onClickCapture={() => window.location.href =  window.location.protocol  + "//" + window.location.host + '/content/video/' + this.props.data.id} >
                        <IconContext.Provider value={{ color: "gold", className: "video_icon" }}>
                            <AiOutlineYoutube/>
                        </IconContext.Provider>

                        <div>
                        <img src={this.props.data.images} width="100%" className="imageCoverV" alt=""/>
                        <a href={ window.location.protocol  + "//" + window.location.host + '/content/video/' + this.props.data.id}>
                            
                        <div className="transHead">
                        <p className="head">{this.props.data.head} </p>

                        </div>
                        </a>
                        </div>

                       
                    </div>

                    <div style={{backgroundColor: " rgb(36, 36, 36) " , textAlign: "center" }}>
                    <div className="videoMore">
                    <div>
                   
                    </div>
                    <p>{this.props.data.category}</p>
                    <div></div>
                        <ShareBtn link={window.location.protocol  + "//" + window.location.host + '/content/video/' + this.props.data.id} />

                </div>
                    </div>
                </div>

               
                   
            </Fragment>
        )
    }
}