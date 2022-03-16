import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';
import { FaCalculator, FaCarrot, FaPencilAlt, FaRegCalendarAlt, FaRegClipboard, FaRegClock } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Graph, PageHeader, Readings } from '../../components';
import { getUrl } from '../../store';
import {
	DateRefreshButton,
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

	const { nightscoutUrl } = useSelector(getUrl);

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
							{/* Date picker */}
							<StyledDatePicker
								hiddenLabel='Esse é um seletor de data no formato dia/mês/ano'
								format='dd/MM/yyyy'
								inputVariant='outlined'
								aria-labelledby='dateLabel'
								disableFuture
								minDate={new Date('2000-02-01')}
								value={date}
								onChange={handleDateChange}
								autoOk
							/>
							<HiddenLabel id='dateLabel'>Escolha uma data para ter todas as leituras</HiddenLabel>
						</DateWrapper>
						<GraphContainer>
							<Graph selectedDate={date} nightscoutUrl={nightscoutUrl} />
						</GraphContainer>
						<TimeSectionWrapper>
							<SearchWrapper>
								<FaRegClock />
								{/* Time picker */}
								<StyledTimePicker
									hiddenLabel='Esse é um seletor de horário no formato hora:minutos'
									aria-labelledby='timeLabel'
									inputVariant='outlined'
									ampm={false}
									value={time}
									onChange={handleTimeChange}
									autoOk
								/>
								<HiddenLabel id='timeLabel'>Escolha um horário para uma leitura específica</HiddenLabel>
							</SearchWrapper>
							<DateRefreshButton name='Botão de atualização' type='button' onClick={() => handleDateChange(new Date())}>
								<IoMdRefresh />
							</DateRefreshButton>
							<ReadingsWrapper>
								<Readings selectedTime={time} nightscoutUrl={nightscoutUrl} />
							</ReadingsWrapper>
						</TimeSectionWrapper>
					</GraphSectionWrapper>
				</MainSectionContainer>
			</HomeContainer>
		</MuiPickersUtilsProvider>
	);
};
