import styled from 'styled-components';
import { RotateLoader as loader } from 'react-spinners';

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 24px 0;

	height: 100%;
	width: 100%;
`;

export const LoaderCenter = styled(loader)``;
