import React from 'react';
import { OneDog } from '../../pages';

import { mount } from "enzyme";
import '@testing-library/jest-dom';

import { MemoryRouter, Link } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import defaultPhoto from '../../assets/images/defaultImage.png';


import * as actions from "../../store/actions";

const data = {
		"id": 1,
		"name": "Affenpinscher",
		"weight": "3 - 6 kg",
		"imgUrl": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
		"temps": [
				"Stubborn",
				"Curious",
				"Playful",
				"Adventurous",
				"Active",
				"Fun-loving"
		],
		"height": "23 - 29 cm",
		"life_span": "10 - 12 years"
}


describe('Pruebas en la pagina one dog', () => {
	
	const mockStore = configureStore([thunk]);

	const store = (id, error = false) => {

		const initialState = {
			loading: false,
			serverError: error,
			oneDog: data
		}

		return mockStore(initialState);
	}
	
	const match = (id) => ({
		params: { idDog: id },
		isExact: true,
		path: "/dogs/:idDog",
		url: `/dogs/${id}`,
	})


  let oneDog, useSelectorStub, useSelectorFn, useEffect;

  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

	beforeEach(() => {

		useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
		useSelectorFn = (id) => useSelectorStub.mockReturnValue(store(id).getState().oneDog);
		useEffect = jest.spyOn(React, "useEffect");

		oneDog = (id, error = false) => (
			mount(<ReactRedux.Provider store={store(id, error)}>
						<MemoryRouter initialEntries={[`/houses/${id}`]}>
							<OneDog match={match(id)} />
						</MemoryRouter>
					</ReactRedux.Provider>
			)
		)

		mockUseEffect();
    mockUseEffect();
	})
	
	afterEach(() => jest.restoreAllMocks());

	it("Debería usar un useEffect y dentro de este, dispachar la acción getOneDog", () => {

		const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getOneDog = jest.spyOn(actions, "getOneDog");
		oneDog(1);
		// const wrapper = oneDog(1);
		// console.log(wrapper.find(OneDog).debug());
    
		expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getOneDog).toHaveBeenCalled();
  });

	it('Debería recibir por props el objeto "match". Utilizar el "idDog" de "params" para despachar la action "getOneDog" y renderizar los detalles de la house', () => {

		const wrapper = oneDog(1);

		expect(wrapper.find('h3').text().includes(data.name)).toEqual(true);
		expect(wrapper.find('.height').text()).toEqual(data.height);
		expect(wrapper.find('.life_span').text()).toEqual(data.life_span);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
	})
	
	it('Deberia manejar errores en weight', () => {


		expect(oneDog(1).find('.weight').text()).toEqual(data.weight);

		data.weight = 'NaN - 8 kg';
		expect(oneDog(1).find('.weight').text()).toEqual('8 kg');

		data.weight = 'NaN kg';
		expect(oneDog(1).find('.weight').text()).toEqual('No value');
	})

	it('Deberia manejar imagenes por defecto', () => {


		expect(oneDog(1).find('img').props().src.includes(data.imgUrl)).toEqual(true);

		data.imgUrl = undefined;
		expect(oneDog(1).find('img').props().src).toEqual(defaultPhoto);
	})

	it("Debería existir un TempItem para cada temp del dog", () => {

		const wrapper = oneDog(1);

		expect(wrapper.find('.tempItem').length).toEqual(data.temps.length);

    expect(wrapper.find('.tempItem').at(0).text().includes('Stubborn')).toEqual(true);
    expect(wrapper.find('.tempItem').at(1).text().includes('Curious')).toEqual(true);
    expect(wrapper.find('.tempItem').at(2).text().includes('Playful')).toEqual(true);
    expect(wrapper.find('.tempItem').at(3).text().includes('Adventurous')).toEqual(true);
    expect(wrapper.find('.tempItem').at(4).text().includes('Active')).toEqual(true);
    expect(wrapper.find('.tempItem').at(5).text().includes('Fun-loving')).toEqual(true);
  })

	it("Debería renderizar un mensaje de error cuando el dog no se encuentra", () => {

		//console.log(oneDog(null, true).find(OneDog).debug());

		const wrapper = oneDog(null, true);

		expect(wrapper.find('p').at(0).text()).toEqual('Sorry... 400');
		expect(wrapper.find('span').at(0).text().includes('The id was not found')).toEqual(true);
		expect(wrapper.find(Link).props().to).toEqual('/');
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  })

})