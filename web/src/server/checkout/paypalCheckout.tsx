
import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = (window as any).paypal.Buttons.driver("react", { React, ReactDOM });

export default class PayPal extends React.Component<any> {

  createOrder(data: any, actions: any) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.props.total,
          },
        },
      ],
    });
  }

  onApprove(data: any, actions: any) {
    this.props.setSucess(true)
    return actions.order.capture();
  }

  onError =  (err: any ) => {
    console.error(err);

  }

  render() {
    return (
      <PayPalButton
        createOrder={(data: any, actions: any) => this.createOrder(data, actions)}
        onApprove={(data: any, actions: any) => this.onApprove(data, actions)}
        onError = {(err: any) => this.onError(err)}
      />
    );
  }
}

