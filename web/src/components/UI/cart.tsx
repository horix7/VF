import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';
import InteractiveList  from './cartTable'
import { Link } from 'react-router-dom';


const buttonStyles = { root: { marginRight: 8 } };

export const CartHolder = (props: any ) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(props.open);

  // This panel doesn't actually save anything; the buttons are just an example of what
  // someone might want to render in a panel footer.
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <Link to="/checkout/order">
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
          Checkout 
        </PrimaryButton>
        </Link>
        <DefaultButton onClick={props.closeCart}>Close</DefaultButton>
      </div>
    ),
    [dismissPanel],
  );

  return (
    <div>
      <Panel
        isOpen={props.open}
        onDismiss={props.closeCart}
        headerText="CART"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <InteractiveList />
      </Panel>
    </div>
  );
};
