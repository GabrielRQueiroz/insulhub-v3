import React from 'react';

import { CalculatorContainer } from './CalculatorElements';

import { PageHeader } from '../../components';

export const Calculator = () => {
	return (
		<CalculatorContainer>
			<PageHeader heading='Regra de Três' />
		</CalculatorContainer>
	);
};
