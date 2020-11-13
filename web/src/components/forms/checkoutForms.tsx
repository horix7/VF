import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import MomoPic from '../../assets/momo.png'
import PayPal from '../../assets/paypal.png'
import { ActionButton, PrimaryButton , MessageBar, MessageBarType  } from 'office-ui-fabric-react';
import PayPalCheckout from '../../server/checkout/paypalCheckout'
import axios from 'axios'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import BackendCalls from '../../server/backendCalls'

const backend = new BackendCalls()


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

export class ShippingAddress extends React.Component<any> {

  state: { [key: string] : any } = {
        shippingAddress: {}
  }

  updateInputs = (event: any) => {
    const newShippingAddress: { [key: string] : any }  = {...this.state.shippingAddress}

    newShippingAddress[event.target.name] = event.target.value 

    this.setState({
      shippingAddress: {...newShippingAddress}
    })

  }

  componentDidMount() {
    if(localStorage.address) {
      this.setState({
        shippingAddress: JSON.parse(localStorage.address)
      })
    }
  }

  checkAllAndSubmit = () => {
    if(Object.keys(this.state.shippingAddress).length === 7) {
      localStorage.setItem("address", JSON.stringify(this.state.shippingAddress))
      this.props.next()
    } else {
      alert("Missing Some Information")
    }
  }
render() {
  return (
    <div className="formHolder">

  <Stack className="efak" horizontal tokens={stackTokens} styles={stackStyles}>
   <div>
   <Stack {...columnProps}>
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.names} name="names" label="Your Names" required />
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.number} name="number" label="Phone Number" required type="phone" mask="m\ask: (999) 999 - 9999"  />
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.email} name="email"  label="Your Email "  required />
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.country} name="country" label="Your Country " iconProps={iconProps} required />
      
    </Stack> 

   </div>
   
   <div>
   <Stack className="efakk" {...columnProps}>       
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.address} name="address" placeholder="Street Address" required/>
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.neighborhood} name="neighborhood" placeholder="Neighborhood Name " required/>
      <TextField onChange={this.updateInputs} value={this.state.shippingAddress.house} name="house" placeholder="House Number" required/>
    </Stack> 
    
   </div>
  <div className="backAnext">
    <PrimaryButton text="next" onClick={this.checkAllAndSubmit} />
  </div>  
  </Stack>

  </div>

);
}
};


export const PaymentForm: React.FunctionComponent<any> = (props: any) => {
    const [key, setKey ] = React.useState("MOMO")

    const [sucess, setScucess] = React.useState(true) 
    const [loadingBtn, setLoading] = React.useState(false)
    const [loadinNext, setLoadNext] = React.useState(false)
    const [label, setLabel] = React.useState("Requesting Payment")
    const [phone, setphone] = React.useState(null)
    const [errorMade, seterrorMade] = React.useState(false)
    

    const checkAllAndSubmit = async() => {
      if(sucess) {
        setLoadNext(true)
        const createOrder = await backend.CreateAnOrder({
          user: {...JSON.parse(localStorage.address), total: props.total},
          data: JSON.parse(localStorage.cart)
        })

        if(createOrder.status === 201) {
         
          props.next()
        }

        console.log(createOrder)
        
      }
      else alert("payment not made")
    }

    const  chechStatusMomo = (id: string) => {
      let link = `https://sawafitness.herokuapp.com/api/payment/${id}`
      axios({
          method: 'get',
          url: link,
      })
          .then((response: any ) => {
            console.log(response.data)
              if (response.data.token === "pending") {
                  setLabel("Verify Payment On Your Mobile ")
                  chechStatusMomo(id)
  
  
              } else if (response.data.token === "failed") {
                 
                  setLoading(false)

                  seterrorMade(true)
  
              } else if (response.data.token === "successful") {
                setLoading(false)
                setScucess(true)
              }
  
          }).catch(err => {
            setLabel("You Took Too long To Confirm")
            setTimeout(() => {
              setLoading(false)
              seterrorMade(true)
            }, 2000);
          })
  
  }
  

  
   const payMomo = async ( ) => {
  
      let postForPayment = {
          "trxRef": `${new Date().getTime()}-${Math.round(Math.random() * 10000123123141000).toString()}`,
          "channelId": "momo-mtn-rw",
          "accountId": "6f5b098a-d46c-403c-b596-14181a054a87",
          "msisdn": phone,
          "amount": 100,
          "callback": "https://sawafitness.herokuapp.com/"
      }
      setLoading(true)

  
      parseFloat(props.total)

         try {
          const paymentReq = await axios.post("https://sawafitness.herokuapp.com/api/payment/", postForPayment)

 
          if (paymentReq.data.data.state === "processing") {
            chechStatusMomo(postForPayment.trxRef)
          } else {
            seterrorMade(true)

            setLoading(false)
          }
         } catch (error) {
         
          seterrorMade(true)
          setLoading(false)

           
         }
     
  }
      

    return (
   <> 
    <div className="formHolder">
     
      <div  className="efak2" >
        <div>
        <ChoiceGroup  defaultSelectedKey="MOMO" selectedKey={key} options={options} onChanged={(event: any ) => setKey(event.key)} />
        </div>
        <div>
        <div className="pricePresent">
        Paying <span> ${props.total}</span>
      </div>
        
        {errorMade ?  <MessageBar
         
         messageBarType={MessageBarType.error}
         isMultiline={false}
         >
         something went wrong 
        
       </MessageBar> : null }
        {sucess ? <> 
          <MessageBar
         
          messageBarType={MessageBarType.success}
          isMultiline={false}
          >
          Your Payment Was Made SuccesFull Click Next To finish the checkout 
         
        </MessageBar>
        </>: 
        <>
         { key === "MOMO" ? <>
         <TextField label="Your Phone Number " type="number" onChange={(event: any ) => setphone(event.target.value)} />
         { loadingBtn ? <div className="paymentLoader"><ProgressIndicator  description={label} /> </div> :<PrimaryButton className="articleWriterC" text="Pay" onClick={payMomo}/>}
          </> : 
          <PayPalCheckout total={props.total} setSucess={setScucess} /> }
         
         </>}

        </div>

        </div>
      
      </div>
      <div className="backAnext">
        <ActionButton text="back" onClick={props.back} />
         { loadinNext ? <ProgressIndicator /> : <PrimaryButton text="next" onClick={checkAllAndSubmit} />}
        </div>
      </>

    );
  };
  