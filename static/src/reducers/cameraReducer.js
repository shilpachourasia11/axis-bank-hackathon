import { VERIFY_IMAGE } from '../constants/constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [VERIFY_IMAGE]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        })
});
