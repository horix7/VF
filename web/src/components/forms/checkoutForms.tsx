import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import MomoPic from '../../assets/momo.png'
import PayPal from '../../assets/paypal.png'
import { PrimaryButton } from 'office-ui-fabric-react';

const options: IChoiceGroupOption[] = [
  {
    key: 'MOMO',
    imageSrc: MomoPic,
    selectedImageSrc: MomoPic,
    imageSize: { width: 200, height: 80 },
    text: '', // This text is long to show text wrapping.
  },
  {
    key: 'PAYPAL',
    imageSrc: PayPal,
    selectedImageSrc: PayPal,
    imageSize: { width: 200, height: 80 },
    text: '',
  },
];



const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Globe' };
const stackStyles: Partial<IStackStyles> = { root: { width: 1000 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const ShippingAddress: React.FunctionComponent = () => {
  return (
      <div className="formHolder">

    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField label="Your Names" required />
        <TextField label="Phone Number" required type="phone" mask="m\ask: (999) 999 - 9999"  />
        <TextField label="Your Email "  required />
        
      </Stack> 

      <Stack {...columnProps}>       
        <TextField label="Your Country " iconProps={iconProps} required />
        <TextField placeholder="Street Address" />
      </Stack> 

    </Stack>
    </div>

  );
};


export const PaymentForm: React.FunctionComponent = () => {
    return (
    
    <div className="formHolder">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
        <ChoiceGroup  defaultSelectedKey="MOMO" options={options} />
        </Stack>
        <Stack {...columnProps}>
          <MaskedTextField label="Your Phone Number " mask="(999) 99999 - 9999"  />
          <PrimaryButton text="Pay"/>

        </Stack>
      </Stack>
      </div>

    );
  };
  