import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'reactstrap';
import DashboardSideBar from  '../../../components/SideBar/DashboardSideBar';

import * as classes from './Credits.module.css';
import Dashboard from '../Dashboard';

class Credits extends Component {

  state = {
    paymentList: null,
    error: false
  }

  componentDidMount () {
     axios.get('/api/payments').then(result => {
       console.log(result);
       this.setState({ paymentList: result.data.paymentList });
     })
     .catch(err => {
       console.log(err);
       this.setState({ error: true });
     })
  }

  renderPaymentList () {
    let paymentList;
    if (this.state.paymentList) {
        paymentList = this.state.paymentList.map(list => {
          return (
            <div className={classes.PaymentBoxes}>
              <h2>AMOUNT PAID: <span style={{ color: 'red' }}>{list.amount}</span></h2>
              <h3>status: <span style={{ color: 'green' }}>{list.paymentStatus}</span></h3>
              <div className={classes.PaymentBoxLeft}>
                 <ul>
                    <li>email: {list.email}</li>
                    <li>phone: {list.phone}</li>
                    <li>Paid At: {list.paidAt}</li>
                 <li>Currency: {list.currency}</li>
                 <li>Channel: {list.channel}</li>
                 <li>Bank: {list.bank}</li>
               </ul>
              </div>

            </div>
          )
       })
    } else {
      paymentList = <h3>Loading...</h3>
    }

    return paymentList;
  }

  render () {

    return (
            <Dashboard>
              <div className={classes.Credits}>
                <h2>CREDITS</h2>
                <h3>YOU CURRENTLY HAVE <span style={{ color: 'green', fontWeight: 'bold' }}>{this.props.auth.credits}</span> CREDITS</h3>
                <p>1 credit equals one client. this means that you can send your survey to <span style={{ color: 'green', fontWeight: 'bold' }}>{this.props.auth.credits}</span> of your clients</p>
                <h4 style={{ textAlign: 'center', backgroundColor: '#282f40', padding: '.5rem', color: 'rgba(255,255,255,.9)', fontSize: '1rem' }}>The following are the list of payments you've made</h4>

                <div className={classes.Payments}>
                  {this.renderPaymentList()}
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

export default connect(mapStateToProps)(Credits);
