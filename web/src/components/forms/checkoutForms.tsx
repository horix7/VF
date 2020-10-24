import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import MomoPic from '../../assets/momo.jpg'
import PayPal from '../../assets/paypal.png'
import { PrimaryButton } from 'office-ui-fabric-react';

const options: IChoiceGroupOption[] = [
  {
    key: 'MOMO',
    imageSrc: MomoPic,
    selectedImageSrc: MomoPic,
    imageSize: { width: 100, height: 40 },
    text: 'MTN And Artel/Tigo Mobile oney', // This text is long to show text wrapping.
  },
  {
    key: 'PAYPAL',
    imageSrc: PayPal,
    selectedImageSrc: PayPal,
    imageSize: { width: 100, height: 40 },
    text: 'Credit Card Payment / PayPal',
  },
];



const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const ShippingAddress: React.FunctionComponent = () => {
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField label="Phone Number" required type="phone" mask="m\ask: (999) 999 - 9999"  />
        <TextField label="Your Country " required />
        <TextField label="Delviery Address" required />
      </Stack>
      <Stack {...columnProps}>
        <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />
        <TextField label="With an icon" iconProps={iconProps} />
        <TextField label="With placeholder" placeholder="Please enter text here" />
        <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" />
        <TextField label="Password with Reveal Button" type="password" canRevealPassword={true} />
      </Stack>
    </Stack>
  );
};


export const PaymentForm: React.FunctionComponent = () => {
    return (
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
        <ChoiceGroup label="Pick one image" defaultSelectedKey="MOMO" options={options} />;
        </Stack>
        <Stack {...columnProps}>
          <MaskedTextField label="With input mask" />
          <PrimaryButton text="Pay"/>

        </Stack>
      </Stack>
    );
  };
  