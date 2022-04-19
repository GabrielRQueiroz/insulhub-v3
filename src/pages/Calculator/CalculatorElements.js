import styled from "styled-components";

export const CalculatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	min-height: 100vh;
	width: 100%;

	gap: 15px;
`;

export const CalculatorMainCard = styled.form`
	display: flex;

	flex-direction: column;

	align-items: center;
	justify-content: space-between;

	flex-grow: 1;

	gap: 16px;

	overflow-y: hidden;

	border: 2px solid #dfe0eb;
	border-radius: 8px;

	background-color: #ffffff;

	padding: 16px;

	width: 100%;

	margin-bottom: 30px;
`;

export const CalculatorInputContainer = styled.div`
	flex: 1 0 100%;

	display: flex;
	justify-content: space-evenly;
	gap: 16px;

	width: 100%;

	&:first-child {
		border-bottom: 2px dotted #dfe0eb;
	}

	@media screen and (max-width: 576px) {
		flex-direction: column;

		justify-content: space-evenly;
		align-items: center;
	}

	@media screen and (max-width: 768px) {
		padding: 16px 8px;

		gap: 12px;
	}
`;

export const CalculatorInputBox = styled.div`
	display: flex;
	flex-direction: column;

	justify-content: center;

	gap: 16px;

	width: clamp(25%, 500px, 40%);

	@media screen and (max-width: 576px) {
		width: 75%;
	}
`;

export const CalculatorResultBox = styled(CalculatorInputBox)`
	align-self: center;

	gap: 12px;

	& > em {
		font-weight: bold;

		text-align: center;

		border: 2px solid
			${({ isAnswered }) => (isAnswered ? "#3751ff" : "#dfe0eb")};
		border-radius: 8px;

		box-shadow: 1px 1px 4px 0 rgba(200, 200, 200, 0.5);

		color: ${({ isAnswered }) => (isAnswered ? "#000" : "#dfe0eb")};

		font-size: 1.25em;

		padding: 24px;
	}
`;

export const CalculatorInputHeading = styled.h3`
	font-size: clamp(1em, 2.5vw, 1.4em);
`;

export const CalculatorInput = styled.input`
	outline: 0;

	border: 0;
	border-bottom: 2px solid #dfe0eb;

	font-size: 1.25em;

	&::-webkit-inner-spin-button,
	::-webkit-outer-spin-button {
		display: none;
	}

	transition: 200ms ease-in-out;

	&:active,
	:focus {
		border-color: #3751ff;
	}
`;

export const CalculatorButton = styled.button`
	outline: none;
	border: 2px solid #3751ff;
	border-radius: 8px;

	padding: 12px 24px;

	font-size: 1.2em;
	font-weight: bold;

	background-color: #3751ff;
	color: #ffffff;

	cursor: pointer;

	transition: 200ms ease-in-out;

	&:hover,
	:active {
		background-color: #ffffff;
		color: #3751ff;

		box-shadow: 1px 1px 4px 0 rgba(200, 200, 200, 0.75);
	}

	&:focus {
		outline: 2px solid blue;
	}
`;
