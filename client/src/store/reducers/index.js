// Importa las actions types que necesites acá:
import {
  GET_CITY,

} from '../actions';

import dogsList from '../../data';



const initialState = {
	dogs: dogsList,

}

const rootReducer = (state = initialState, {type, payload}) => {

	switch(type) {

		case GET_CITY:

			return {
				...state,
				dogs: payload
			}

		default:
			return state;
	}
}

export default rootReducer;
