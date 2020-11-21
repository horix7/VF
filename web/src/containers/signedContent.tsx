import React , {Fragment , Component} from 'react'
import BackendCalls  from '../server/backendCalls'
import VideoBox from '../components/UI/video'
import ArtBox from '../components/UI/article_box'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import HomeNav from '../components/navigation/home_nav'
import { DefaultButton } from '@fluentui/react'
import { FaYoutube , FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom"
import { FaStream } from "react-icons/fa";
import {  ArticleSlider, VideoPlayer } from '../components/UI/displayProAndContentz'


const backend = new BackendCalls()

export default class Content extends Component<any> {

    state = {
        videos: [],
        preArticles: [],
        preVideos: [],
        articles: [],
        displayArticles: {
            current: 4,
            data:  []
        },
        displayVideos: {
            current: 3,
            data:  []
        },
        loading: false,
        upgraded: true,
        loading2: false
    }

    getAllData = async() => {
        const article = await backend.GetArticles(false)
        const video = await backend.GetVideos(false)
        const premiumVideo = await backend.GetVideos(true)
        const premiumArticle = await backend.GetArticles(true)

        if(premiumArticle !== "error" && premiumVideo !== "error") {
            this.setState({
                preArticles: premiumArticle.data.article,
                preVideos: premiumVideo.data.video,
            })  
        }else {
            this.setState({
                upgraded: false 
            })
        }

        this.setState({
            articles: article.data.article,
            videos: video.data.video,
        })

        this.getMoreData("article")
        this.getMoreData("video")
    }

    componentDidMount() {
        this.getAllData()
    }

    getMoreData = (data: string) => {    

       if(data === "article") {
        this.setState({
            loading: true
        })
        let newArticleData = [...this.state.articles]
        setTimeout(() => {
            if(newArticleData.length > this.state.displayArticles.current) {
            newArticleData.length = this.state.displayArticles.current + 4

            const changedArray = {
                current: this.state.displayArticles.current + 4,
                data: newArticleData
            }
            this.setState({
                displayArticles: {...changedArray}
            })

           
        } else {
            newArticleData.length = this.state.articles.length

            const changedArray = {
                current: this.state.articles.length,
                data: newArticleData
            }
            this.setState({
                displayArticles: {...changedArray}
            })

           
        }
        this.setState({
            loading: false
        })
        
        }, 2000);
        
       
        
       
       } else if (data === "video") {
        this.setState({
            loading2: true
        })
        let newArticleData =[...this.state.videos]
        setTimeout(() => {
            if(newArticleData.length > this.state.displayVideos.current) {
                newArticleData.length = this.state.displayVideos.current + 3
    
                const changedArray = {
                    current: this.state.displayVideos.current + 3,
                    data: newArticleData
                }
                this.setState({
                    displayVideos: {...changedArray}
                })
    
              
            } else {
                newArticleData.length = this.state.videos.length
                const changedArray = {
                    current: this.state.videos.length,
                    data: newArticleData
                }
                this.setState({
                    displayVideos: {...changedArray}
                })
    
    
            }
            this.setState({
                loading2: false
            })
        }, 2000);
        
       }
       console.log(this.state)
    }

    render() {

        return (
            <Fragment>
                <HomeNav />
                <div className="contentHolder">

                <div className="smallHeadrInfo">
                            <div className="iconName">
                                <FaStream color="gold" />  &nbsp;
                                <span>Premium Content </span>
                            </div>

                          <div></div>
                        
                        </div>
        
                    <div>
                     {this.state.upgraded ? 
                    <> 
                    {this.state.preArticles.length >= 1 ? <ArticleSlider premium={true} articles={this.state.preArticles} /> :  <ProgressIndicator />} 
                     {this.state.preVideos.length >= 1 ? <VideoPlayer premium={true} a  videos={this.state.preVideos} /> :  <ProgressIndicator />} 
                 
                      </>
                    : <div className="upgradeIndicator">
                         <p className="upgradeMessage"> Subscribe To View Premium Content </p>
                         <Link to="/levelup" > <DefaultButton text="Level Up"/> </Link> 
                     </div> }
                     
                    </div>

                        
                <div className="smallHeadrInfo">
                        <div className="iconName2">
                            <FaNewspaper color="gold" />  &nbsp;
                            <span>Articles </span>
                        </div>

                        <div className="viewMore">
                        
                        </div>
                    
                    </div>

                    <div className="gridz">
                        {this.state.displayArticles.data.length > 0 ? 
                        this.state.displayArticles.data.map((elem: any, key: React.Key) => ( <div className="gridHolder"  key={key}> <ArtBox data={elem}/> </div>)) : <ProgressIndicator /> }
                    </div>
                   {this.state.loading ? <ProgressIndicator /> :  <DefaultButton style={{marginLeft: "20px"}} onClick={() => this.getMoreData("article")} text="Load More" />}
                    
                </div>

                 <div className="contentHolder" id="video">
                 <div className="smallHeadrInfo">
                        <div className="iconName2">
                            <FaYoutube color="gold" />  &nbsp;
                            <span>Videos</span>
                        </div>

                        <div className="viewMore">
                        
                        </div>
                    
                    </div>
   
                 <div className="gridz">
                        {this.state.displayVideos.data.length > 0 ? 
                        this.state.displayVideos.data.map((elem: any, key: React.Key) => ( <div className="gridHolder"  key={key}> <VideoBox data={elem}/> </div>)) : <ProgressIndicator /> }
                    </div>
                   {this.state.loading2 ? <ProgressIndicator /> :  <DefaultButton style={{marginLeft: "20px"}} onClick={() => this.getMoreData("video")} text="Load More" />}

                </div>


                
            </Fragment>
        )
    }
}