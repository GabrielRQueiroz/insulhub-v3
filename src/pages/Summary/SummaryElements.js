import { DatePicker } from '@material-ui/pickers';
import styled from 'styled-components';

export const SummaryContainer = styled.section`
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

export const SummaryMainCard = styled.div`
	display: flex;

	align-items: center;

	flex-direction: column;
	flex-grow: 1;

	gap: 16px;

	width: 100%;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;

	padding: 16px 24px;

	margin-bottom: 30px;

	@media screen and (max-width: 576px) {
		padding: 16px;
	}
`;

export const StyledDatePicker = styled(DatePicker)`
	width: auto;

	& * {
		text-align: center;
	}

	& > div {
		font-size: 1.1rem;
		font-weight: 700;

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
				max-width: 160px;
			}

			&:hover {
				cursor: pointer;

				border-color: #3751ff;
				color: #3751ff;
			}
		}
	}
`;

export const SummaryHighlightedCardsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;

	gap: 16px;

	width: 100%;
`;

export const SummaryHighlightedCard = styled.div`
	min-height: fit-content;
	width: auto;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	gap: 8px;

	display: flex;

	justify-content: center;
	align-items: center;

	flex-direction: column;
	flex-grow: 1;

	padding: 16px;

	@media screen and (max-width: 576px) {
		width: 30%;
	}

	@media screen and (max-width: 465px) {
		width: 100%;
	}
`;

export const SummaryHighlightedHeading = styled.h3`
	font-size: 1rem;

	text-align: center;
`;

export const SummaryHighlightedInfo = styled.span`
	font-size: 2.5rem;
`;

export const SummaryTableContainer = styled.div`
	height: 100%;
	width: 100%;

	flex-grow: 1;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	padding: 16px;
`;
