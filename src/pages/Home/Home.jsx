import React from 'react';
import { EditText } from 'react-edit-text';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegClipboard } from 'react-icons/fa';
import { Graph, PageHeader } from '../../components';
import {
	HomeCard,
	HomeCardsContainer,
	HomeCardTitle,
	HomeContainer,
	HomeGraphContainer,
	HomeGreetings,
	HomeMainSection,
	MainSectionWrapper,
} from './HomeElements';

export const Home = () => {
	return (
		<HomeContainer>
			<PageHeader heading='Principal'>
				<HomeGreetings>
					Olá,{' '}
					<EditText style={{ display: 'inline', cursor: 'pointer' }} placeholder='usuário' />
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
			<MainSectionWrapper>
				<HomeMainSection>
					<HomeGraphContainer>
						<Graph />
					</HomeGraphContainer>
				</HomeMainSection>
			</MainSectionWrapper>
		</HomeContainer>
	);
};
