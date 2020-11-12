import React , {Fragment , Component} from 'react'
import BackendCalls  from '../server/backendCalls'
import VideoBox from '../components/UI/video'
import ArtBox from '../components/UI/article_box'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import HomeNav from '../components/navigation/home_nav'
import { DefaultButton } from '@fluentui/react'


const backend = new BackendCalls()

export default class Content extends Component<any> {

    state = {
        videos: [],
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
        loading2: false
    }

    getAllData = async() => {
        const article = await backend.GetArticles(false)
        const video = await backend.GetVideos(false)

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
                    <div className="gridz">
                        {this.state.displayArticles.data.length > 0 ? 
                        this.state.displayArticles.data.map((elem: any, key: React.Key) => ( <div className="gridHolder"  key={key}> <ArtBox data={elem}/> </div>)) : <ProgressIndicator /> }
                    </div>
                   {this.state.loading ? <ProgressIndicator /> :  <DefaultButton style={{marginLeft: "20px"}} onClick={() => this.getMoreData("article")} text="Load More" />}
                    
                </div>

                 <div className="contentHolder" id="video">
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