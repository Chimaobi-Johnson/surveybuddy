import React, { Component } from 'react';
import { Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';
import axios from 'axios';

import SideBar from '../../components/SideBar/SideBar';
import loader from '../../assets/images/gifs/pulse.gif';
import { Modal } from 'reactstrap';

import * as classes from './SurveyResponse.module.css';
import { withRouter } from 'react-router';


class SurveyResponse extends Component {

  state = {
    survey: null,
    loading: false,
  }

  componentDidMount() {
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

  changeInputHandler = (e, obj) => {

      const surveyDataArray = [...this.state.survey.surveyDataArray];
    //   const surveyInputs = { ...this.state.survey.surveyInputs };
      surveyDataArray.map(item => {
          if(item.id == obj.id) {
              item.value = e.target.value
          }
      })
    //   surveyInputs[obj.text] = e.target.value
      this.setState({ survey: {
          ...this.state.survey,
          surveyDataArray
      }})

  }

  changeCheckboxHandler = (key, obj) => {
    const surveyDataArray = [...this.state.survey.surveyDataArray];
    surveyDataArray.map(item => {
        if(item.id == obj.id) {
            item.checkboxNames[key] = !obj.checkboxNames[key]
        }
    })
    this.setState({ survey: {
        ...this.state.survey,
        surveyDataArray,
    }})
  }

  changeRadioOptionsHandler = (e, obj) => {
    const surveyDataArray = [...this.state.survey.surveyDataArray];
    surveyDataArray.map(item => {
        if(item.id == obj.id) {
            item.value = e.target.value
        }
    })
    this.setState({ survey: {
        ...this.state.survey,
        surveyDataArray,
    }})
  }

  titleComponent (obj) {
    return (
      <div className={classes.titleWrapper}>
        <h2>{obj.text}</h2>
      </div>
    )
  }

  descriptionComponent (obj) {
    return (
      <div className={classes.descrWrapper}>
        <p>{obj.text}</p>
      </div>
    )
  }

  imageComponent (obj) {
    return (
      <div className={classes.imageWrapper}>
        {!obj.imagePreviewUrl ? null : <img src={obj.imagePreviewUrl} />}
      </div>
    )
  }

  inputComponent (obj) {
    return (
      <div className={classes.inputWrapper}>
        <FormGroup>
            <Label>{obj.text}</Label>
            <Input
              style={{ borderRadius: 0, height: '1.8rem' }}
              id={Math.random()}
              type="text"
              onChange={(e, arg) => this.changeInputHandler(e, obj)}
              value={obj.value}
            />
        </FormGroup>
      </div>
    )
  }

  checkboxComponent (obj) {
    return (
      <div className={classes.checkboxWrapper}>
        <FormGroup>
          <Label for="exampleCheckbox">{obj.question}</Label>
          <div>
          {Object.keys(obj.checkboxNames).map(key => (
            <CustomInput key={Math.random()} onClick={(arg1, arg2) => this.changeCheckboxHandler(key, obj)} name={`${key}`} type="checkbox" checked={obj.checkboxNames[key]} id={`${key}`} label={`${key}`} inline />
          ))}
          </div>
        </FormGroup>
      </div>
    )
  }

  radioOptionsComponent (obj) {
    return (
      <div className={classes.radioWrapper}>
        <FormGroup tag="fieldset">
          <legend style={{ fontSize: '1rem' }}></legend>
          <FormGroup>
          <Label for="exampleCheckbox">{obj.question}</Label>
          <div>
          {Object.keys(obj.options).map(key => (
            <CustomInput key={Math.random()} type="radio" checked={key == obj.value} value={`${key}`} onChange={(e, arg) => this.changeRadioOptionsHandler(e, obj)} id={Math.random()} name={obj.question} label={key} inline />
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
      return (
        <div className={classes.FormBox}>
          <div className={classes.InnerFormBox}>
            <div style={{ textAlign: 'left' }}>
              {this.state.survey ? this.state.survey.surveyDataArray.map(item => {
                if(item.identifier === 'title') {
                  return this.titleComponent(item);
                } else if (item.identifier === 'descr') {
                  return this.descriptionComponent(item)
                } else if (item.identifier === 'input') {
                  return this.inputComponent(item)
                } else if (item.identifier === 'image') {
                  return this.imageComponent(item)
                } else if (item.identifier === 'checkbox') {
                  return this.checkboxComponent(item)
                } else if (item.identifier === 'radio') {
                  return this.radioOptionsComponent(item)
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
  }

  render () {

    console.log(this.state);

    if(!this.state.survey) {
         return <h3>Loading...</h3>;
    }

    return (
        <div className={classes.SurveyContainer}>
            {this.state.loading ? <div className={classes.LoadingBox}><img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px'}} src={loader} alt="" /><p style={{display: 'block', fontWeight: 'bold',  position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)'}}>Sending...</p></div> : null}
            <div className={classes.DashboardContainer}>
                <div className={classes.DashboardMain}>
                <div className={classes.DashboardInnerBox}>
                    {this.renderFormContent()}
                </div>
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(SurveyResponse);
