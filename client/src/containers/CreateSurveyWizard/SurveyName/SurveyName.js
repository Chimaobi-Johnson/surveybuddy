import React from 'react';
import { Button } from 'reactstrap';
import { Input } from 'reactstrap';

import * as classes from './SurveyName.module.css';

const surveyname = props => {
  let surveyNameBox;
  if(props.surveyNameEditingMode) {
    surveyNameBox = (
      <div className={classes.SurveyNameContainer}>
         <h4>SURVEYNAME:</h4>
         <Input autoFocus
            id="SurveyName"
            type="text"
            value={props.surveyNameText}
            onChange={props.surveyNameChange}
             />
         <Button  onClick={props.saveSurveyName} size="sm">Save</Button>
      </div>
    )
  } else {
    surveyNameBox = (
      <div className={classes.SurveyNameContainer}>
         <h4>SURVEYNAME:</h4>
         <h6>{props.surveyNameText}</h6>
         <Button onClick={props.editSurveyName} size="sm">Edit</Button>
      </div>
    )
  }
  return (
      <>
        {surveyNameBox}
      </>
  )
}

export default surveyname;
