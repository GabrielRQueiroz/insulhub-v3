import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageHeader } from "../../components";
import {
	CalculatorButton,
	CalculatorContainer,
	CalculatorInput,
	CalculatorInputBox,
	CalculatorInputContainer,
	CalculatorInputHeading,
	CalculatorMainCard,
	CalculatorResultBox,
} from "./CalculatorElements";

export const Calculator = () => {
	const [result, setResult] = useState("X");
	const [firstNumber, setFirstNumber] = useState("");
	const [secondNumber, setSecondNumber] = useState("");
	const [thirdNumber, setThirdNumber] = useState("");
	const [isAnswered, setIsAnswered] = useState(false);

	const handleCalculation = event => {
		event.preventDefault();

		if (firstNumber && secondNumber && thirdNumber) {
			const output = (secondNumber * thirdNumber) / firstNumber;
			setResult(output.toFixed(1));
			setIsAnswered(true);
		} else {
			toast.error("Preencha os campos restantes", { duration: 3000 });
		}
	};

	return (
		<CalculatorContainer id="calculator">
			<PageHeader heading="Regra de Três" />
			<CalculatorMainCard  onSubmit={handleCalculation}>
				<CalculatorInputContainer>
					<CalculatorInputBox>
						<CalculatorInputHeading>Se:</CalculatorInputHeading>
						<CalculatorInput
							onChange={event => setFirstNumber(event.target.value)}
							onFocus={event => event.target.select()}
							aria-label="Primeiro valor da regra de três"
							max={999999}
							enterKeyHint="next"
							inputMode="numeric"
							pattern="[0-9]*"
							type="number"
							value={firstNumber}
							step={0.1}
							autoFocus
							required
							min={1}
						/>
					</CalculatorInputBox>
					<CalculatorInputBox>
						<CalculatorInputHeading>Equivale a:</CalculatorInputHeading>
						<CalculatorInput
							onChange={event => setSecondNumber(event.target.value)}
							onFocus={event => event.target.select()}
							aria-label="Segundo valor da regra de três"
							max={999999}
							enterKeyHint="next"
							inputMode="numeric"
							pattern="[0-9]*"
							type="number"
							value={secondNumber}
							step={0.1}
							required
							min={1}
						/>
					</CalculatorInputBox>
				</CalculatorInputContainer>
				<CalculatorInputContainer>
					<CalculatorInputBox>
						<CalculatorInputHeading>Então:</CalculatorInputHeading>
						<CalculatorInput
							onChange={event => setThirdNumber(event.target.value)}
							onFocus={event => event.target.select()}
							aria-label="Terceiro valor da regra de três"
							max={999999}
							enterKeyHint="enter"
							inputMode="numeric"
							pattern="[0-9]*"
							type="number"
							value={thirdNumber}
							step={0.1}
							required
							min={1}
						/>
					</CalculatorInputBox>
					<CalculatorResultBox isAnswered={isAnswered}>
						<CalculatorInputHeading>Equivale a:</CalculatorInputHeading>
						<em>{result}</em>
					</CalculatorResultBox>
				</CalculatorInputContainer>
				<CalculatorButton type="submit">Calcular</CalculatorButton>
			</CalculatorMainCard>
		</CalculatorContainer>
	);
};
