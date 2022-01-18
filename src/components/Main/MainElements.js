import styled from 'styled-components';

export const MainWrapper = styled.main`
	height: ${({ mobile, height }) => (mobile ? `100vh` : `${height}px`)};
	width: 100%;

	position: relative;

	background-color: #f7f8fc;

	/* box-shadow: 0px 0 20px #202020; */
	z-index: 2;

	overflow-y: ${({ mobile }) => (mobile ? `auto` : `hidden`)};
`;
