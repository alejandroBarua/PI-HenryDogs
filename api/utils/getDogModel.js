
const dogModel = (el) => {

	return {
		id: el.id,
		name: el.name,
		weight: `${el.weight.metric} kg`,
		imgUrl: el.image ? el.image.url : `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
		temps: el.temperament ? el.temperament.split(', ') : []
	}
}

const getDogModelApi = (dataAPI = []) => dataAPI.map(el => dogModel(el));


const getDogModelDB = (dataDB = []) => {

	return dataDB.map(el => {

		const { dataValues } = el;

		const values = {
			...dataValues,
			imgUrl: `http://localhost:${process.env.PORT}/api/img/${dataValues.id}`,
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