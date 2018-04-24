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
    userData: {}
};

export default createReducer(initialState, {
    [ADD_TO_DB]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            loaded: true,
            error: false,
        }),
    [ERROR]: (state, payload) =>
        Object.assign({}, state, {
            loaded: false,
            error: true,
        }),
    [VERIFY]: (state, payload) =>
        Object.assign({}, state, {
            loaded: false,
            error: false,
        }),
    [SAVE_DATA]: (state, payload) =>
        Object.assign({}, state, {
            userData: payload
        }),
    [RESET]: (state, payload) =>
        Object.assign({}, state, {
            error: false
        }),
});
