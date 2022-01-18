
const getDogModel = (apiDogs = []) => {

	return apiDogs.map(el => {

		return {
			id: el.id,
			name: el.name,
			weight: el.weight.metric,
			height: el.height.metric,
			life_span: el.life_span,
			imgUrl: el.image.url,
			temps: el.temperament ? el.temperament.split(', ') : []
		}
	})
}


module.exports = getDogModel;