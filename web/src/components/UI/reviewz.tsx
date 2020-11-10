import * as React from 'react';
import { ActivityItem, Icon, Link, mergeStyleSets , PrimaryButton } from 'office-ui-fabric-react';
import { Rating } from 'office-ui-fabric-react/lib/Rating';
import {TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import BackendCalls  from '../../server/backendCalls'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

const backend = new BackendCalls()

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px',
  },
  nameText: {
    fontWeight: 'bold',
  },
});

export class  ActivityItemBasic extends React.Component<any> {
  /* eslint-disable react/jsx-no-bind */

  state = {
    reviews: [],
    name: null,
    stars: 5,
    description: null,
    loading: false 
  }

  getReviews = async() => {
    
    const contentReviews = await backend.getReviews(this.props.review_id)

    if(JSON.stringify(contentReviews.data) === "{}") {
      return;
    }else {
      this.setState({
        reviews: Object.values(contentReviews.data.article.data)
      })
  
    }
  }

  componentDidMount() {
    this.getReviews()
  }

  createReview = async() => {
    const data = {
      name: this.state.name,
      stars: this.state.stars,
      description: this.state.description
    }

    if(Object.values(data).some((ele: any) => ele === null)) {
      alert("fill in All text field to review this product")
    } else {
      
    this.setState({
      loading: true
    })
    await backend.addReview(this.props.review_id, data)

    this.setState({
      loading: false
    })

    this.getReviews()

    }
  }


  render() {

    
  console.log(this.props)
    
    const activityItemExamples = this.state.reviews.map((elem: any, key: React.Key) => {
      return {
       key: key,
       activityDescription: [
         <Link
         key={1}
         className={classNames.nameText}>
          {elem.name}
       </Link>,
       <span key={2}> reviewed </span>,
       ],
       activityIcon: <Icon iconName="SkypeMessage" />,
       comments: [
       <span key={1}> {elem.description}</span>,
       <Rating  readOnly rating={elem.stars} />
   
        ],
       timeStamp: "recently"

      }
 
     })

    return (
      <div className="commentHolder">
        {activityItemExamples.map((item: { key: string | number }) => (
          <ActivityItem {...item} key={item.key} className={classNames.exampleRoot} />
        ))}
  
        <div className="commentForm">
  
        <Label>Review This Product</Label>
        <Rating  max={5}  onChange={(event: any, rate: any) =>  this.setState({stars: rate})} />

        <TextField label="Your Names" required  onChange={(e: any) => this.setState({ name: e.target.value})}/>
  
        <TextField label="Comment" multiline resizable={false}  onChange={(e: any) => this.setState({ description: e.target.value})} />
  
       <div className="articleWriterC">
       {this.state.loading ? <Spinner /> : <PrimaryButton text="Comment" onClick={this.createReview} />}
       </div>
        </div>
  
      </div>
    );
  }
};
