
import {
  GET_DOGS,
	GET_TEMPS,
	ADD_FILTER_TEMP,
	REMOVE_FILTER_TEMP,
	SET_OPT_ORDER,
	SET_CONNECT,
	SET_SEARCH_NAME,
	SET_PAGE

} from '../actions';

import { sortDogs, filterByTemps } from '../../helpers/filterFunc';
import { paginate } from '../../helpers/pagination';

// import { dogsList } from "../../data";

const initialState = {
	dogs: [],
	temps: [],
	filterTemps: [],
	optOrder: 1,
	connect: 'dataAll',
	searchName: '',
	total: 0,
	page: 1,
	loading: true

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
				loading: false
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
		
		default:
			return state;
	}
}

export default rootReducer;
