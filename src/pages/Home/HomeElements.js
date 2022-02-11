import styled from 'styled-components';
import { Link as link } from 'react-router-dom';
import { EditText } from 'react-edit-text';
import { TimePicker } from '@material-ui/pickers';

export const HomeContainer = styled.div`
	height: 100vh;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0 15px;

	@media screen and (max-width: 900px) {
		height: auto;
		min-height: 100vh;
	}
`;

export const HomeGreetings = styled.h3`
	text-align: right;

	font-size: 1.25rem;
	font-weight: 400;

	& > input {
		background: transparent;
		border: 0;
		border-bottom: 1px solid black;

		padding: 0 4px;

		outline: none;

		max-width: 40%;

		font-size: 1.25rem;
	}
`;

export const HomeUsernameField = styled(EditText)`
	display: inline;

	transition: 500ms all ease-in-out;

	cursor: pointer;
`;

export const HomeCardsContainer = styled.section`
	display: flex;
	flex-shrink: 1;
	flex-basis: auto;
	flex-wrap: wrap;

	justify-content: center;

	max-height: 100%;
	width: 100%;
`;

export const HomeCard = styled(link)`
	height: 135px;
	max-width: 100%;

	flex: 1 0 175px;

	text-align: center;
	text-decoration: none;
	color: #9fa2b4;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;

	margin: 8px 15px 15px;
	padding: 24px 0px;

	transition: 200ms all ease-out;

	& > svg {
		height: 40px;
		width: 40px;

		fill: #252733;

		margin: 12px 0 24px;

		transition: 200ms all ease-out;
	}

	&:hover {
		border-color: #3751ff;
		color: #3751ff;

		transform: scale(1.01);
		box-shadow: 0 0 5px 1px rgba(200, 200, 200, 0.5);

		& > svg {
			fill: #3751ff;
		}
	}
`;

export const HomeCardTitle = styled.h2`
	font-size: 1.25rem;
	line-height: 24px;

	font-weight: 400;
`;

export const MainSectionContainer = styled.section`
	height: 100%;
	min-height: 280px;
	width: 100%;

	background: transparent;

	padding: 0 15px;
	margin: 15px;
`;

export const GraphSectionWrapper = styled.div`
	height: 280px;
	width: 100%;

	display: flex;
	flex-flow: column;

	justify-items: space-around;

	padding: 8px 0 0;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;
	color: #9fa2b4;
`;

export const DateWrapper = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	gap: 16px;

	flex-wrap: wrap;
	flex-grow: 0;

	margin: 8px 0;

	min-height: 24px;
	width: 100%;

	& > * {
		width: auto !important;
	}
`;

export const DateText = styled.span`
	display: flex;
	align-items: center;

	color: #252733;

	& > svg {
		transform: scale(1.5);
	}

	@media screen and (max-width: 576px) {
		font-size: 1em;

		margin: 0 0 4px;
	}
`;

export const DatePickerButton = styled.button`
	height: 32px;
	width: 120px;

	font-size: 1rem;

	text-align: center;
	text-decoration: none;

	font-weight: 700;
	color: #252733;

	border: 2px solid #dfe0eb;
	border-radius: 4px;

	padding: auto;

	background-color: #fff;

	transition: 200ms all ease-out;

	&:hover,
	&:focus {
		cursor: pointer;

		border-color: #3751ff;
		color: #3751ff;
	}
`;

export const GraphContainer = styled.div`
	height: 100%;
	min-width: auto;
	flex: 1;

	padding: 0 16px 8px;

	@media screen and (max-width: 576px) {
		padding: 16px 8px;
	}
`;

export const TimeSectionContainer = styled.section`
	min-height: 60px;
	max-height: 60px;
	width: 100%;

	background: transparent;

	margin: 15px 15px 30px;
	padding: 0 15px;
`;

export const TimeSectionWrapper = styled.div`
	min-height: 60px;
	max-height: 60px;

	display: flex;
	justify-content: center;

	position: relative;

	padding: 0 16px;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;
	fill: #252733;

	@media screen and (max-width: 576px) {
		padding: 8px;
	}
`;

export const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 16px;

	height: auto;
	width: 40%;

	& > svg {
		transform: scale(1.5);
	}

	@media screen and (max-width: 576px) {
		width: 50%;

		& > svg {
			transform: scale(1.4);
		}
	}
`;

export const StyledTimePicker = styled(TimePicker)`
	height: 50%;
	width: 50%;

	& > div {
		height: 100%;
		width: auto;

		font-size: 1.25rem;
		font-weight: 700;
		color: #252733;

		@media screen and (max-width: 576px) {
			& > input {
				font-size: 1rem;
			}
		}

		& > fieldset {
			border: 0;
		}

		& > input {
			padding: 2px;

			text-align: center;

			border: 2px solid #dfe0eb;
			border-radius: 4px;

			transition: 200ms all ease-out;
			&:hover {
				cursor: pointer;

				border-color: #3751ff;
				color: #3751ff;
			}
		}
	}
`;

export const ReadingsWrapper = styled.div`
	display: flex;
	flex-grow: 1;

	&::before {
		content: '';
		position: relative;

		left: 0;

		align-self: center;

		height: 75%;

		border: 1px solid #dfe0eb;
		border-radius: 4px;
	}
`;
