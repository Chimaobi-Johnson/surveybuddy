import * as actionTypes from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_SUCCESS:
        return !isEmpty(action.user) ? action.user : false
        case actionTypes.FETCH_USER_FAIL:
        return false
        case actionTypes.STORE_LOGIN_DATA:
        return action.loginData
        default:
        return state;
    }
}

export default authReducer;
