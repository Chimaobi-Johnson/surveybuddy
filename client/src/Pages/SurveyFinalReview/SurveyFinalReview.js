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
    // : this.props.location.state.surveyId
    const surveyId = window.location.pathname.split("/")[3];
    console.log(surveyId);
    axios.post('/api/survey_data', { surveyId })
    .then(result => {
       const newSurvey = {...result.data.survey};
       this.setState({ survey: newSurvey });
    })
    .catch(err => {
      console.log(err);
    })
  }

  titleComponent (titleName) {
    return (
      <div className={classes.titleWrapper}>
        <h2>{titleName}</h2>
      </div>
    )
  }

  descriptionComponent (text) {
    return (
      <div className={classes.descrWrapper}>
        <p>{text}</p>
      </div>
    )
  }

  imageComponent (imageUrl) {
    return (
      <div className={classes.imageWrapper}>
        {!imageUrl ? null : <img src={imageUrl} />}
      </div>
    )
  }

  inputComponent (inputLabel) {
    return (
      <div className={classes.inputWrapper}>
        <FormGroup>
            <Label>{inputLabel}</Label>
            <Input
              style={{ borderRadius: 0, height: '1.8rem' }}
              id={inputLabel}
              type="text"
              value=""
            />
        </FormGroup>
      </div>
    )
  }

  checkboxComponent (surveyCheckboxQuestion, checkboxNames) {
    return (
      <div className={classes.checkboxWrapper}>
        <FormGroup>
          <Label for="exampleCheckbox">{surveyCheckboxQuestion}</Label>
          <div>
          {Object.keys(checkboxNames).map(key => (
            <CustomInput key={Math.random()} type="checkbox" id="exampleCustomInline2" label={`${key}`} inline />
          ))}
          </div>
        </FormGroup>
      </div>
    )
  }

  radioOptionsComponent (radioQuestion, radioOptions) {
    return (
      <div className={classes.radioWrapper}>
        <FormGroup tag="fieldset">
          <legend style={{ fontSize: '1rem' }}></legend>
          <FormGroup>
          <Label for="exampleCheckbox">{radioQuestion}</Label>
          <div>
          {Object.keys(radioOptions).map(key => (
            <CustomInput key={Math.random()} value={false} type="radio" id="exampleCustomRadio" name="customRadio" label={key} inline />
          ))}
        </div>
          </FormGroup>
        </FormGroup>
      </div>
    )
  }

  renderFooterContent () {
    if(this.state.survey) {
      return (
        <div id="surveyFooter" className={classes.footerWrapper}>
          <div className={classes.footerLine}></div>
          <p>{this.state.survey.surveyFooterText}</p>
        </div>
      )
    }
  }

  renderFormContent() {
    // if(this.state.survey) {
      return (
        <div className={classes.FormBox}>
          <div className={classes.InnerFormBox}>
            <div style={{ textAlign: 'left' }}>
              {this.state.survey ? this.state.survey.surveyDataArray.map(item => {
                if(item.identifier === 'title') {
                  return this.titleComponent(item.text);
                } else if (item.identifier === 'descr') {
                  return this.descriptionComponent(item.text)
                } else if (item.identifier === 'input') {
                  return this.inputComponent(item.text)
                } else if (item.identifier === 'image') {
                  return this.imageComponent(item.imagePreviewUrl)
                } else if (item.identifier === 'checkbox') {
                  return this.checkboxComponent(item.question, item.checkboxNames)
                } else if (item.identifier === 'radio') {
                  return this.radioOptionsComponent(item.question, item.options)
                } else {
                  return
                }
              }) : null}
            </div>
            <div style={{ marginTop: 'auto' }}>
              {this.renderFooterContent()}
            </div> 
          </div>
        </div>
      )
    // }
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
