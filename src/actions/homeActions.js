import * as types from './../constants'

export function saveImage(data) {
  return {
    type: types.SAVE_IMAGE,
    payload: data
  }
}

export function reset(){
  return {
    type: types.RESET
  }
}
