import * as React from 'react';
import { ActivityItem, Icon, Link, mergeStyleSets , PrimaryButton } from 'office-ui-fabric-react';
import { Rating } from 'office-ui-fabric-react/lib/Rating';
import {TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px',
  },
  nameText: {
    fontWeight: 'bold',
  },
});

export const ActivityItemBasic = (props: any) => {
  /* eslint-disable react/jsx-no-bind */
  const activityItemExamples = [
    {
        key: 1,
        activityDescription: [
          <Link
            key={1}
            className={classNames.nameText}>
            Philippe Lampros
          </Link>,
          <span key={2}> reviewed</span>,
        ],
        activityIcon: <Icon iconName="SkypeMessage" />,
        comments: [
          <span key={1}>Hello! I am making a comment and mentioning </span>,
        
          <span key={3}> in the text of the comment.</span>,
           <Rating  readOnly rating={5} />

        ],
        
        timeStamp: 'Just now',
      },
      {
        key: 1,
        activityDescription: [
          <Link
            key={1}
            className={classNames.nameText}>
            Philippe Lampros
          </Link>,
          <span key={2}> commented</span>,
        ],
        activityIcon: <Icon iconName="SkypeMessage" />,
        comments: [
          <span key={1}>Hello! I am making a comment and mentioning </span>,
        
          <Rating readOnly rating={5} />
        ],
        timeStamp: 'Just now',
      },

];

  return (
    <div className="commentHolder">
      {activityItemExamples.map((item: { key: string | number }) => (
        <ActivityItem {...item} key={item.key} className={classNames.exampleRoot} />
      ))}

      <div className="commentForm">

      <Label>Review This Product</Label>
      <Rating  max={5} />
      <TextField label="Your Names" required />

      <TextField label="Comment" multiline resizable={false} />

     <div className="articleWriterC">
     <PrimaryButton text="Comment" />
     </div>
      </div>

    </div>
  );
};
