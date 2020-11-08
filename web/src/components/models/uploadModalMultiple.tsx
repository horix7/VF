import  React, { FunctionComponent, useState } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useBoolean } from '@uifabric/react-hooks';
import Uploader from '../../server/upload'
localStorage.setItem("uploadMany", "[]")


const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450 } };
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Upload  Images',
  subText: '.jpg .png .gif supported',
};


export const UploadMultipleFile: FunctionComponent<any> = (props: any ) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const [coverPhotos, setCoverPhotosz ] =  useState<any[]>([]);

  const setCoverPhotos = (item: any ) => {
    setCoverPhotosz([...coverPhotos,item])
    const newData =  JSON.parse(localStorage.uploadMany)
    newData.push(item)
    localStorage.setItem("uploadMany" , JSON.stringify(newData))
    
    setMoreImages([...images, (<Uploader  onUploadScuess={(coverPhot: any) => setCoverPhotos(coverPhot)} />)])

   
  }
const [images , setMoreImages ] = useState<any[]>([<Uploader  onUploadScuess={(coverPhot: any) => setCoverPhotos(coverPhot)} />])
  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: modalPropsStyles,
      dragOptions:  dragOptions,
    }),
    [],
  );

  const increaseImageCorrector = () => {

    const imgArray = JSON.parse(localStorage.uploadMany)
      props.setImages(imgArray)

      console.log(imgArray)
      localStorage.setItem("uploadMany", "[]")
  }

  return (
    <>
      <div className="articleWriterC">
      <DefaultButton  onClick={toggleHideDialog} text=" Upload Product Images" />
      </div>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        >
          
          {images.map((Elem : any ) => Elem)}
        <DialogFooter>
        
          

        <div className="articleWriterC">

          <PrimaryButton onClick={() => {
            increaseImageCorrector()
            toggleHideDialog()
          }} text="Add " />
          {/* <DefaultButton onClick={} text="Don't send" /> */}
        </div>
        </DialogFooter>
      </Dialog>
    
    
    </>
  );
};
