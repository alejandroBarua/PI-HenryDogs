
import {
  GET_DOGS,
	ADD_FILTER_TEMP,
	REMOVE_FILTER_TEMP,
	ADD_DOGS,
	SORT_DOGS_BY_NAME,
	SORT_DOGS_BY_WEIGHT

} from '../actions';

import { dogsList, tempsList } from '../../data';

import { sortNameAZ, sortWeightDES } from '../../helpers/orderFunc';



const initialState = {
	dogs: dogsList,
	temps: tempsList,
	filterTemps: [],
	optOrder: 1

}

const rootReducer = (state = initialState, {type, payload}) => {

	switch(type) {

		case GET_DOGS:

			return {
				...state,
				dogs: !state.filterTemps.length ? 
								payload : 
								payload.filter(el => {
									const interceptionTemps = el.temps.filter(temp => state.filterTemps.includes(temp));
									return interceptionTemps.length;
								})
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
		
		case ADD_DOGS:

			return {
				...state,
				dogs: !state.filterTemps.length ? 
								payload : 
								payload.filter(el => {
									const interceptionTemps = el.temps.filter(temp => state.filterTemps.includes(temp));
									return interceptionTemps.length === state.filterTemps.length;
								})
			}

		case SORT_DOGS_BY_NAME:

			return {
				...state,
				optOrder: payload,
				dogs: payload === 1 ? [...state.dogs.sort(sortNameAZ)] : [...state.dogs.sort(sortNameAZ).reverse()]
			}
		
			case SORT_DOGS_BY_WEIGHT:

				return {
					...state,
					optOrder: payload,
					dogs: payload === 3 ? [...state.dogs.sort(sortWeightDES).reverse()] : [...state.dogs.sort(sortWeightDES)]
				}
		
		default:
			return state;
	}
}

export default rootReducer;
