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

	overflow-y: hidden;

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
	min-width: 100px;
	width: auto;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	gap: 8px;

	display: flex;

	justify-content: center;
	align-items: center;

	flex-direction: column;
	flex-grow: 1;
	flex-basis: 0px;

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
	position: relative;

	display: flex;
	justify-content: flex-start;

	flex-grow: 1;
	flex-wrap: wrap;

	gap: 16px;

	width: 100%;

	overflow-y: scroll;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	padding: 16px;

	&::-webkit-scrollbar {
		width: 5px;
		position: fixed;
	}

	&::-webkit-scrollbar-thumb {
		background: #9fa2b4;
		border-radius: 50px;
	}

	/* &:before {
		content: '';

		height: 90%;
		width: 2px;

		background-color: #dfe0eb;
		
		position: absolute;

		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);
	} */
`;

export const SummaryTableColumn = styled.div`
	display: flex;
	flex-direction: column;

	height: auto;
	min-width: 200px;

	flex-grow: 1;
	flex-basis: 0px;

	@media screen and (max-width: 768px) {
		min-width: 100%;
	}
`;

export const SummaryTableLine = styled.div`
	display: flex;

	justify-content: space-between;

	padding: 4px;

	&:nth-child(2n) {
		background-color: #dfe0eb;
	}
`;

export const SummaryTableItem = styled.div`
	&:first-child {
		font-weight: 700;
	}
`;
