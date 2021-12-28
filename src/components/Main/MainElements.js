import styled from 'styled-components';

export const MainWrapper = styled.main`
	height: ${(props) => (props.mobile ? `100vh` : `${props.height}px`)};
	width: 100%;

	position: relative;

	background-color: #f7f8fc;

	/* box-shadow: 0px 0 20px #202020; */
	z-index: 2;

	overflow-y: ${(props) => (props.mobile ? `auto` : `hidden`)};
`;
