import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import NightscoutLogo from '../../assets/images/nslogo.png';
import ScreenshotImg from '../../assets/images/url_screenshot.png';
import { urlFormatter } from '../../utils';
import { Loader } from '../Loader';
import { FormButton, FormContainer, FormField, FormImage, FormScreen, FormTextWrapper, FormTitle } from './NightscoutElements';

export const NightscoutForm = () => {
	const [userUrl, setUserUrl] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const urlPatternValidation = (url) => {
		const regex = new RegExp('^(https://|http://)?([a-zA-Z0-9.@_+=-]+).(herokuapp.com|herokuapp.com/)$');
		return regex.test(url);
	};

	const handleInputChange = (event) => {
		const { value } = event.target;
		const validated = !value || urlPatternValidation(value);
		setUserUrl(value.toLowerCase());
		setIsValid(validated);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') buttonSubmit();
	};

	const buttonSubmit = () => {
		const formattedUrl = urlFormatter(userUrl); // src/utils/formatUrl.js

		setIsLoading(true);

		setTimeout(() => {
			localStorage.setItem('nightscout_url', formattedUrl);
			window.location.reload();
		}, 1000 * 3); // 3 seconds
	};

	return (
		<FormScreen>
			<FormContainer>
				<FormTitle>Para usar o Insulhub, registre a sua URL Nightscout</FormTitle>
				<FormImage height={96} src={NightscoutLogo} />
				<FormImage src={ScreenshotImg} />
				<FormTextWrapper>
					<FormField
						required
						error={!isValid && userUrl !== ''}
						margin='normal'
						type='url'
						variant='standard'
						size='medium'
						label='Nightscout URL'
						helperText='Ex.: https://your-url.herokuapp.com/'
						value={userUrl}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>
					<FormButton
						disabled={!isValid || userUrl === ''}
						variant='contained'
						endIcon={isLoading ? null : <AiFillCheckCircle />}
						onClick={buttonSubmit}
					>
						{isLoading ? <Loader position='absolute' color='white' size={6} margin={-16} /> : 'VAMOS LÁ!'}
					</FormButton>
				</FormTextWrapper>
			</FormContainer>
		</FormScreen>
	);
};
