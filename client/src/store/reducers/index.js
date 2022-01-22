
import {
  GET_DOGS,
	GET_TEMPS,
	ADD_FILTER_TEMP,
	REMOVE_FILTER_TEMP,
	SET_OPT_ORDER,
	SET_CONNECT,
	SET_SEARCH_NAME

} from '../actions';

import { sortDogs, filterByTemps } from '../../helpers/filterFunc';



const initialState = {
	dogs: [],
	temps: [],
	filterTemps: [],
	optOrder: 1,
	connect: 'dataAll',
	searchName: ''

}

const rootReducer = (state = initialState, {type, payload}) => {

	switch(type) {

		case GET_DOGS:

			payload = sortDogs(state.optOrder, payload);

		

			payload = filterByTemps(state.filterTemps, payload);

			return {
				...state,
				dogs: payload
			}
		case GET_TEMPS:

			return {
				...state,
				temps: payload
			}

		case ADD_FILTER_TEMP:

			return {
				...state,
				dogs: state.dogs.filter(el => el.temps.includes(payload)),
				temps: state.temps.filter(el => el !== payload),
				filterTemps: [payload, ...state.filterTemps]
			}

		case REMOVE_FILTER_TEMP:

			return {
				...state,
				temps: [payload, ...state.temps],
				filterTemps: state.filterTemps.filter(el => el !== payload)
			}
		
		case SET_OPT_ORDER:

			return {
				...state,
				optOrder: payload,
				dogs: [...sortDogs(payload, state.dogs)]
			}

		case SET_CONNECT:

			return {
				...state,
				connect: payload
			}

		case SET_SEARCH_NAME:

			return {
				...state,
				searchName: payload
			}
		
		default:
			return state;
	}
}

export default rootReducer;
