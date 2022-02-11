import styled from 'styled-components';

export const ReadingsContainer = styled.div`
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ReadingsText = styled.p`
	font-size: 2rem;
	font-weight: 700;

	text-align: center;

	@media screen and (max-width: 786px) {
		font-size: 1.5rem;
	}
`;

export const ReadingsNotFound = styled.p`
	font-size: 1.25rem;
	font-weight: 300;
	font-style: italic;

	color: #909090;

	text-align: center;

	@media screen and (max-width: 786px) {
		font-size: 1rem;
	}
`;
