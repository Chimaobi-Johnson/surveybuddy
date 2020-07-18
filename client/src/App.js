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

class App extends Component {

  componentDidMount () {

    //  this.props.authenticateUser();
      // const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const email = localStorage.getItem('email');
      const firstName = localStorage.getItem('firstName');
      const displayName = localStorage.getItem('displayName');
      const profilePhoto = localStorage.getItem('profilePhoto');
      const googleId = localStorage.getItem('googleId');
      const facebookId = localStorage.getItem('facebookId');
      const expiryDate = localStorage.getItem('expiryDate');

      if (!expiryDate || !googleId || !facebookId) {
        axios.get('/api/current_user')
        .then(response => {
          if(!response) {
            return;
          }
          // remove any data that might exist
          localStorage.removeItem('expiryDate');
          localStorage.removeItem('userId');
          localStorage.removeItem('facebookId');
          localStorage.removeItem('googleId');
          localStorage.removeItem('profilePhoto');
          localStorage.removeItem('displayName');
          localStorage.removeItem('firstName');
          localStorage.removeItem('email');

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

          localStorage.setItem('googleId', response.data.user.googleId);
          localStorage.setItem('facebookId', response.data.user.facebookId);
          localStorage.setItem('userId', response.data.user._id);
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('firstName', response.data.user.firstName);
          localStorage.setItem('displayName', response.data.user.displayName);
          localStorage.setItem('profilePhoto', response.data.user.profilePhoto);
          // set one hour expiration time
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          this.setAutoLogout(remainingMilliseconds);
        })
        .catch(err => {
          console.log(err);
        })
      } else {

        const remainingMilliseconds =
           new Date(expiryDate).getTime() - new Date().getTime();

           this.props.storeLoginData({
             isAuth: true,
             userId: userId,
             firstName: firstName,
             email: email,
             googleId: googleId,
             facebookId: facebookId,
             displayName: displayName,
             profilePhoto: profilePhoto
           })

         this.setAutoLogout(remainingMilliseconds);
    }

  }  // end of componentDidMount


    setAutoLogout = milliseconds => {
      setTimeout(() => {
        this.logoutHandler()
      }, milliseconds)
    }

    logoutHandler = () => {
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('userId');
      localStorage.removeItem('facebookId');
      localStorage.removeItem('googleId');
      localStorage.removeItem('profilePhoto');
      localStorage.removeItem('displayName');
      localStorage.removeItem('firstName');
      localStorage.removeItem('email');
      this.props.storeLoginData({
        isAuth: false
      })
      this.props.history.push('/api/logout');
    };

  render() {
     let routes;
     routes = (
       <Switch>
         <Route path="/surveys/credits/new" component={PurchaseCredits} />
         <Route path="/surveys/credits" component={Credits} />
         <Route path="/surveys/surveylist" component={SurveyList} />
         <Route path="/surveys/review_final" component={SurveyFinalReview} />
         <Route path="/surveys/customize_email" component={CustomizeEmail} />
         <Route path="/surveys/new" component={CreateSurvey} />
         <Route path="/surveys" component={Dashboard} />
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
