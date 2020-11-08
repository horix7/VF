import * as React from 'react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import {ActivityItemBasic } from './comments'
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const PivotIconCountExample: React.FunctionComponent = () => {
  return (
    <div>
      <Pivot>
      
        <PivotItem headerText="more" itemIcon="Articles" itemCount={3}>
          <Label styles={labelStyles}>Pivot #4</Label>
        </PivotItem>
        
        <PivotItem headerText="Comments" itemIcon="Comment">
          <ActivityItemBasic />
        </PivotItem>

      </Pivot>
    </div>
  );
};

function _customRenderer(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
  return (
    <span>
      {defaultRenderer(link)}
      <Icon iconName="Airplane" style={{ color: 'red' }} />
    </span>
  );
}
