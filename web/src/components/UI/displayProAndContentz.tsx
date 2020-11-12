import React, { Component, Fragment } from 'react'

import Slider from 'react-slick'
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import ArticleBox from '../../components/UI/article_box'
import ProductBox from '../../components/UI/product_box'
import VideoBox from '../../components/UI/video'

export  class ProductDsiplayer extends Component<any> {
    state = {

    }

    render() {


          const prodSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
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
                <div className="sliderMnger">
                <Slider {...prodSettings}>
                    {this.props.products.map((elem: any, key: React.Key) => ( <div key={key}> <ProductBox  data={elem} /> </div>)) }
                    </Slider>
                </div>
                
              </Fragment>
          )
    }

}


export  class VideoPlayer extends Component<any> {
  state = {

  }

  render() {


        const prodSettings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            }
          ]
        };

        return (
            <Fragment>
               <div className="sliderMnger">

              <Slider {...prodSettings}>
                  {this.props.videos.map((elem: any, key: React.Key) => ( <div key={key}> <VideoBox  data={elem} /> </div>)) }
                  </Slider>
               </div>

            </Fragment>
        )
  }

}




export class ArticleSlider extends Component<any> {

    state = {

    }

    render() {

        
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
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
               <div className="sliderMnger">
                <Slider {...settings}>
                    {this.props.articles.map((elem: any, key: React.Key) => ( <div key={key}> <ArticleBox data={elem}/> </div>)) }
                    </Slider>
               </div>

            </Fragment>
        )
    }
}


