import * as React from 'react';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import {ActivityItemBasic } from './commentsVideo'



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

