import * as React from 'react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import {ActivityItemBasic } from './reviewz'
import BackendsCalls from '../../server/backendCalls'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { ProductDsiplayer } from './displayProAndContentz'

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};


const backend = new BackendsCalls()



export class PivotIconCountExample extends React.Component<any>{

  state = {
    products: [],
    body: "loading.."
  }
  
  async componentDidMount () {

  const backData = await backend.GetProducts()
  this.setState({
    products: backData.data.products,
    body: this.props.info.description
  })
}


 render() {
   console.log()
  return (
    <div>
      <Pivot>
        <PivotItem headerText="Description"  itemIcon="Info">
        <Label styles={labelStyles}> <p style={{textAlign: "start", color: "white"}}  dangerouslySetInnerHTML={{__html: this.state.body}} ></p></Label>
        </PivotItem>
       
        <PivotItem headerText="Reviews" itemIcon="Starburst">
          <ActivityItemBasic review_id={this.props.info.review_id} />
        </PivotItem>
        <PivotItem headerText="Related" itemIcon="Product" itemCount={this.state.products.length}>
          { this.state.products.length > 1  ? <ProductDsiplayer products={this.state.products} /> : <ProgressIndicator />}
        </PivotItem>
        
      </Pivot>
    </div>
  );
 }
};

