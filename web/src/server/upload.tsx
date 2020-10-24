import React, { Component, Fragment } from 'react';
import firebase from 'firebase'
import 'firebase/storage'
import { Icon } from '@fluentui/react/lib/Icon'
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYlnRKPNnAoWXR_eQCDq6rQMVDk6IU_ZI",
  authDomain: "vfitness-8a2c3.firebaseapp.com",
  databaseURL: "https://vfitness-8a2c3.firebaseio.com",
  projectId: "vfitness-8a2c3",
  storageBucket: "vfitness-8a2c3.appspot.com",
  messagingSenderId: "944541707751",
  appId: "1:944541707751:web:f960e6420a9b9327116142",
  measurementId: "G-ZT4N7CCP9H"
};


const upload = firebase.initializeApp(firebaseConfig);
firebase.analytics();



export default class UploadData extends Component<any> {
    
    state  = {
        uploadProgress: 20 ,
        uploading: false,
        imgLocation: "null",
        multipleFiles: [],
        uploadSliders: []
    }

    componentDidMount() {
        console.log(this.state)
    }

    uploadImages =   (event: any ) => {

        this.setState({uploading: true})

        
        const file = event.target.files[0]

        const storageRef =  upload.storage().ref("content_images/" + Date.now() + "_" + file.name )
        
        const uploadingFile =  storageRef.put(file)
        
        uploadingFile.on("state_changed", (snapShot: any ) =>  {

            const  percentage = (snapShot.bytesTransferred / snapShot.totalBytes ) * 100

            this.setState({ uploadProgress: percentage})
        })

        uploadingFile.then((done: any) => {

            let  { multipleFiles } = {...this.state}
            storageRef.getDownloadURL().then( url =>{

                const newUploads : string[] = [...multipleFiles];

                newUploads.push(url)

                this.setState({multipleFiles: [...newUploads]})
            } )
        
    })
}
    
        uploadManyImages =  async (event: any) => {
        this.setState({uploading: true})

            // const fileAmmount = event.target.files.length

        
           
            const files = event.target.files

            const  uploadAnImage = (oneFile: any) =>  {
                
            const storageRef =  upload.storage().ref("content_images/" + Date.now() + "_" + oneFile.name )

            let  { multipleFiles } = {...this.state}


            const uploadingFile =  storageRef.put(oneFile)

            uploadingFile.on("state_changed", (snapShot: any ) =>  {

                const  percentage = (snapShot.bytesTransferred / snapShot.totalBytes ) * 100
                this.setState({ uploadProgress: percentage})
                
            })
            uploadingFile.then((done: any) => {
            storageRef.getDownloadURL().then( (url: any) => {
                const newUploads : string[] = [...multipleFiles];

                newUploads.push(url)

                this.setState({multipleFiles: [...newUploads]})

                return;
            } )
        })

            } 
        

        Object.keys(files).forEach( async (index: any) =>   {

      
            const oneFile = files[index];

            uploadAnImage(oneFile)
        })

        }

    render() {

        const uploadOneFile = (
           <Fragment>
                <div className="wrapper">
            <div className="file-upload">
                <input type="file" onChange={this.uploadImages} />
                <Icon iconName="CloudUpload" />
            </div>
            </div>

           </Fragment>
     
        )

        const addFileUpload = (
            <div className="wrapper">
            <div className="file-upload">
                <input type="file" onChange={this.uploadManyImages} multiple accept="image/png, image/jpg, image/jpeg" />
                <Icon iconName="Photo2Add" />
            </div>
            </div>


        )

        return (
            <Fragment>
                {
                    this.state.uploading ? 
                    <Fragment>
                    
                    <List>

                    {this.state.multipleFiles.map( element => (<>
                        <ListItem button>
                        <ListItemText primary={element} />
                        </ListItem>
                     </>))}

                     </List>

                    <Slider  max={100} value={this.state.uploadProgress} />

                   </Fragment> 
                     :
                
                <div>{this.props.multiple ? addFileUpload : uploadOneFile }</div>
    }   

            </Fragment>
        )
    }

}



