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
    type: types.ERROR_RECORDER
  };
}
//
// export function reset(){
//   return {
//     type: types.RESET
//   }
// }

// create build lis
export const sendAUdio = (audio) => {
  return (dispatch) => {

    const path = types.BASE_URL + '/build_list/create_list';

    axios({
      method: 'post',
      url: path,
      data: audio,
    })
    .then(response => {
      dispatch(dataDispatch(response.data, types.SAVE_AUDIO));
    })
    .catch(function (error) {
      console.log(error);
    });
  };
}
