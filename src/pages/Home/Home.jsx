import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegCalendarAlt, FaRegClipboard, FaRegClock } from 'react-icons/fa';
import { Graph, PageHeader, Readings } from '../../components';
import {
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
	StyledDatePicker,
	StyledTimePicker,
	TimeSectionWrapper,
} from './HomeElements';

export const Home = () => {
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(date);
	const [username, setUsername] = useState(localStorage.username || '');

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
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
							<StyledDatePicker
								format='dd/MM/yyyy'
								label='Date picker'
								inputVariant='outlined'
								disableFuture
								value={date}
								onChange={handleDateChange}
								autoOk
							/>
						</DateWrapper>
						<GraphContainer>
							<Graph selectedDate={date} />
						</GraphContainer>
						{/* <TimeSectionContainer> */}
						<TimeSectionWrapper>
							<SearchWrapper>
								<FaRegClock />
								<StyledTimePicker label='Time picker' inputVariant='outlined' ampm={false} value={time} onChange={handleTimeChange} autoOk />
							</SearchWrapper>
							<ReadingsWrapper>
								<Readings selectedTime={time} />
							</ReadingsWrapper>
						</TimeSectionWrapper>
						{/* </TimeSectionContainer> */}
					</GraphSectionWrapper>
				</MainSectionContainer>
			</HomeContainer>
		</MuiPickersUtilsProvider>
	);
};
