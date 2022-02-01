import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPS = 'GET_TEMPS';
export const ADD_FILTER_TEMP = 'ADD_FILTER_TEMP';
export const REMOVE_FILTER_TEMP = 'REMOVE_FILTER_TEMP';
export const SET_OPT_ORDER = 'SET_OPT_ORDER';
export const SET_CONNECT = 'SET_CONNECT';
export const SET_SEARCH_NAME = 'SET_SEARCH_NAME';
export const SET_PAGE = 'SET_PAGE';
export const SET_LOADING = 'SET_LOADING';
export const SERVER_ERROR = 'SERVER_ERROR';
export const GET_ONEDOG = 'GET_ONEDOG';
export const GET_DOG_NAMES = 'GET_DOG_NAMES';


export const getDogs = () => (dispatch, getState) => {

  const { connect, searchName: name } = getState();

	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dogs?connect=${connect}&name=${name}`)
          .then(({data}) => {
            dispatch({
                type: GET_DOGS,
                payload: data
            })
          })
          .catch((err) => {
            console.log(err);
            dispatch({
                type: SERVER_ERROR,
                payload: err
            })
          })
}

export const getOneDog = (id) => (dispatch) => {

	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dogs/${id}`)
          .then(({data}) => {
            dispatch({
                type: GET_ONEDOG,
                payload: data
            })
          })
          .catch((err) => {
            console.log(err);
            dispatch({
                type: SERVER_ERROR,
                payload: err
            })
          })
}

export const getTemps = () => (dispatch) => {

	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/temperament`)
          .then(({data}) => {
            dispatch({
                type: GET_TEMPS,
                payload: data
            })
          })
          .catch(() => {
            dispatch({
                type: GET_TEMPS,
                payload: []
            })
          })
}

export const getDogNames = () => (dispatch) => {

	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dogs`)
          .then(({data}) => {
            dispatch({
                type: GET_DOG_NAMES,
                payload: data
            })
          })
          .catch((err) => {
            console.log(err);
            dispatch({
                type: GET_DOG_NAMES,
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

export const setOptOrder = (opt) => {

	return {
    type: SET_OPT_ORDER,
    payload: opt,
  }
}

export const setConnect = (value) => {

	return {
    type: SET_CONNECT,
    payload: value,
  }
}

export const  setSearchName = (value) => {

	return {
    type: SET_SEARCH_NAME,
    payload: value,
  }
}

export const  setPage = (page) => {

	return {
    type: SET_PAGE,
    payload: page,
  }
}

export const  setLoading = (value) => {

	return {
    type: SET_LOADING,
    payload: value,
  }
}