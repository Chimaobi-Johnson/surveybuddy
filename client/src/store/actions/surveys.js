import axios from 'axios';
import * as actionTypes from './actionTypes';

export const saveSurveyEmailDetailsSuccess = response => {
   return {
     type: actionTypes.SAVE_SURVEY_EMAIL_DETAILS_SUCCESS,
     response: response.data
   }
}

export const saveSurveyEmailDetailsFail = err => {
  return {
    type: actionTypes.SAVE_SURVEY_EMAIL_DETAILS_FAIL,
    error: err
  }
}

export const saveSurveyEmailDetails = formdata => {
  return dispatch => {
   axios.post('/api/store_survey_email_details', formdata)
   .then(response => {
     dispatch(saveSurveyEmailDetailsSuccess(response))
   })
   .catch(err => {
     console.log(err);
     dispatch(saveSurveyEmailDetailsFail(err));
   })
  }
}
