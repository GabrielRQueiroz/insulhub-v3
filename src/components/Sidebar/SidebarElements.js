import styled from 'styled-components';

import { NavLink as link } from 'react-router-dom';

export const SidebarContainer = styled.nav`
	display: flex;
	height: ${({ mobile }) => (mobile ? '100%' : 'auto')};
	position: ${({ mobile }) => (mobile ? 'absolute' : 'relative')};

	left: ${({ mobileSidebarOpen }) => (mobileSidebarOpen ? '0px' : '-255px')};

	transition: ${({ mobile }) => (mobile ? '500ms all ease-in-out' : '0s')};
`;

export const SidebarButton = styled.div`
	position: relative;
	display: ${({ mobile }) => (mobile ? 'inline' : 'none')};
	z-index: 999;

	transform: ${({ mobileSidebarOpen }) =>
		mobileSidebarOpen ? 'translateX(-100%)' : 'translateX(0)'};

	margin-top: 16px;
	padding: 8px 12px 8px 8px;

	height: 48px;
	width: 48px;

	border-radius: 0 10px 10px 0;

	background-color: rgba(54, 55, 64, 0.99);

	transition: 500ms all ease-in-out;
	/* transition-delay: 500ms; */

	& > svg {
		height: 100%;
		width: 100%;
	}
`;

export const SidebarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 10;

	height: 100%;
	min-width: 255px;

	background: rgba(54, 55, 64, 0.99);
	color: #a4a6b3;
`;

export const SidebarBrand = styled.div`
	height: 40px;
	width: 191px;

	margin: 36px 0 54px;

	display: flex;
	align-items: center;
	align-self: center;

	pointer-events: none;
`;

export const SidebarLogo = styled.img`
	height: 100%;

	object-fit: cover;
`;

export const SidebarTitle = styled.h1`
	font-size: 1.25rem;
	font-weight: 700;
	letter-spacing: 1px;

	opacity: 70%;

	margin-left: 12px;
`;

export const SidebarList = styled.ul`
	list-style: none;

	display: flex;
	flex-direction: column;
`;

export const SidebarItem = styled.li`
	height: auto;
	width: 100%;

	list-style: none;
`;

export const SidebarLink = styled(link)`
	height: 56px;
	width: 100%;

	padding: 28px 20px 28px 0;

	display: flex;
	align-items: center;

	color: #a4a6b3;
	text-decoration: none;

	transition: 200ms all ease-in-out;

	& > span {
		letter-spacing: 0.2px;
		line-height: 20px;
	}

	& > svg {
		margin: 0 24px 0 32px;
	}

	&:hover {
		background-color: rgba(155, 160, 170, 0.03);
	}

	:before {
		content: '';
		position: absolute;

		left: 0;

		width: 3px;

		background-color: #dde2ff;
		animation: 500ms disappear forwards;
	}

	@keyframes appear {
		0% {
			box-shadow: 0;
			height: 0;
		}

		100% {
			height: inherit;
			/* box-shadow: 0 0 25px 2px #dde2ff; */
		}
	}

	@keyframes disappear {
		0% {
			height: inherit;
			/* box-shadow: 0 0 25px 2px #dde2ff; */
		}

		100% {
			box-shadow: 0;
			height: 0;
		}
	}

	// Active class

	&.active {
		background-color: rgba(159, 162, 180, 0.08);

		& > * {
			color: #dde2ff;
			fill: #dde2ff;
		}

		:before {
			content: '';
			position: absolute;

			left: 0;

			width: 3px;

			background-color: #dde2ff;
			animation: 500ms appear forwards;
		}
	}
`;

export const SidebarBG = styled.video`
	height: 100vh;
	width: 255px;

	position: absolute;

	top: 0;
	left: 0;

	object-fit: cover;

	z-index: -1;
`;
