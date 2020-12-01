import React , { Component, Fragment } from "react"
import Homenav from '../components/navigation/home_nav'
import { MdAccountCircle } from "react-icons/md";
import { PivotIconCountExample } from '../components/UI/moreArticle'
import BackDrop from '../components/UI/backDrop'
import BackendCalls from '../server/backendCalls'
import {  ArticleSlider } from "../components/UI/displayProAndContentz";

const backend = new BackendCalls()

interface Istate {
    article_info: any,
    allArticles: any,
    loading: boolean
}

export default class Article extends Component<any> {
    state: Istate = {
        article_info: {},
        allArticles: [],
        loading: false

    }

    getArticleData = async () => {
        let article = await backend.GetOneArticle(false , this.props.match.params.id)
        let allArticle = await backend.GetArticles(false)

        if(Object.keys(article.data).length === 0) article =  await backend.GetOneArticle(true , this.props.match.params.id)

        let newarticle = article.data.article.data


        this.setState({
            article_info: {...newarticle, id: article.data.article.id},
            allArticles: allArticle.data.article,
            loading: true 
        })

    }

    componentDidMount() {
        this.getArticleData()
    }

    render() {
          
        return (
            <Fragment>
                <Homenav />

                

              {Object.keys(this.state.article_info).length > 1 ?   <>
              <div className="article">
                    <div className="articleHead">
                    <img  className="imageCover" src={this.state.article_info.images} alt=""/>
                        <div className="articleTittle">
                         <p style={{position:"absolute"}}> {this.state.article_info.head}</p>

                        </div>
                    </div>

                    <div className="articleContent">
                        <div className="contentD">

                            <div className="postedBy">
                                <div className="madeBy">
                                <MdAccountCircle style={{fontSize: "larger"}} /> <p> {this.state.article_info.made_by} </p>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: this.state.article_info.body}}></div>
                        </div>

                        <div className="recentContent">
                           <PivotIconCountExample info={{review_id: this.state.article_info.review_id || this.state.article_info.id }} />
                        </div>

                       
                    </div>
                </div>
                <ArticleSlider articles={this.state.allArticles} /> 
                </>
                 : <BackDrop />}
                               
            </Fragment>
        )
    }
}