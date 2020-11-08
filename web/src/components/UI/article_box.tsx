import React, { Component, Fragment } from "react";
import { HiOutlineShare } from "react-icons/hi";
import { IconContext } from "react-icons";

import { IoMdImages } from "react-icons/io";
import {trimWorlds} from '../../server/conast&func'

import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom'

export default class Article extends Component<any> {
  state = {};

  render() {
    return (
      <Fragment>
           
                 <div className="articlebox">
          <div className="imgBox">
            <div>
              <img
                src={this.props.data.images}
                width="100%"
                alt=""
                style={{objectFit: "cover", height: "100%"}}
              />
            </div>
            <IconContext.Provider
              value={{ color: "gold", className: "article_icon" }}
            >
              <IoMdImages />
            </IconContext.Provider>
          </div>

          <div className="article_info">
          <Link to={'content/articles/' + this.props.data.id}>
            <p className="head"> {trimWorlds(this.props.data.head)}</p>
           </Link>
            <IconContext.Provider
              value={{ color: "gold", className: "leftFloat" }}
            >
              <HiOutlineShare />
            </IconContext.Provider>
          </div>
        </div>
    
      </Fragment>
    );
  }
}
