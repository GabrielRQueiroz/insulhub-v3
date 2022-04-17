import React from 'react';
import { PageHeader } from '../../components';
import { FoodContainer } from './FoodElements';

export const Food = () => {
	return (
		<FoodContainer id='food'>
			<PageHeader heading='Alimentos' />
		</FoodContainer>
	);
};
