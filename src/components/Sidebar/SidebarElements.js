import { Dialog } from '@mui/material';
import { NavLink as link } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.nav`
	display: flex;

	height: ${({ mobile }) => (mobile ? '100%' : 'auto')};
	min-width: ${({ mobile }) => (mobile ? '100vw' : '255px')};

	position: ${({ mobile }) => (mobile ? 'absolute' : 'relative')};
	left: 0;
	bottom: 0;
	/* bottom: ${({ mobileSidebarOpen }) => (mobileSidebarOpen ? '0px' : '-100vh')}; */

	animation-name: ${({ mobileSidebarOpen }) => (mobileSidebarOpen ? 'appear' : 'hide')};
	animation-duration: 500ms;
	animation-fill-mode: forwards;

	transition: ${({ mobile }) => (mobile ? '250ms all ease-in-out' : '0s')};

	clip-path: inset(0);

	z-index: 777;

	@keyframes appear {
		from {
			clip-path: circle(0% at 95% 5%);
		}
		to {
			clip-path: circle(100% at 50% 50%);
		}
	}

	@keyframes hide {
		from {
			clip-path: circle(100% at 50% 50%);
		}
		to {
			clip-path: circle(0% at 95% 5%);
		}
	}
`;

export const DialogConfirmation = styled(Dialog)`
	margin: 0 auto;

	width: clamp(50%, 768px, 95%);
`;

export const SidebarButton = styled.div`
	position: fixed;
	top: 32px;
	right: 16px;

	display: ${({ mobile }) => (mobile ? 'inline' : 'none')};
	z-index: 888;

	transform: ${({ mobile }) => (mobile ? 'scale(0.9)' : 'scale(1)')};

	height: 48px;
	width: 48px;

	border-radius: 6px;

	background-color: ${({ mobileSidebarOpen }) => (mobileSidebarOpen ? 'transparent' : 'rgba(54, 55, 64, 0.99)')};

	cursor: pointer;

	transition: 200ms all ease-in-out;
`;

export const SidebarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 10;

	height: 100%;
	width: 100%;

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

	position: relative;

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

		height: 0;
		width: 3px;

		background-color: #dde2ff;

		transition: 400ms all ease-in-out;
	}

	// Active class

	&.active {
		background-color: rgba(159, 162, 180, 0.08);

		& > * {
			color: #dde2ff;
			fill: #dde2ff;
		}

		&:before {
			content: '';
			position: absolute;

			left: 0;

			height: 100%;
			width: 3px;

			background-color: #dde2ff;
		}
	}
`;

export const TransparentBackground = styled.div`
	height: 100%;
	width: 100%;

	position: absolute;

	z-index: 5;

	background-color: rgb(37, 39, 51);
	animation: 250ms darken forwards;

	@keyframes darken {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.5;
		}
	}
`;

export const SidebarUrlContainer = styled.div`
	height: 56px;
	width: 100%;
	max-width: inherit;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	flex-grow: 1;

	padding: 32px 16px;

	position: absolute;
	bottom: 0;

	overflow: hidden;

	& > svg {
		margin: 0 12px 0 16px;
		min-width: 1.75em;

		position: relative;

		transition: 200ms all ease-in-out;

		&:last-child {
			margin-left: auto;
			right: 0;
		}
	}

	&:hover {
		background-color: rgba(155, 160, 170, 0.03);
		cursor: pointer;

		& svg:last-child {
			right: -8px;
		}
	}

	& ::before {
		content: '';

		height: 1px;
		width: 90%;

		margin: 0 5%;

		background-color: #dde2ff;
		opacity: 0.2;

		position: absolute;
		top: 0;
		left: 0;
	}
`;

export const SidebarUrl = styled.div`
	font-style: italic;
	font-size: 0.8rem;

	overflow: hidden;
	text-overflow: ellipsis;

	text-decoration: none;
`;
