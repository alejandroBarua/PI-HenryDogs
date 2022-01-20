import axios from 'axios';
export const GET_CITY = 'GET_CITY';


export const getDogs = (city) => dispatch => {

	return axios.get(`http://localhost:8081/api/dogs`)
            .then(({data}) => {
                dispatch({
                    type: GET_CITY,
                    payload: data
                })
            })
						.catch(() => {
							dispatch({
								type: GET_CITY
              })
						})
}

