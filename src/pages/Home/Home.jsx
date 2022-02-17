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
	HiddenLabel,
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
	const nightscoutBaseUrl = localStorage.getItem('nightscout_url');

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
								id='date'
								format='dd/MM/yyyy'
								inputVariant='outlined'
								disableFuture
								value={date}
								onChange={handleDateChange}
								autoOk
							/>
							<HiddenLabel htmlFor='date'>Date picker for the graph</HiddenLabel>
						</DateWrapper>
						<GraphContainer>
							<Graph nightscoutBaseUrl={nightscoutBaseUrl} selectedDate={date} />
						</GraphContainer>
						<TimeSectionWrapper>
							<SearchWrapper>
								<FaRegClock />
								<StyledTimePicker id='time' inputVariant='outlined' ampm={false} value={time} onChange={handleTimeChange} autoOk />
								<HiddenLabel htmlFor='time'>Time picker for specific readings</HiddenLabel>
							</SearchWrapper>
							<ReadingsWrapper>
								<Readings nightscoutBaseUrl={nightscoutBaseUrl} selectedTime={time} />
							</ReadingsWrapper>
						</TimeSectionWrapper>
					</GraphSectionWrapper>
				</MainSectionContainer>
			</HomeContainer>
		</MuiPickersUtilsProvider>
	);
};
