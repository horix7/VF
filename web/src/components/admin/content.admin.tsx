import React , { Component, Fragment } from 'react'
import Tables from '../data/content.tables'
import Chart from '../data/charts'
import {Icon } from '@fluentui/react/lib/Icon'
import ArticleFrom  from '../forms/articelForm'
import VideFrom  from '../forms/create_video'
import BackendCalls from '../../server/backendCalls'
import VideoTables from '../data/video.tables'
import BackDrop from '../UI/backDrop'

const backend = new BackendCalls()

export default class ArticleAdmin extends Component<any> {

    state = {
        openEditor: false,
        editor2: false ,
        data: [],
        videoData: [],
        articleContent: {},
        videoContent: {},
        videoCategory: [],
        articleCategory: [],
        doneLoading: false
        
    }


    async componentDidMount ( ) {
       const premiumData = await  backend.GetArticles(true)

       const fremiumData =await  backend.GetArticles(false)

       const premiumDataVid = await  backend.GetVideos(true)

       const fremiumDataVid =await  backend.GetVideos(false)


      this.setState({
          data: [...premiumData.data.article , ...fremiumData.data.article],
          videoDatat: [ ...fremiumDataVid.data.video, ...premiumDataVid.data.video],
            doneLoading: true,
          articleCategory: [...premiumData.data.article.map((elem: any) => elem.category), ...fremiumData.data.article.map((elem: any) => elem.category)],
          videoCategory: [...premiumDataVid.data.video.map((elem: any) => elem.category), ...fremiumDataVid.data.video.map((elem: any) => elem.category)]

      })

    }

    deleteElements = (deleteItems: any) => {

        deleteItems.forEach(async (element: any) => {
            await backend.deleteArticle(element.id, element.premium)
        });

    }


    openEditor = () => {
        const { openEditor } = {...this.state}
        this.setState( {
            openEditor: !openEditor 
        })
    }
    opeEditor2 = () => {
        const { editor2 } = {...this.state}

        this.setState( {
            editor2: !editor2 
        })
    }

    updateElement = async (updateItem : any ) => {
        
        

        if(updateItem.is === "content") {
            const articleInfo = await backend.GetOneArticle(updateItem.premium, updateItem.id)
            this.openEditor()
        this.setState({
            articleContent:  articleInfo
        })

        } else {

        const videoInfo = await backend.GetOneVideo(updateItem.premium, updateItem.id)    
        this.setState({
            articleContent:  videoInfo
        })
        this.opeEditor2()

        }

    }

    render () {
       return  (
        <Fragment>

            {this.state.doneLoading ? null : <BackDrop /> }

            {this.state.openEditor || this.state.editor2 ?  this.state.editor2 ? <VideFrom goBack={this.opeEditor2} content={this.state.videoContent} categories={this.state.videoCategory}  />  :
             <ArticleFrom goBack={this.openEditor}  content={this.state.articleContent} categories={this.state.articleCategory}  />   : <>
            <div className="towEl">
                <div className="actionBtn">
                <div></div>

            <div className="viewReport " onClick={this.openEditor}>
             <Icon iconName="PageAdd" className="bigIcon"/>
             <p>Publish An Article </p>
             </div>

             <div className="viewReport"  onClick={this.opeEditor2} >
             <Icon iconName="Video" className="bigIcon"/>
             <p>Publsih A Video </p>
             </div>
                </div>
             <Chart chartData={{MON: 102, TUE: 32, WED: 0, THU: 0}} type={"views"} />


           </div>
            
            <Tables data={this.state.data} editorElem  deleteElem />    
            <VideoTables data={this.state.videoData} editorElem  deleteElem />
            </>}
        </Fragment>
       )
    }

}