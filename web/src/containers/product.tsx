import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'

export default class Article extends Component {
    state = {

    }


    render() {
        return (
            <Fragment>
                <Homenav />

                <div className="productPage">
                    <div className="prod">
                        <div className="proImg">

                        </div>

                        <div className="proSpecs">

                        </div>
                    </div>

                    <div className="more">

                    </div>
                </div>
            </Fragment>
        )
    }
}