import styled from "styled-components";

export const MainWrapper = styled.main`
	height: ${({ height }) => `${height}px`};
	width: 100%;

	position: relative;

	padding: 0 30px;

	background-color: #f7f8fc;

	/* box-shadow: 0px 0 20px #202020; */
	z-index: 2;

	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 5px;
		position: fixed;
	}

	&::-webkit-scrollbar-thumb {
		background: #737587;
		border-radius: 50px;
	}

	& > div {
		// Necessary for the transition to work properly without layout shifting
		position: relative;
	}

	@media screen and (max-width: 576px) {
		padding: 0 15px;
	}
`;
