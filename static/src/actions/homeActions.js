import * as types from './../constants/constants'
import axios from 'axios';

function dataDispatch(data, actionType) {
  return {
    type: actionType,
    payload: data,
  };
}

export function reset(){
  return {
    type: types.RESET
  }
}

function handlError(e){
  return {
    type: types.ERROR,
    payload: e
  };
}

export function saveUserData(data){
  return {
    type: types.SAVE_DATA,
    payload: data
  }
}

export const verify = (data) => {
  return (dispatch) => {

    const path = types.BASE_URL + '/verify_user';

    axios({
      method: 'post',
      url: path,
      data: data,
    })
    .then(response => {
      dispatch(dataDispatch(response.data, types.VERIFY));
    })
    .catch(function (error) {
      dispatch(handlError(error));
    });
  };
}

export const sendData = (data) => {
  return (dispatch) => {

    const path = types.BASE_URL + '/saveData';

    axios({
      method: 'post',
      url: path,
      data: data,
    })
    .then(response => {
      dispatch(dataDispatch(response.data, types.ADD_TO_DB));
    })
    .catch(function (error) {
      dispatch(handlError(error));
    });
  };
}
