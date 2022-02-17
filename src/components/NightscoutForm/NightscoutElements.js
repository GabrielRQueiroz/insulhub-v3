import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const FormScreen = styled.div`
	height: 100%;
	width: 100%;

	position: absolute;

	z-index: 999;

	background: rgba(1, 1, 1, 0.5);

	display: flex;
	justify-content: center;
	align-items: center;

	animation: 1s appear forwards;

	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const FormContainer = styled.div`
	height: auto;
	width: clamp(50%, 500px, 90%);

	box-shadow: 0px 12px 32px -16px #101010;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border-radius: 8px;

	background-color: #ffffff;

	animation: 1.5s appear forwards;

	padding: 28px;

	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const FormTitle = styled.h3`
	text-align: center;

	line-height: 1.25;
`;

export const FormImage = styled.img`
	margin-top: 32px;

	object-fit: contain;

	pointer-events: none;

	max-height: 96px;
	width: 100%;
`;

export const FormTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	width: 100%;
`;

export const FormField = styled(TextField)`
	width: 100%;
	font-size: 0.8em;

	& > p {
		font-size: clamp(0.9em, 1vw, 1em);
	}
`;

export const FormButton = styled(LoadingButton)`
	align-self: flex-end;
`;
