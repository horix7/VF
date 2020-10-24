
import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Weditor extends Component {
    render() {
        return (
            <div className="editor">
                <CKEditor
                    
                    editor={ ClassicEditor }
                    data="<p>_</p>"
                    onInit={ (editor: any) => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event: Event, editor: any ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event: Event, editor: any ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event: Event, editor: any ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default Weditor;