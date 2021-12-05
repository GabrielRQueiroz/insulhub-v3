import React from 'react';

import {
	FaRegClipboard,
	FaCalculator,
	FaCarrot,
	FaPencilAlt,
} from 'react-icons/fa';

import { EditText } from 'react-edit-text';

import {
	HomeContainer,
	HomeGreetings,
	HomeHeader,
	HomeCardsContainer,
	HomeCard,
	HomeCardTitle,
	// MainSectionWrapper,
	// HomeMainSection,
	// HomeGraphContainer,
} from './HomeElements';

import { PageHeader } from '../../components';

export const Home = () => {
	return (
		<HomeContainer>
			<PageHeader heading='Principal'>
				<HomeGreetings>
					Olá,{' '}
					<EditText
						style={{ display: 'inline', cursor: 'pointer' }}
						placeholder='usuário'
					/>
					! <FaPencilAlt />
				</HomeGreetings>
			</PageHeader>
			<HomeCardsContainer>
				<HomeCard to='/summary'>
					<HomeCardTitle>Relatório</HomeCardTitle>
					<FaRegClipboard />
				</HomeCard>
				<HomeCard to='/calculator'>
					<HomeCardTitle>Regra de Três</HomeCardTitle>
					<FaCalculator />
				</HomeCard>
				<HomeCard to='/food'>
					<HomeCardTitle>Alimentos</HomeCardTitle>
					<FaCarrot />
				</HomeCard>
			</HomeCardsContainer>
			{/* <MainSectionWrapper>
				<HomeMainSection>
					<HomeGraphContainer>
						Consectetur in cupidatat aliquip id irure laborum cupidatat.
						Irure magna amet anim exercitation ex magna voluptate veniam
						voluptate minim laboris. Veniam ea tempor Lorem exercitation
						sit velit cillum ea tempor est. Velit labore dolor ipsum ad
						ullamco irure qui. Exercitation aliquip amet officia culpa
						voluptate pariatur consectetur aliquip nostrud ullamco irure
						amet in. Do excepteur ea in elit ipsum commodo sit officia
						cupidatat. Non excepteur dolor nulla sit magna consequat
						adipisicing.
					</HomeGraphContainer>
				</HomeMainSection>
			</MainSectionWrapper> */}
		</HomeContainer>
	);
};
