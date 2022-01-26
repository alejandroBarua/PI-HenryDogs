
const dogModel = (el, moreInfo) => {

	const dog = {
		id: el.id,
		name: el.name,
		weight: `${el.weight.metric} kg`,
		imgUrl: el.image ? 
							el.image.url : 
							el.reference_image_id ? 
							`https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg` : null,
		temps: el.temperament ? el.temperament.split(', ') : []
	}

	if(moreInfo){
		dog.height = `${el.height.metric} cm`;
		dog.life_span = el.life_span;
	}

	return dog;
}

const getDogModelApi = (dataAPI = [], moreInfo = false) => dataAPI.map(el => dogModel(el, moreInfo));


const getDogModelDB = (dataDB = []) => {

	return dataDB.map(el => {

		const { dataValues } = el;

		const values = {
			...dataValues,
			temps: dataValues.Temps.map(temp => temp.name)
		}
	
		const {Temps, ...dog} = values;
		
		return dog;
	})
}

module.exports = {
	getDogModelApi,
	getDogModelDB,

}