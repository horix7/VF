import React, { Component, Fragment } from 'react'

import Slider from 'react-slick'
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import ArticleBox from '../../components/UI/article_box'
import ProductBox from '../../components/UI/product_box'

export  class ProductDsiplayer extends Component<any> {
    state = {

    }

    render() {


          const prodSettings = {
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
                <Slider {...prodSettings}>
                    {this.props.products.map((elem: any, key: React.Key) => ( <div key={key}> <ProductBox  data={elem} /> </div>)) }
                    </Slider>
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
            slidesToShow: 5,
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
                <Slider {...settings}>
                    {this.props.articles.map((elem: any, key: React.Key) => ( <div key={key}> <ArticleBox data={elem}/> </div>)) }
                    </Slider>
            </Fragment>
        )
    }
}


