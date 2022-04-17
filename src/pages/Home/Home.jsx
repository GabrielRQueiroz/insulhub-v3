import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";
import {
	FaCalculator,
	FaCarrot,
	FaPencilAlt,
	FaRegCalendarAlt,
	FaRegClipboard,
	FaRegClock,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { Graph, PageHeader, Readings } from "../../components";
import { getUrl } from "../../store";
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
} from "./HomeElements";

export const Home = () => {
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(date);
	const [username, setUsername] = useState(localStorage.username || "");

	const { nightscoutUrl } = useSelector(getUrl);

	const handleDateChange = date => {
		setDate(date);
		setTime(date);
	};
	const handleTimeChange = time => setTime(time);

	const saveUsername = username => {
		setUsername(username);
		localStorage.setItem("username", username);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<HomeContainer id="home">
				<PageHeader heading="Início">
					<HomeGreetings tabIndex={0} aria-label={`Olá, ${username}`}>
						Olá,{" "}
						<HomeUsernameField
							role="textbox"
							onSave={e => saveUsername(e.value)}
							aria-label="Pressione para mudar o nome do usuário"
							placeholder="usuário"
							defaultValue={username}
						/>
						{"! "}
						<FaPencilAlt />
					</HomeGreetings>
				</PageHeader>
				<HomeCardsContainer>
					<HomeCard
						role="button"
						tabIndex={-1}
						aria-label="Acesso rápido ao relatório mensal"
						to="/summary"
					>
						<HomeCardTitle>Relatório</HomeCardTitle>
						<FaRegClipboard />
					</HomeCard>
					<HomeCard
						role="button"
						tabIndex={-1}
						aria-label="Acesso rápido à calculadora de regra de três"
						to="/calculator"
					>
						<HomeCardTitle>Regra de Três</HomeCardTitle>
						<FaCalculator />
					</HomeCard>
					<HomeCard
						role="button"
						tabIndex={-1}
						aria-label="Acesso rápido a tabela nutricional"
						to="/food"
					>
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
								hiddenLabel="Esse é um seletor de data no formato dia/mês/ano"
								format="dd/MM/yyyy"
								readOnly={false}
								inputVariant="outlined"
								aria-labelledby="dateLabel"
								disableFuture
								minDate={new Date("2000-02-01")}
								value={date}
								onChange={handleDateChange}
								autoOk
							/>
							<HiddenLabel id="dateLabel">
								Escolha uma data para ter todas as leituras
							</HiddenLabel>
						</DateWrapper>
						<GraphContainer>
							<Graph selectedDate={date} nightscoutUrl={nightscoutUrl} />
						</GraphContainer>
						<TimeSectionWrapper>
							<SearchWrapper>
								<FaRegClock />
								{/* Time picker */}
								<StyledTimePicker
									hiddenLabel="Esse é um seletor de horário no formato hora:minutos"
									aria-labelledby="timeLabel"
									inputVariant="outlined"
									ampm={false}
									value={time}
									onChange={handleTimeChange}
									autoOk
								/>
								<HiddenLabel id="timeLabel">
									Escolha um horário para uma leitura específica
								</HiddenLabel>
							</SearchWrapper>
							<ReadingsWrapper tabIndex={0}>
								<Readings
									selectedTime={time}
									nightscoutUrl={nightscoutUrl}
								/>
							</ReadingsWrapper>
							<DateRefreshButton
								aria-label="Botão de atualização do gráfico"
								name="Botão de atualização"
								type="button"
								onClick={() => handleDateChange(new Date())}
							>
								<IoMdRefresh />
							</DateRefreshButton>
						</TimeSectionWrapper>
					</GraphSectionWrapper>
				</MainSectionContainer>
			</HomeContainer>
		</MuiPickersUtilsProvider>
	);
};
