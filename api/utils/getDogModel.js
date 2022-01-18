
const getDogModelApi = (dataApi = []) => {

	return dataApi.map(el => {

		return {
			id: el.id,
			name: el.name,
			weight: `${el.weight.metric} kg`,
			height: `${el.height.metric} cm`,
			life_span: el.life_span,
			imgUrl: el.image ? el.image.url : `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
			temps: el.temperament ? el.temperament.split(', ') : []
		}
	})
}


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