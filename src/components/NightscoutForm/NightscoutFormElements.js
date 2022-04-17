import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, TextField } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Dialog)`
	height: auto;

	box-shadow: 0px 12px 32px -16px #101010;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border-radius: 8px;

	animation: 1.5s appear forwards;

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

export const FormLink = styled.a`
	width: 100%;

	font-size: 0.75em;
	text-align: left;

	margin: 0 0 16px;
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
