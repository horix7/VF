import React, { Component, ChangeEvent } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

 export default class EditorConvertToHTML extends Component<any> {
  state = {
    editorState:  EditorState.createEmpty(),

}

componentDidMount() {


        if(this.props.content) {
            const blocksFromHtml = htmlToDraft(this.props.content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            
            this.setState({
                editorState: editorState
            })
        }
}

  onEditorStateChange: Function = (editorState: any) => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });

    this.props.changeBody(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };




  render() {
    const { editorState } = this.state;

    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={(event) => this.onEditorStateChange(event)}
         
        />
       
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// class Weditor extends Component {
//     render() {
//         return (
//             <div className="editor">
//                 <CKEditor
                    
//                     editor={ ClassicEditor }
//                     data=""
//                     placeholder="edit Here "
//                     onInit={ (editor: any) => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ ( event: Event, editor: any ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
//                     } }
//                     onBlur={ ( event: Event, editor: any ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event: Event, editor: any ) => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//         );
//     }
// }

// export default Weditor;