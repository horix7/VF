import React, {Component, Fragment } from 'react'
import capture from '../../assets/choe.jpg'

// import {  } from '@fluentui/react'

import { HiOutlineShare } from 'react-icons/hi'
import { IconContext} from 'react-icons'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineClockCircle } from 'react-icons/ai'

export default class Video extends Component {

    state = {

    }


    render() {

        return (
            <Fragment>

                <div className="video_box">
                    <div className="vide_img_box">
                        <IconContext.Provider value={{ color: "gold", className: "video_icon" }}>
                            <AiOutlineYoutube/>
                        </IconContext.Provider>

                        <div>
                        <img src={capture} height="210px" width="300px" alt=""/>
                        <div className="transHead">
                        <p className="head">first article to ever be published nowfirst article to ever be published now </p>

                        </div>
                        </div>

                       
                    </div>

                    <div style={{backgroundColor: " rgb(36, 36, 36) " , textAlign: "center" }}>
                    <div className="videoMore">
                    <div>
                    <IconContext.Provider value={{ color: "gold", className: "timeIcon videoIco" }}>
                            <AiOutlineClockCircle/>
                        </IconContext.Provider>
                    </div>
                    <p>15 min</p>
                    <div></div>
                <IconContext.Provider value={{ color: "gold",className: "videoIco" }}>
                            <HiOutlineShare/>
                        </IconContext.Provider>

                </div>
                    </div>
                </div>

               
            </Fragment>
        )
    }
}