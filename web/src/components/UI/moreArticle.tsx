import * as React from 'react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import {ActivityItemBasic } from './comments'
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const PivotIconCountExample = (props: any) => {
  return (
    <div>
      <Pivot>
      
        <PivotItem headerText="Comments" itemIcon="Comment">
          <ActivityItemBasic review_id={props.info.review_id} />
        </PivotItem>

      </Pivot>
    </div>
  );
};

