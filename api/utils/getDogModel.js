
const DogModel = (el) => {

	return {
		id: el.id,
		name: el.name,
		weight: `${el.weight.metric} kg`,
		height: `${el.height.metric} cm`,
		life_span: el.life_span,
		imgUrl: el.image ? el.image.url : `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
		temps: el.temperament ? el.temperament.split(', ') : []
	}
}


const getDogModelApi = (dataApi = [], filterTemps = []) => {

	filterTemps = filterTemps.map(el => el.toLowerCase());

	return dataApi.reduce((beforeValue, el) => {

		if(filterTemps.length){

			if(el.temperament){
				
				const tempsAPi = el.temperament.toLowerCase().split(', ');
				const interceptionTemps = tempsAPi.filter(value => filterTemps.includes(value));
	
				return interceptionTemps.length === filterTemps.length ?
					beforeValue.concat(DogModel(el))
					: beforeValue;
			}

			return beforeValue;
		}

		return beforeValue.concat(DogModel(el));

	}, [])
}


const getDogModelDB = (dataDB = [], filterTemps = []) => {

	filterTemps = filterTemps.map(el => el.toLowerCase());

	return dataDB.reduce((beforeValue, el) => {

		const { dataValues } = el;

		const values = {
			...dataValues,
			temps: dataValues.Temps.map(temp => temp.name)
		}
	
		const {Temps, ...dog} = values;

		if(filterTemps.length){

			const tempsDB = dog.temps.join(',').toLowerCase().split(',');
			const interceptionTemps = tempsDB.filter(value => filterTemps.includes(value));

			return interceptionTemps.length === filterTemps.length ?
				beforeValue.concat(dog)
				: beforeValue;
		}

		return beforeValue.concat(dog);

	}, [])
}

module.exports = {
	getDogModelApi,
	getDogModelDB,

}