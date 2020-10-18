import React, {Component, Fragment } from 'react'
import capture from '../../assets/chineke.jpg'

// import {  } from '@fluentui/react'

import { HiOutlineShare } from 'react-icons/hi'
import { IconContext} from 'react-icons'

import {IoMdImages} from 'react-icons/io'

export default class Article extends Component {

    state = {

    }


    render() {

        return (
            <Fragment>

                <div className="articlebox">
                    <div className="imgBox">
                        <div>
                        <img src={capture} height="300px" width="200px" alt=""/>
                        </div>
                        <IconContext.Provider value={{ color: "gold", className: "article_icon" }}>
                            <IoMdImages/>
                        </IconContext.Provider>
                    </div>

                    <div className="article_info">

                        <p className="head">first article to ever be published nowfirst article to ever be published now </p>
                        
                        <IconContext.Provider value={{ color: "gold" , className:"leftFloat"}}>
                            <HiOutlineShare/>
                        </IconContext.Provider>
                    </div>
                </div>
            </Fragment>
        )
    }
}