import * as types from './../constants'

const homeReducer = ( state = {
	allImages: localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [],
	dataReady: localStorage.getItem('images') ? true : false,
	error: false,
	loading: false,
} , action) => {
	switch (action.type){
		case types.SAVE_IMAGE:
			let allData = localStorage.getItem('images');
			if(!allData){
				allData = []
			}
			else {
				allData = JSON.parse(allData)
			}
			allData.push({
				imageUrl: action.payload
			})
			try {
				localStorage.setItem('images',JSON.stringify(allData));
			}
			catch(e){
				console.log(e)
			}
			return state = {
				...state,
				allImages: allData,
				dataReady: true
			}
		case types.RESET:
			return state ={
				...state,
				dataReady: false,
				error: false
			}
		default:
			return state
	}
}

export default homeReducer
