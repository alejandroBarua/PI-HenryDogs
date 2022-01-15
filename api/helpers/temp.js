
const extractTemps = (temps) => {

	return temps.reduce((previousValue, currentValue, index) => {
	
		if(index === 1) previousValue = previousValue.temperament?.split(', ');
		previousValue = [...new Set(previousValue)];
	
		if(!currentValue.temperament) currentValue = [];
			else currentValue = currentValue.temperament?.split(', ');
	
		return previousValue.concat(currentValue);
	})
}



module.exports = {
	extractTemps,

}