import * as types from './../constants/constants'
import axios from 'axios';

function dataDispatch(data, actionType) {
  return {
    type: actionType,
    payload: data,
  };
}

function error(e){
  return {
    type: types.ERROR_CAMERA
  };
}

export function reset(){
  return {
    type: types.RESET
  }
}

// create build lis
export const saveImage = (listData) => {
  return (dispatch) => {

    const path = types.BASE_URL + '/build_list/create_list';

    axios({
      method: 'post',
      url: path,
      data: listData,
    })
    .then(response => {
      dispatch(dataDispatch(response.data, types.SAVE_IMAGE));
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}
