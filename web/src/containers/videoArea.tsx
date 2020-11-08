import React, { Fragment, Component } from "react";
import video from "../assets/videoTrial.mp4";
import HomeNav from "../components/navigation/home_nav";
import imgTrial from "../assets/shoes.jpg";
import { Icon } from "@fluentui/react";
import VideoBox from "../components/UI/video"
import Slider from 'react-slick'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'

export default class Video extends Component {
  state = {};

  render() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


    return (
      <Fragment>
        <HomeNav />

        <div className="mainVideo">
          <div className="video">
            <video src={video} controls width="800px"></video>
            <label>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
              nam officiis similique hic, quaerat expedita repudiandae ipsum
              provident quis deserunt quam iste nesciunt, consectetur, doloribus
              in commodi! Deleniti, hic. Amet?
            </label>
          </div>

          <div className="featuredv">
            <div className="featuredV">
              <img src={imgTrial} width="70px" height="40px" alt="" />
              <p>
                Lorem ipsum dolor cing elit. Quasi libero d rem a asperiores ab.
              </p>
              <div className="iconzz">
                <Icon iconName="Share" />
                <Icon iconName="Recent" />
                <div>10 min </div>
              </div>
            </div>

            <div className="featuredV">
              <img src={imgTrial} width="70px" height="40px" alt="" />
              <p>
                Lorem ipsum dolor cing elit. Quasi libero d rem a asperiores ab.
              </p>
              <div className="iconzz">
                <Icon iconName="Share" />
                <Icon iconName="Recent" />
                <div>10 min </div>
              </div>
            </div>
            <div className="featuredV">
              <img src={imgTrial} width="70px" height="40px" alt="" />
              <p>
                Lorem ipsum dolor cing elit. Quasi libero d rem a asperiores ab.
              </p>
              <div className="iconzz">
                <Icon iconName="Share" />
                <Icon iconName="Recent" />
                <div>10 min </div>
              </div>
            </div>

            <div className="featuredV">
              <img src={imgTrial} width="70px" height="40px" alt="" />
              <p>
                Lorem ipsum dolor cing elit. Quasi libero d rem a asperiores ab.
              </p>
              <div className="iconzz">
                <Icon iconName="Share" />
                <Icon iconName="Recent" />
                <div>10 min </div>
              </div>{" "}
            </div>
          </div>
        </div>

        <div className="morevideos">
           <div>
           <Slider {...settings} >
                <div><VideoBox /></div>
                <VideoBox />
                <VideoBox />
                <VideoBox />
                <VideoBox />
            </Slider>
           </div>
        </div>
        <div className="moreContent"></div>
      </Fragment>
    );
  }
}
