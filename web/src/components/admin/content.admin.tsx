import React , { Component, Fragment } from 'react'
import Tables from '../data/content.tables'
import Chart from '../data/charts'
import {Icon } from '@fluentui/react/lib/Icon'
import ArticleFrom  from '../forms/articelForm'
import VideFrom  from '../forms/create_video'
import BackendCalls from '../../server/backendCalls'
import VideoTables from '../data/video.tables'
import BackDrop from '../UI/backDrop'
import CreateQuestion from '../models/createQuestions'

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


     fetDataFromNet = async ( )  => {
       const premiumData = await  backend.GetArticles(true)

       const fremiumData =await  backend.GetArticles(false)

       const premiumDataVid = await  backend.GetVideos(true)

       const fremiumDataVid =await  backend.GetVideos(false)

       const premiumDataN = premiumData.data.article.map((elem: any ) => {
           return {
               id: elem.id,
               head: elem.head,
               body: elem.body,
               category: elem.category,
               published_on: elem.published_on,
               type: "premium",
            
           }
       })


       const fremiumDataN = fremiumData.data.article.map((elem: any ) => {
        return {
            id: elem.id,
            head: elem.head,
            body: elem.body,
            category: elem.category,
            published_on: elem.published_on,
            type: "standard",
         
        }
    })

    const premiumDataNV = premiumDataVid.data.video.map((elem: any ) => {
        return {
            id: elem.id,
            head: elem.head,
            body: elem.body,
            category: elem.category,
            published_on: elem.published_on,
            type: "premium",
         
        }
    })

    const fremiumDataNV = fremiumDataVid.data.video.map((elem: any ) => {
     return {
         id: elem.id,
         head: elem.head,
         body: elem.body,
         category: elem.category,
         published_on: elem.published_on,
         type: "standard",
      
     }
 })

      this.setState({
          data: [...fremiumDataN, ...premiumDataN],
          videoData: [ ...fremiumDataNV , ...premiumDataNV],
          doneLoading: true,
          articleCategory:[ ...[...new Set (premiumData.data.article.map((elem: any) => elem.category))].map((elem : any) =>  {return { key: elem, text: elem}}),...[ ...new Set (fremiumData.data.article.map( (elem: any) => elem.category))].map((elem : any) =>  {return { key: elem, text: elem}})],

          videoCategory:[   ...[...new Set(premiumDataVid.data.video.map((elem: any) => elem.category))].map((elem : any) =>  {return { key: elem, text: elem}}), ...[...new Set(fremiumDataVid.data.video.map((elem: any) =>  elem.category))].map((elem : any) =>  {return { key: elem, text: elem}})]

      })

    }


    async componentDidMount() {
        this.fetDataFromNet()
    }

    deleteElements = (deleteItems: any) => {
        
        let  indeqx = 0

        let newItem = deleteItems[0].filter( (elem: any ) =>{
            return  elem !== undefined
        })
       
        this.setState({
            doneLoading: false
        }) 

         const  deletOne = async () => {
            const element = newItem[indeqx]

           await backend.deleteArticle(element.id, element.premium)
            indeqx++

            if(indeqx === newItem.length) {
              
                this.componentDidMount()
         } else {
             deletOne()
         }
           

       }

       deletOne()
    }

    
    deleteVideos = (deleteItems: any) => {

        
        let  indeqx = 0

        let newItem = deleteItems[0].filter( (elem: any ) =>{
            return  elem !== undefined
        })
       
         
        this.setState({
            doneLoading: false
        }) 

         const  deletOne = async () => {
            const element = newItem[indeqx]

            await backend.deleteVideo(element.id, element.premium)

            indeqx++

            if(indeqx === newItem.length) {
             
                this.componentDidMount()
         } else {
             deletOne()
         }
           

       }

       deletOne()

    }

    

    openEditor = () => {
        const { openEditor } = {...this.state}
        this.setState( {
            openEditor: !openEditor 
        })

        if(openEditor) {
           this.setState({
               doneLoading: "false"
           })
            this.fetDataFromNet()
        } else {
            window.location.href = "#topper"  
        }
    }


    opeEditor2 = () => {
        const { editor2 } = {...this.state}

        this.setState( {
            editor2: !editor2 
        })

        if(editor2 ) {
            
           this.setState({
               doneLoading: "false"
           })
            this.fetDataFromNet()
        } else {
            window.location.href = "#topper"  
        }
    }

    updateElement = async (updateItem : any ) => {
        
        
        
        let newItem = updateItem[0].filter( (elem: any ) =>{
            return  elem !== undefined
        })

        newItem = newItem[0]

        if(newItem.is === "content") {

                this.setState({
                    doneLoading: false
                })
            const articleInfo = await backend.GetOneArticle(newItem.premium, newItem.id)
        this.setState({
            doneLoading: true,
            articleContent: { ...articleInfo.data.article.data,  id: newItem.id, premium: newItem.premium}
        })
        this.openEditor()
        } else {

            this.setState({
                doneLoading: false
            })
            const videoInfo = await backend.GetOneVideo(newItem.premium, newItem.id)    
        this.setState({
            doneLoading: true,
            videoContent: { ...videoInfo.data.video.data, id: newItem.id, premium: newItem.premium}
        })
        this.opeEditor2()

        }

    }

    render () {
       return  (
        <Fragment>

            {this.state.doneLoading ? null : <BackDrop /> }

            {this.state.openEditor || this.state.editor2 ?  this.state.editor2 ? <VideFrom goBack={this.opeEditor2} content={this.state.videoContent}  categories={this.state.videoCategory}  />  :
             <ArticleFrom goBack={this.openEditor}  content={this.state.articleContent} categories={this.state.articleCategory}  />   : <>
            <div className="towEl">
                <div className="actionBtn">
                <div></div>

            <div className="viewReport " onClick={() => {
                this.setState({
                    videoContent: {},
                    articleContent: {}
                })
                this.openEditor()
            }}>
             <Icon iconName="PageAdd" className="bigIcon"/>
             <p>Publish An Article </p>
             </div>

             <div className="viewReport ">
             <Icon iconName="AddToShoppingList" className="bigIcon"/>
             <CreateQuestion />
             </div>

             <div className="viewReport"  onClick={() => {
                   this.setState({
                    videoContent: {},
                    articleContent: {}
                })
                 this.opeEditor2()}} >

             <Icon iconName="Video" className="bigIcon"/>
             <p>Publsih A Video </p>
             </div>
                </div>
             <Chart chartData={{MON: 102, TUE: 32, WED: 0, THU: 0}} type={"views"} />


           </div>
            
            <Tables data={this.state.data} editorElem={(elem: any) => this.updateElement(elem)}  deleteElem={(elem: any) => this.deleteElements(elem)} />    
            <VideoTables data={this.state.videoData} editorElem={(elem: any) => this.updateElement(elem)}  deleteElem={(elem: any) => this.deleteVideos(elem)} />
            </>}
        </Fragment>
       )
    }

}