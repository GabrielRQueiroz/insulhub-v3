import { auto } from '@popperjs/core';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EditText } from 'react-edit-text';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegClipboard } from 'react-icons/fa';
import { Graph, PageHeader } from '../../components';
import {
	DateWrapper,
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
	const [date, setDate] = useState(new Date());

	return (
		<HomeContainer>
			<PageHeader heading='Principal'>
				<HomeGreetings>
					Olá,{' '}
					<EditText style={{ display: 'inline', cursor: 'pointer' }} placeholder='usuário' />!{' '}
					<FaPencilAlt />
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
					<DateWrapper>
						<DatePicker
							selected={date}
							dateFormat='dd/MM/yyyy'
							onChange={(date) => setDate(date)}
						/>
					</DateWrapper>
					<HomeGraphContainer>
						<Graph time={date} />
					</HomeGraphContainer>
				</HomeMainSection>
			</MainSectionWrapper>
		</HomeContainer>
	);
};
