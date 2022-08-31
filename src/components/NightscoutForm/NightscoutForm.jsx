import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import NightscoutLogo from '../../assets/images/nslogo.png';
import ScreenshotImg from '../../assets/images/url_screenshot.png';
import { connectUrl } from '../../store/nightscoutSlice';
import { urlFormatter } from '../../utils';
import { FormButton, FormContainer, FormField, FormImage, FormLink, FormTextWrapper } from './NightscoutFormElements';

export const NightscoutForm = () => {
	const [userUrl, setUserUrl] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const urlPatternValidation = (url) => {
		const regex = new RegExp('^(https://|http://)?([a-zA-Z0-9.@_+=-]+).(herokuapp.com|herokuapp.com/|fly.fev|fly.fev/)$');
		return regex.test(url);
	};

	const handleInputChange = (event) => {
		let { value, maxLength } = event.target;
		value = value.replace(' ', '').slice(0, maxLength);
		const validated = !value || urlPatternValidation(value);
		setUserUrl(value.toLowerCase());
		setIsValid(validated);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && isValid) buttonSubmit();
	};

	const buttonSubmit = () => {
		const formattedUrl = urlFormatter(userUrl); // src/utils/formatUrl.js

		setIsLoading(true);

		dispatch(connectUrl(formattedUrl));

		setIsLoading(false);
	};

	return (
		<FormContainer open={!localStorage.nightscout_url} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
			<DialogTitle tabIndex={0} id='alert-dialog-title'>
				Para usar o Insulhub, registe sua URL Nightscout
			</DialogTitle>
			<DialogContent id='alert-dialog-description'>
				<FormImage alt='Logo Nightscout: Um desenho de uma coruja preta' height={96} src={NightscoutLogo} />
				<FormImage alt='A imagem de exemplo tem o seguinte url: "https://example.fly.dev.com/"' src={ScreenshotImg} />
				<FormField
					tabIndex={1}
					required
					autoFocus
					error={!isValid && userUrl !== ''}
					margin='normal'
					type='text'
					variant='standard'
					size='medium'
					label='URL Nightscout'
					helperText='Exemplo: https://url.fly.dev/'
					value={userUrl}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					inputProps={{ maxLength: 60 }}
				/>
				<FormLink href='https://nightscout.github.io/' tabIndex={3} role='link' target='_blank'>
					O que é o Nightscout? <BsBoxArrowUpRight />
				</FormLink>
			</DialogContent>
			<DialogActions>
				<FormTextWrapper>
					<FormButton
						tabIndex={2}
						disabled={!isValid || userUrl === ''}
						endIcon={<AiFillCheckCircle />}
						onClick={buttonSubmit}
						loading={isLoading}
						loadingPosition='end'
						aria-label={`Confirmar a URL ${userUrl} ?`}
						variant='contained'
					>
						VAMOS LÁ!
					</FormButton>
				</FormTextWrapper>
			</DialogActions>
		</FormContainer>
	);
};
