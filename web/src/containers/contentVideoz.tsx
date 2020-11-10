import React , {Fragment , Component} from 'react'
import BackendCalls  from '../server/backendCalls'
import VideoBox from '../components/UI/video'
import ArtBox from '../components/UI/article_box'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';


const backend = new BackendCalls()

export default class Content extends Component<any> {

    state = {
        videos: [],
        articles: []
    }

    getAllData = async() => {
        const article = await backend.GetArticles(false)
        const video = await backend.GetVideos(false)

        this.setState({
            articles: article.data.article,
            videos: video.data.video,
        })
    }

    componentDidMount() {
        this.getAllData()
    }

    render() {

        return (
            <Fragment>
                <div className="contentHolder">
                    <div className="gridz">
                        {this.state.articles.length > 0 ? 
                        this.state.articles.map((elem: any, key: React.Key) => ( <div key={key}> <ArtBox data={elem}/> </div>)) : <ProgressIndicator /> }
                    </div>
                </div>

                 <div className="contentHolder" id="video">
                 <div className="gridz">
                        {this.state.videos.length > 0 ? 
                        this.state.videos.map((elem: any, key: React.Key) => ( <div key={key}> <VideoBox data={elem}/> </div>)) : <ProgressIndicator /> }
                    </div>
                </div>


                
            </Fragment>
        )
    }
}