import styled from 'styled-components';

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	position: ${({ position }) => position};

	padding: 24px 0;

	height: 100%;
	width: 100%;

	color: rgba(55, 81, 255);
`;
