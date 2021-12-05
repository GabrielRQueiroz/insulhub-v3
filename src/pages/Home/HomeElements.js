import styled from 'styled-components';
import { Link as link } from 'react-router-dom';

export const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 0 15px;

	min-height: 100vh;
	width: 100%;
`;

export const HomeGreetings = styled.h3`
	text-align: right;

	font-size: 1.25rem;
	font-weight: 400;
`;

export const HomeCardsContainer = styled.div`
	display: flex;
	flex-grow: 3;
	flex-wrap: wrap;
	justify-content: center;

	max-height: 310px;
	width: 100%;

	padding: 0 -15px;
`;

export const HomeCard = styled(link)`
	height: 135px;
	max-width: 250px;

	flex: 1 0 175px;

	text-align: center;
	text-decoration: none;
	color: #9fa2b4;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;

	margin: 10px 15px;
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

		/* transform: scale(1.02); */

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

export const MainSectionWrapper = styled.div`
	height: 100%;
	width: 100%;

	background: transparent;

	padding: 0 15px;
	margin: 10px 15px 30px;
`;

export const HomeMainSection = styled.section`
	height: 100%;
	width: 100%;

	color: #9fa2b4;

	display: flex;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;
`;

export const HomeGraphContainer = styled.div`
	height: fit-content;
	max-width: 100%;

	padding: 32px;
`;
