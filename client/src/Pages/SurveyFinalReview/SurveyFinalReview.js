import React, { Component } from 'react';
import { Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import * as classes from './SurveyFinalReview.module.css';


class SurveyFinalReview extends Component {

  state = {
    survey: null
  }

  componentDidMount() {
    axios.post('/api/survey_data', {surveyId: this.props.location.state.surveyId})
    .then(result => {
       const newSurvey = {...result.data.survey};
       this.setState({ survey: newSurvey });
    })
    .catch(err => {
      console.log(err);
    })
  }


    renderSurveyCheckbox() {
     let checkboxItems, checkboxDeleteBtn;
      return Object.values(this.state.survey.surveyCheckboxes).map(checkboxObj => {
        if(checkboxObj.surveyCheckboxNames) {
          // To render checkbox items
          checkboxItems = Object.keys(checkboxObj.surveyCheckboxNames)
          .map(checkbox => {
            return <CustomInput type="checkbox" id="exampleCustomInline2" label={checkbox} inline />
          });
        }
        return (
          <>
            <h4>{checkboxObj.surveyCheckboxQuestion}</h4>
            {checkboxItems}
          </>
        )
      })
    }

    renderSurveyRadioOptions() {
        return Object.values(this.state.survey.surveyRadioOptions).map(radioObj => {
          if(radioObj.surveyRadioOptionNames.length !== 0) {
            return (
              <div key={Math.random()}>
               <FormGroup tag="fieldset">
                <legend style={{ fontSize: '1rem' }}></legend>
                <FormGroup>
                <Label for="exampleCheckbox">{radioObj.surveyRadioQuestion}</Label>
                <div>
                  <CustomInput value={radioObj.surveyRadioOptionNames[0]} type="radio" id="exampleCustomRadio" name="customRadio" label={radioObj.surveyRadioOptionNames[0]} inline />
                  <CustomInput value={radioObj.surveyRadioOptionNames[1]} type="radio" id="exampleCustomRadio2" name="customRadio" label={radioObj.surveyRadioOptionNames[1]} inline />
                  <Button size='sm' onClick={(radio) => this.deleteSurveyRadioOptionHandler(radioObj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
                </div>
                </FormGroup>
                </FormGroup>
                </div>
              )
          }
        });
    }

  renderSurveyInputs() {
    if(this.state.survey.surveyInputs) {
    return (
      <div id="inputArea" className={classes.InputArea}>
      {
        Object.keys(this.state.survey.surveyInputs).map(key => {
               return (<Input
                  key={key + new Date().getMilliseconds()}
                  id={key}
                  type="text"
                  placeholder={this.state.survey.surveyInputs[key]}
                />
              )
      })
      }
      </div>
    )
  }
  }

  renderFormContent() {
    if(this.state.survey) {
      return (
        <div className={classes.FormBox}>
         <div className={classes.InnerFormBox}>
          <h2>{this.state.survey.surveyTitleText ? this.state.survey.surveyTitleText : null}</h2>
          <p>{this.state.survey.surveyDescrText ? this.state.survey.surveyDescrText : null}</p>
          <div className={classes.SurveyImageBox}>
             {!this.state.survey.imageUrl ? null : <img alt="survey image" src={this.state.survey.imageUrl} />}
          </div>
            {this.renderSurveyInputs()}
          <div>
           {this.renderSurveyCheckbox()}
           {this.renderSurveyRadioOptions()}
          </div>
          <div className={classes.SurveyFooterText}>{this.state.survey.surveyFooterText ? this.state.survey.surveyFooterText : null}</div>
        </div>
        </div>
      )
    }
  }

  render () {

    console.log(this.state);

    let reviewData = <h3>Loading...</h3>;

    if(this.state.survey) {
      reviewData = (
        <div className={classes.SurveyContainer}>
        <div className={classes.SideBarContainer}>
         <SideBar>
           <Button className={classes.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i></Button>
           <div style={{ textAlign: 'center' }}>

           <div className={classes.EmailData}>
             <h3>SurveyName</h3>
             <div>{this.state.survey.surveyName ? this.state.survey.surveyName : null}</div>
             <h3>EMAIL SUBJECT</h3>
             <div>{this.state.survey.emailSubject ? this.state.survey.emailSubject : null}</div>
             <h3>EMAIL BODY</h3>
             <div>
              <p>{this.state.survey.emailBody ? this.state.survey.emailBody : null}</p>
              <br />
              <p style={{ fontStyle: 'italic', fontSize: '.7rem' }}>Please click on the link below to start survey <a href="#">Start Survey</a></p>
              </div>
             <h3>EMAIL RECIPIENTS</h3>
             <div>{this.state.survey.emailRecipients ? this.state.survey.emailRecipients.map(recipient => recipient) : null}</div>
             </div>
           </div>
         </SideBar>
         </div>
         <div className={classes.DashboardContainer}>
               <div className={classes.DashboardMain}>
               <a href="#" className={classes.NextBtn}>SEND OUT SURVEY</a>
               <a href="/surveys" className={classes.SendLaterBtn}>SEND LATER</a>
               <div className={classes.DashboardInnerBox}>
                  {this.renderFormContent()}
               </div>
               </div>
         </div>
         </div>
      )
    }

    return (
           <div>
             {reviewData}
           </div>
    )
  }
}

export default SurveyFinalReview;
