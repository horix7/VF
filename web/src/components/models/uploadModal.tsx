import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from "@fluentui/react/lib/Icon"
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useBoolean } from '@uifabric/react-hooks';
import UploadFunc from '../../server/upload'

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


export const DialogweUploadByBtn: React.FunctionComponent = (props: any ) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const [coverPhoto, setCoverPhoto ] = React.useState("null");

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
      { coverPhoto !== "null" ? <img src={coverPhoto} width="100px" alt=""/> : <DefaultButton secondaryText="upload Article cover photo " onClick={toggleHideDialog} text=" Upload Cover image" />}
      </div>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        >
      
        <DialogFooter>
          {/* <PrimaryButton onClick={toggleHideDialog} text="Upload" /> */}
          <UploadFunc />
          {/* <DefaultButton onClick={toggleHideDialog} text="Don't send" /> */}

        </DialogFooter>
      </Dialog>
    
    
    </>
  );
};

export const DialogweUploadByIcn = (props: any ) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const [coverPhoto, setCoverPhoto ] = React.useState("null");

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
    
      <Icon iconName="CloudUpload" className={props.claas} onClick={toggleHideDialog} />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        >
      
        <DialogFooter>
          {/* <PrimaryButton onClick={toggleHideDialog} text="Upload" /> */}
          <UploadFunc />
          {/* <DefaultButton onClick={toggleHideDialog} text="Don't send" /> */}

        </DialogFooter>
      </Dialog>
    
    
    </>
  );
};
