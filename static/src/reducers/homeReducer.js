import {
  ERROR,
  VERIFY,
  SAVE_DATA,
  ADD_TO_DB,
  RESET
} from '../constants/constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    error: false,
    message: "",
    userData: {},
    success: false,
    verifiedData: {},
    verified: false
};

export default createReducer(initialState, {
    [ADD_TO_DB]: (state, payload) =>{
      if(payload.type === 'error'){
        return Object.assign({}, state, {
          loaded: true,
          error: true,
          message: payload.message,
          success: false
        })
      }
      else{
        return Object.assign({}, state, {
          error: false,
          message: payload.message,
          success: true
        });
      }
    },
    [ERROR]: (state, payload) =>
        Object.assign({}, state, {
            loaded: false,
            error: true,
            message: "Unexpected error, Please try again."
        }),
    [VERIFY]: (state, payload) => {
      if(payload.type === 'error'){
        return Object.assign({}, state, {
          loaded: true,
          error: true,
          message: payload.message,
          success: false
        })
      }
      else{
        return Object.assign({}, state, {
          error: false,
          verifiedData: JSON.parse(payload.message),
          verified: true
        });
      }
    },
    [SAVE_DATA]: (state, payload) =>
        Object.assign({}, state, {
            userData: payload
        }),
    [RESET]: (state, payload) =>
        Object.assign({}, state, {
            error: false,
            success: false,
            verified: false
        }),
});
