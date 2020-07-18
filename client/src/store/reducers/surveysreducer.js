import * as actionTypes from '../actions/actionTypes';

const initialState = {
  emailDetails: null,
  emailDetailsFail: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SURVEY_EMAIL_DETAILS_SUCCESS:
        return {
          emailDetails: action.response
        }
        case actionTypes.SAVE_SURVEY_EMAIL_DETAILS_FAIL:
        return {
          emailDetailsFail: true
        }
        default:
          return state;
    }
}

export default reducer;
