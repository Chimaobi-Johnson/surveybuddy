import React, { Component } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import SurveyList from './SurveyList/SurveyList';
import CreateSurvey from '../CreateSurvey/CreateSurvey';
import Credits from './Credits/Credits';
import Paystack from '../../containers/Payments/Paystack';
import PurchaseCredits from './Credits/PurchaseCredits';
import { connect } from  'react-redux';
import { Button } from 'reactstrap';
import * as classes from './Dashboard.module.css';
import DashboardSideBar from '../../components/SideBar/DashboardSideBar';


class Dashboard extends Component {


   render () {
     return (
        <div className={classes.DashboardContainer}>
           <DashboardSideBar />
                 <div className={classes.DashboardMain}>
                   <div className={classes.DashboardInnerBox}>
                      {this.props.children}
                   </div>
                </div>
         </div>
     )
   }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}
export default connect(mapStateToProps)(Dashboard);
