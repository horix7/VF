import  React, { FunctionComponent, useState } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useBoolean } from '@uifabric/react-hooks';
import Uploader from '../../server/upload'

const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450 } };
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Upload  Image ',
  subText: 'image description ',
};


export const UploadMultipleFile: FunctionComponent<any> = (props: any ) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const [coverPhotos, setCoverPhoto ] = useState(null);

  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: modalPropsStyles,
      dragOptions:  dragOptions,
    }),
    [],
  );

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
      
        <DialogFooter>
        <Uploader multiple={true} />

        <div className="articleWriterC">

          <PrimaryButton onClick={toggleHideDialog} text="Add Images" />
          {/* <DefaultButton onClick={toggleHideDialog} text="Don't send" /> */}
        </div>
        </DialogFooter>
      </Dialog>
    
    
    </>
  );
};
