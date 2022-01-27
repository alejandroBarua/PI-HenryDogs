
import {
  GET_DOGS,
	GET_TEMPS,
	ADD_FILTER_TEMP,
	REMOVE_FILTER_TEMP,
	SET_OPT_ORDER,
	SET_CONNECT,
	SET_SEARCH_NAME,
	SET_PAGE,
	SERVER_ERROR,
	GET_ONEDOG,
	GET_DOG_NAMES

} from '../actions';

import { sortDogs, filterByTemps } from '../../helpers/filterFunc';
import { paginate } from '../../helpers/pagination';

// import { dogsList } from "../../data";

const initialState = {
	dogs: [],
	temps: [],
	dogNames: [],
	filterTemps: [],
	optOrder: 1,
	connect: 'dataAll',
	searchName: '',
	total: 0,
	page: 1,
	loading: true,
	serverError: null,
	oneDog: {},

}

const rootReducer = (state = initialState, {type, payload}) => {

	switch(type) {

		case GET_DOGS:

			payload = sortDogs(state.optOrder, payload);
			payload = filterByTemps(state.filterTemps, payload);
			const total = payload.length;
			payload = paginate(payload, state.page, 8);

			return {
				...state,
				dogs: payload,
				total,
				loading: false,
				serverError: null
			}
		case GET_TEMPS:

			return {
				...state,
				temps: payload
			}
		
		case GET_DOG_NAMES:

			return {
				...state,
				dogNames: payload.map(el => el.name)
			}

		case ADD_FILTER_TEMP:

			return {
				...state,
				dogs: state.dogs.filter(el => el.temps.includes(payload)),
				temps: state.temps.filter(el => el !== payload),
				filterTemps: [payload, ...state.filterTemps],
				loading: true,
				page: 1
			}

		case REMOVE_FILTER_TEMP:

			return {
				...state,
				temps: [payload, ...state.temps],
				filterTemps: state.filterTemps.filter(el => el !== payload),
				loading: true,
				page: 1
			}
		
		case SET_OPT_ORDER:

			return {
				...state,
				optOrder: payload,
				dogs: [...sortDogs(payload, state.dogs)],
				loading: true,
				page: 1
			}

		case SET_CONNECT:

			return {
				...state,
				connect: payload,
				loading: true,
				page: 1
			}

		case SET_SEARCH_NAME:

			return {
				...state,
				searchName: payload,
				loading: true,
				page: 1
			}

		case SET_PAGE:

			return {
				...state,
				page: payload,
				loading: true
			}

		case SERVER_ERROR:

			return {
				...state,
				serverError: payload,
				loading: false,
				dogs: []
			}

		case GET_ONEDOG:

			return {
				...state,
				oneDog: payload,
				loading: false
			}
		
		default:
			return state;
	}
}

export default rootReducer;
