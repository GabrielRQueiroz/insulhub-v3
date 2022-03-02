import styled from 'styled-components';

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: ${({ noPadding }) => (noPadding ? '0' : '24px 0')};

	margin: 0 auto;

	height: 100%;
	width: 100%;

	color: rgba(55, 81, 255);
`;
