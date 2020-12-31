import React, { Component} from 'react';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.min.css";
import "./assets/css/argon-design-system-react.css.map";

import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as actions from './store/actions';
import axios from 'axios';

import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Home from './Pages';
import CreateSurvey from './Pages/CreateSurvey/CreateSurvey';
import Dashboard from './Pages/Dashboard/Dashboard';
import CustomizeEmail from './Pages/CustomizeEmail/CustomizeEmail';
import SurveyFinalReview from './Pages/SurveyFinalReview/SurveyFinalReview';
import Credits from './Pages/Dashboard/Credits/Credits';
import PurchaseCredits from './Pages/Dashboard/Credits/PurchaseCredits';
import SurveyList from './Pages/Dashboard/SurveyList/SurveyList';
import SurveyResponse from './Pages/SurveyResponse/SurveyResponse';
import SubmitSuccess from './Pages/SurveyResponse/SubmitSuccess';
import ResponseList from './Pages/Dashboard/Response/ResponseList/ResponseList';

class App extends Component {

  componentDidMount () {

    //  this.props.authenticateUser();
      // const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const googleId = localStorage.getItem('googleId');
      const expiryDate = localStorage.getItem('expiryDate');

        axios.get('/api/current_user')
        .then(response => {
          if(!response) {
            return;
          }
          // remove any data that might exist
          // localStorage.removeItem('googleId');

          // store data to redux
          this.props.storeLoginData({
            isAuth: true,
            googleId: response.data.user.googleId,
            facebookId: response.data.user.facebookId,
            userId: response.data.user._id,
            email: response.data.user.email,
            firstName: response.data.user.firstName,
            displayName: response.data.user.displayName,
            profilePhoto: response.data.user.profilePhoto,
            surveyNo: response.data.surveyNo,
            credits: response.data.user.credits
          })

          // localStorage.setItem('googleId', response.data.user.googleId);

          // set one hour expiration time
          // const remainingMilliseconds = 60 * 60 * 1000;
          // const expiryDate = new Date(
          //   new Date().getTime() + remainingMilliseconds
          // );
          // localStorage.setItem('expiryDate', expiryDate.toISOString());
          // this.setAutoLogout(remainingMilliseconds);
        })
        .catch(err => {
          console.log(err);
        })


  }  // end of componentDidMount


    setAutoLogout = milliseconds => {
      setTimeout(() => {
        this.logoutHandler()
      }, milliseconds)
    }

    logoutHandler = () => {
      localStorage.removeItem('googleId');
      this.props.storeLoginData({
        isAuth: false
      })
      this.props.history.push('/api/logout');
    };

  render() {
     let routes;
     routes = (
       <Switch>
         <Route path='/survey/responses/:id' component={ResponseList} />
         <Route path='/survey/respond/success' component={SubmitSuccess} />
         <Route path="/survey/respond/:id" component={SurveyResponse} />
         <Route path="/surveys/credits/new" component={PurchaseCredits} />
         <Route path="/surveys/credits" component={Credits} />
         <Route path="/surveys/surveylist" component={SurveyList} />
         <Route path="/surveys/review_final/:id" component={SurveyFinalReview} />
         <Route path="/surveys/customize_email" component={CustomizeEmail} />
         <Route path="/surveys/new" component={CreateSurvey} />
         <Route path="/surveys" component={SurveyList} />
         <Route path="/" exact component={Home} />
         <Redirect to="/" />
       </Switch>
     )
    return (
      <div className="App">
        <Navbar />
        {routes}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
  //  authenticateUser: () => dispatch(actions.fetchUser()),
    storeLoginData: (loginData) => dispatch(actions.storeLoginData(loginData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
