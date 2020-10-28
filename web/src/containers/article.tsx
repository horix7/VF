import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'

export default class Article extends Component {
    state = {

    }


    render() {
        return (
            <Fragment>
                <Homenav />

                <div className="article">
                    <div className="articleHead">

                    </div>

                    <div className="articleContent">
                        <div className="contentD">

                        </div>

                        <div className="recentContent">
                            
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}