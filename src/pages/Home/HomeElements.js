import { DatePicker, TimePicker } from "@material-ui/pickers";
import { EditText } from "react-edit-text";
import { Link as link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
	height: 100vh;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 15px;

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

		outline: none;

		width: 40%;

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

	gap: 15px;

	justify-content: center;

	max-height: 100%;
	width: 100%;
`;

export const HomeCard = styled(link)`
	min-height: auto;
	max-width: 100%;

	flex: 1 0 175px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;

	text-align: center;
	text-decoration: none;
	color: #737587;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;

	padding: 24px 0px;

	transition: 200ms all ease-out;

	box-shadow: 1px 1px 4px 0 rgba(200, 200, 200, 0.25);

	& > svg {
		height: 40px;
		min-height: 40px;
		width: 40px;

		fill: #252733;

		margin: 12px 0;

		transition: 200ms all ease-out;
	}

	&:hover {
		border-color: #3751ff;
		color: #3751ff;

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
	min-height: 300px;
	width: 100%;

	display: flex;
	flex-grow: 1;

	background: transparent;

	margin-bottom: 30px;

	box-shadow: 1px 1px 4px 0 rgba(200, 200, 200, 0.25);
`;

export const GraphSectionWrapper = styled.div`
	height: auto;
	width: 100%;

	display: flex;
	flex-direction: column;

	justify-items: space-between;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;
`;

export const DateWrapper = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	font-size: 1.25em;

	gap: 16px;

	flex-wrap: wrap;

	margin: 16px 0 8px;

	max-height: 24px;
	width: 100%;

	@media screen and (max-width: 576px) {
		gap: 8px;
	}
`;

export const DateRefreshButton = styled.button`
	align-self: center;
	order: 1;

	height: 60%;
	min-height: 30px;

	aspect-ratio: 1;

	padding: 2px;

	background-color: #ffffff;

	border: 2px solid #dfe0eb;
	border-radius: 50px;

	transition: all 200ms;

	& > svg {
		height: 100%;
		width: 100%;

		transition: all 200ms;
	}
	&:hover {
		border-color: #3751ff;

		cursor: pointer;

		& > svg {
			fill: #3751ff;
		}
	}
`;

export const DateText = styled.span`
	display: flex;
	align-items: center;

	color: #252733;

	& > svg {
		transform: scale(1.4);
	}

	@media screen and (max-width: 576px) {
		font-size: 1em;

		margin: 0 0 4px;
	}
`;

export const GraphContainer = styled.div`
	height: 100%;
	min-height: 200px;
	min-width: auto;

	display: flex;
	flex-direction: column;

	justify-content: center;

	flex: 1;

	padding: 0 16px 8px;

	& :hover {
		cursor: pointer;
		cursor: -moz-pointer;
		cursor: -webkit-pointer;
	}

	& :active {
		cursor: grabbing;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
	}

	@media screen and (max-width: 576px) {
		padding: 0 8px;
	}
`;

export const TimeSectionWrapper = styled.div`
	height: 60px;
	width: 100%;

	gap: 8px;

	display: flex;
	justify-content: center;

	position: relative;

	padding: 0 16px;

	background-color: transparent;
	fill: #252733;

	@media screen and (max-width: 768px) {
		padding: 8px;
		gap: 0;
	}
`;

export const SearchWrapper = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	gap: 16px;

	height: auto;
	width: 45%;

	padding: 0 4px;

	& > svg {
		transform: scale(1.5);
	}

	@media screen and (max-width: 576px) {
		gap: 8px;

		& > svg {
			transform: scale(1.4);
		}
	}
`;

export const StyledTimePicker = styled(TimePicker)`
	height: 50%;
	width: 60%;

	& > div {
		flex-grow: 1;
		height: 100%;
		width: 100%;

		font-size: 1.25rem;
		font-weight: 700;
		color: #252733;

		@media screen and (max-width: 576px) {
			& > input {
				font-size: 1rem;
				width: auto;
			}
		}

		& > fieldset {
			border: 0;
		}

		& > input {
			max-width: 200px;
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

export const StyledDatePicker = styled(DatePicker)`
	height: 100%;
	width: auto;

	& > div {
		height: 100%;
		width: 100%;

		font-size: 1.15rem;
		font-weight: 700;
		color: #252733;

		@media screen and (max-width: 576px) {
			& > input {
				font-size: 1rem;
				width: auto;
			}
		}

		& > fieldset {
			border: 0;
		}

		& > input {
			max-width: 150px;
			padding: 2px;

			text-align: center;

			border: 2px solid #dfe0eb;
			border-radius: 4px;

			transition: 200ms all ease-out;

			@media screen and (max-width: 576px) {
				max-width: 120px;
			}

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
	order: 2;

	flex-grow: 1;

	width: 45%;
`;

export const HiddenLabel = styled.label`
	display: none;
`;
