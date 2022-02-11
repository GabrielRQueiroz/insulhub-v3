import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegCalendarAlt, FaRegClipboard, FaRegClock } from 'react-icons/fa';
import { Graph, PageHeader, Readings } from '../../components';
import {
	DatePickerButton,
	DateText,
	DateWrapper,
	GraphContainer,
	GraphSectionWrapper,
	HomeCard,
	HomeCardsContainer,
	HomeCardTitle,
	HomeContainer,
	HomeGreetings,
	HomeUsernameField,
	MainSectionContainer,
	ReadingsWrapper,
	SearchWrapper,
	StyledTimePicker,
	TimeSectionContainer,
	TimeSectionWrapper,
} from './HomeElements';

export const Home = () => {
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(date);
	const [username, setUsername] = useState(localStorage.username || '');

	const ButtonRef = forwardRef(({ value, onClick }, ref) => (
		<DatePickerButton onClick={onClick} ref={ref}>
			{value}
		</DatePickerButton>
	));

	const handleDateChange = (date) => {
		setDate(date);
		setTime(date);
	};
	const handleTimeChange = (time) => setTime(time);

	const saveUsername = (username) => {
		setUsername(username);
		localStorage.setItem('username', username);
	};

	return (
		<HomeContainer>
			<PageHeader heading='Início'>
				<HomeGreetings>
					Olá, <HomeUsernameField onSave={(e) => saveUsername(e.value)} placeholder='usuário' defaultValue={username} />
					{'! '}
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
				<GraphSectionWrapper>
					<DateWrapper>
						<DateText>
							<FaRegCalendarAlt />
						</DateText>
						<DatePicker
							selected={date}
							dateFormat='dd/MM/yyyy'
							customInput={<ButtonRef />}
							onChange={handleDateChange}
							filterDate={(date) => new Date() > date} /* Excludes future date from the picker */
						/>
					</DateWrapper>
					<GraphContainer>
						<Graph selectedDate={date} />
					</GraphContainer>
				</GraphSectionWrapper>
			</MainSectionContainer>
			<TimeSectionContainer>
				<TimeSectionWrapper>
					<SearchWrapper>
						<FaRegClock />
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<StyledTimePicker inputVariant='outlined' ampm={false} value={time} onChange={handleTimeChange} />
						</MuiPickersUtilsProvider>
					</SearchWrapper>
					<ReadingsWrapper>
						<Readings selectedDate={date} selectedTime={time} />
					</ReadingsWrapper>
				</TimeSectionWrapper>
			</TimeSectionContainer>
		</HomeContainer>
	);
};
