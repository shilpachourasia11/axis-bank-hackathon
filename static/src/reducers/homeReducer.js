import { SAVE_IMAGE,
RESET,
VERIFY_IMAGE,
ERROR_CAMERA,
SAVE_AUDIO,
ERROR_RECORDER,
SAVE_DATA,
ADD_TO_DB,
VERIFY } from '../constants/constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    error: false,
    userData: {}
};

export default createReducer(initialState, {
    [VERIFY_IMAGE]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
            error: false
        }),
    [SAVE_AUDIO]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            loaded: true,
            error: false,
        }),
    [ERROR_CAMERA]: (state, payload) =>
        Object.assign({}, state, {
            loaded: false,
            error: true,
        }),
    [ERROR_RECORDER]: (state, payload) =>
        Object.assign({}, state, {
            loaded: false,
            error: true,
        }),
    [SAVE_DATA]: (state, payload) =>
        Object.assign({}, state, {
            userData: payload
        }),
});
