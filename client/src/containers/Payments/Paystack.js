import React, { Component } from 'react';
//import the library
import PaystackButton from 'react-paystack';

class Paystack extends Component {

  state = {
    key: "pk_test_0aee7cabff63550857ad264ee06262354a79cf23", //PAYSTACK PUBLIC KEY
    email: "woguchimaobi@gmail.com",  // customer email
    amount: 10000 //equals NGN100,
  }

  callback = (response) => {
    console.log(response); // card charged successfully, get reference here
  }

  close = () => {
    console.log("Payment closed");
  }

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible = "jhvgvguy767r65r56fuyg87t8776t6ygyu-.=";

    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  render() {
    return (
      <div>
        <p>
          <PaystackButton
            text="Make Payment"
            className="payButton"
            callback={this.callback}
            close={this.close}
            disabled={false}
            embed={false}
            reference={this.getReference()}
            email={this.state.email}
            amount={this.state.amount}
            paystackkey={this.state.key}
            tag="button"
          />
        </p>
      </div>
    );
  }
}

export default Paystack;
