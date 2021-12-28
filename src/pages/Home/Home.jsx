import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EditText } from 'react-edit-text';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegClipboard, FaSearch } from 'react-icons/fa';
import { Graph, PageHeader } from '../../components';
import {
	DatePickerButton,
	DateText,
	DateWrapper,
	HomeCard,
	HomeCardsContainer,
	HomeCardTitle,
	HomeContainer,
	HomeGraphContainer,
	HomeGreetings,
	HomeSectionWrapper,
	MainSectionContainer,
} from './HomeElements';

export const Home = () => {
	const [date, setDate] = useState(new Date());

	const ButtonRef = forwardRef(({ value, onClick }, ref) => (
		<DatePickerButton onClick={onClick} ref={ref}>
			{value}
		</DatePickerButton>
	));

	const handleDateChange = (date) => setDate(date);

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
			<MainSectionContainer>
				<HomeSectionWrapper>
					<DateWrapper>
						<DateText>
							<FaSearch /> Buscar:{' '}
						</DateText>
						<DatePicker
							selected={date}
							dateFormat='dd/MM/yyyy'
							customInput={<ButtonRef />}
							onChange={handleDateChange}
						/>
					</DateWrapper>
					<HomeGraphContainer>
						<Graph time={date} />
					</HomeGraphContainer>
				</HomeSectionWrapper>
			</MainSectionContainer>
		</HomeContainer>
	);
};
