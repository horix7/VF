import React, { Component, Fragment } from "react";
import {Icon } from '@fluentui/react/lib/Icon'
import ArticleForm from '../components/forms/articelForm'
import VideoForm from '../components/forms/create_video'
import Productorm from '../components/forms/products'
import AdminNav  from '../components/navigation/admin_nav'
import BarChart from '../components/data/charts'
import Tables from '../components/data/tables'
import Tables2 from '../components/data/tableExpandable'
import Chart from "../components/data/charts";

export default class AdminDash extends Component {

    state = {

    }

    componentDidMount () {

    }
    setActive:Function = (elementId : string) => {
        const elemnt = document.getElementById(elementId)
      if(elemnt !== null ) {
        elemnt.classList.add('active')
      
    }
      
    }

    render() {
       

        return (
            <Fragment >

            <body className="navBack">
            <AdminNav />

            <main>
                    <div className="mainBody">
                    {/* <VideoForm /> */}
                    {/* <Productorm /> */}
                    <Chart />
                    {/* <ArticleForm /> */}
                    </div>
            </main>

            </body>

            </Fragment>
        )
    }
}