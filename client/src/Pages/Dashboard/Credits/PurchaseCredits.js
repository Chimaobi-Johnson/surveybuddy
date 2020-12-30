import React, { Component } from 'react';
import PaystackButton from 'react-paystack';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';


import * as actions from '../../../store/actions';

import * as classes from './PurchaseCredits.module.css';
import Dashboard from '../Dashboard';

class PurchaseCredits extends Component {

    state = {
      key: "pk_test_0aee7cabff63550857ad264ee06262354a79cf23", //PAYSTACK PUBLIC KEY
      email: '',  // customer email
      amount: 0, //equals NGN100,
      token: ''
    }

    componentDidMount() {
      if(this.props.auth) {
        this.setState({ email: this.props.auth.email })
      }
    }

    callback = (response) => {
      console.log(response); // card charged successfully, get reference here
      const token = { token: response.reference }
      this.setState({ token});
      this.props.handleToken(this.state.token);
    }

    close = () => {
      console.log("Payment closed");
    }

    getReference = () => {
      //you can put any unique reference implementation code here
      let text = "";
      let possible = "jhvgvguy767r65r56fulkjnnu7676vggffyg87t8776t6ygyu-.=";

      for( let i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    changeAmount = event => {
      // console.log(event.target.value);
      let amount;
      amount = event.target.value * 100;
      this.setState({ amount })
    }


    changeEmail = event => {
      this.setState({ email: event.target.value });
    }


  render () {
console.log(this.state);
    return (
              <Dashboard>
                    <div>
                       <img className={classes.CreditCardImg} src={require('../../../assets/images/creditcards.jpg')} alt="image" />
                       <div className={classes.PurchaseCreditsContainer}>
                          <h2>PURCHASE CREDITS</h2>
                          <p>When sending out a survey each recipient cost N5</p>
                          <label htmlFor='email'>Enter Email</label>
                          <Input type='email' name='email' id='email' value={this.state.email} onChange={this.changeEmail} />
                          <label htmlFor='amount'>Enter Amount</label>
                          <input type='number' name='paystackAmount' id='amount' onChange={this.changeAmount} />
                          <div className={classes.PurchaseCreditsBtn}>
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
                          </div>
                       </div>
                    </div>    
               </Dashboard>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleToken: (token) => dispatch(actions.handleToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCredits);
