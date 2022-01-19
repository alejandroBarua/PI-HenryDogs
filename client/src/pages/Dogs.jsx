import React, { Fragment } from 'react';

import { Filters, TempGroup, CardGroup } from '../components';

const Dogs = () => {
	return (
		<Fragment>
			<Filters />
			<TempGroup />
			<CardGroup />
		</Fragment>
	)
}

export default Dogs;
