import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const ADD_DOGS = 'ADD_DOGS';
export const ADD_FILTER_TEMP = 'ADD_FILTER_TEMP';
export const REMOVE_FILTER_TEMP = 'REMOVE_FILTER_TEMP';
export const SORT_DOGS_BY_NAME = 'SORT_DOGS_BY_NAME';
export const SORT_DOGS_BY_WEIGHT = 'SORT_DOGS_BY_WEIGHT';


export const getDogs = () => dispatch => {

	return axios.get(`http://localhost:8081/api/dogs`)
          .then(({data}) => {
            dispatch({
                type: GET_DOGS,
                payload: data
            })
          })
          .catch(() => {
            dispatch({
                type: GET_DOGS,
                payload: []
            })
          })
}

export const addFilterTemp = (temp) => {

	return {
    type: ADD_FILTER_TEMP,
    payload: temp
  }
}

export const removeFilterTemp = (temp) => {

	return {
    type: REMOVE_FILTER_TEMP,
    payload: temp,
  }
}

export const addDogs = (dogs) => {

	return {
    type: ADD_DOGS,
    payload: dogs,
  }
}

export const sortDogsByName = (opt) => {

	return {
    type: SORT_DOGS_BY_NAME,
    payload: opt,
  }
}

export const sortDogsByWeight = (opt) => {

	return {
    type: SORT_DOGS_BY_WEIGHT,
    payload: opt,
  }
}