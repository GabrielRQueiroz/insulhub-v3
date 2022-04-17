import React from 'react';
import { PageHeader } from '../../components';
import { CalculatorContainer } from './CalculatorElements';

export const Calculator = () => {
	return (
		<CalculatorContainer id='calculator'>
			<PageHeader heading='Regra de Três' />
		</CalculatorContainer>
	);
};
