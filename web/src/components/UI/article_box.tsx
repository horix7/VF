import React, { Component, Fragment } from "react";
// import { HiOutlineShare } from "react-icons/hi";
import { IconContext } from "react-icons";
import ShareBtn from '../UI/shareBtn'
import { IoMdImages } from "react-icons/io";
import {trimWorlds} from '../../server/conast&func'


export default class Article extends Component<any> {
  state = {};

  render() {
    return (
      <Fragment>
           
                 <div className="articlebox">
          <div className="imgBox"  onClickCapture={() => window.location.href =  window.location.protocol  + "//"  + window.location.host  + '/content/articles/' + this.props.data.id}>
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
          <a href={   window.location.protocol  + "//"  + window.location.host  + '/content/articles/' + this.props.data.id}>
            <p className="head"> {trimWorlds(this.props.data.head)}</p>
           </a>
          <ShareBtn link={ window.location.protocol  + "//"  + window.location.host  + '/content/articles/' + this.props.data.id} />
          </div>
        </div>
    
      </Fragment>
    );
  }
}
