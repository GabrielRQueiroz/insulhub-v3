import LoadingButton from '@mui/lab/LoadingButton';
import { Button, ClickAwayListener, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import Hamburger from 'hamburger-react';
import { useLayoutEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaAngleRight, FaCalculator, FaCarrot, FaHome, FaRegClipboard, FaUserCog } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import LogoSource from '../../assets/images/logo.svg';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { getUrl } from '../../store';
import { disconnectUrl } from '../../store/nightscoutSlice';
import {
	DialogConfirmation,
	SidebarBrand,
	SidebarButton,
	SidebarContainer,
	SidebarItem,
	SidebarLink,
	SidebarList,
	SidebarLogo,
	SidebarTitle,
	SidebarUrl,
	SidebarUrlContainer,
	SidebarWrapper,
	TransparentBackground,
} from './SidebarElements';

export const Sidebar = () => {
	const [mobile, setMobile] = useState();
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { nightscoutUrl } = useSelector(getUrl);
	const dispatch = useDispatch();

	const windowWidth = useWindowWidth();

	const handleSidebarOpenClose = () => {
		setMobileSidebarOpen(!mobileSidebarOpen);
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleUrlChange = () => {
		setIsLoading(true);

		setDialogOpen(false);

		dispatch(disconnectUrl());

		setIsLoading(false);
	};

	const handleClickAway = () => {
		if (!dialogOpen && mobile) setMobileSidebarOpen(false);
	};

	useLayoutEffect(() => {
		if (windowWidth < 576) {
			setMobile(true);
			setMobileSidebarOpen(false);
		} else {
			setMobile(false);
			setMobileSidebarOpen(true);
		}
	}, [windowWidth]);

	return (
		<IconContext.Provider value={{ color: '#9FA2B4' }}>
			<DialogConfirmation
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				open={dialogOpen}
				onClose={handleDialogClose}
			>
				<DialogTitle id='alert-dialog-title'>{'Confirmar alteração'}</DialogTitle>
				<DialogContent id='alert-dialog-description'>
					<DialogContentText>Você quer mesmo alterar sua URL atual:</DialogContentText>
					<DialogContentText>{nightscoutUrl}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button disabled={isLoading} onClick={handleDialogClose}>
						Não, voltar
					</Button>
					<LoadingButton
						variant='contained'
						onClick={handleUrlChange}
						loading={isLoading}
						loadingPosition='end'
						endIcon={<MdExitToApp color='inherit' />}
					>
						Sim
					</LoadingButton>
				</DialogActions>
			</DialogConfirmation>
			<ClickAwayListener onClickAway={handleClickAway}>
				<SidebarContainer mobileSidebarOpen={mobileSidebarOpen} mobile={mobile}>
					<SidebarWrapper>
						<SidebarBrand>
							<SidebarLogo height='40' width='40' title='Insulhub brand logo' src={LogoSource}></SidebarLogo>
							<SidebarTitle>INSULHUB</SidebarTitle>
						</SidebarBrand>
						<SidebarList onClick={mobile ? handleSidebarOpenClose : null}>
							<SidebarItem>
								<SidebarLink activeclassname='active' to='/'>
									<FaHome />
									<span>Início</span>
								</SidebarLink>
							</SidebarItem>
							<SidebarItem>
								<SidebarLink activeclassname='active' to='/summary'>
									<FaRegClipboard />
									<span>Relatório</span>
								</SidebarLink>
							</SidebarItem>
							<SidebarItem>
								<SidebarLink activeclassname='active' to='/calculator'>
									<FaCalculator />
									<span>Regra de Três</span>
								</SidebarLink>
							</SidebarItem>
							<SidebarItem>
								<SidebarLink activeclassname='active' to='/food'>
									<FaCarrot />
									<span>Alimentos</span>
								</SidebarLink>
							</SidebarItem>
						</SidebarList>
						<Tooltip title='👇 Clique para alterar sua URL Nightscout' placement='top' arrow disableInteractive>
							<SidebarUrlContainer onClick={handleDialogOpen}>
								<FaUserCog size={24} />
								<SidebarUrl>{nightscoutUrl || 'your-url.herokuapp.com'}</SidebarUrl>
								<FaAngleRight size={14} />
							</SidebarUrlContainer>
						</Tooltip>
					</SidebarWrapper>
					<SidebarButton mobile={mobile}>
						<Hamburger color='#a4a6b3' size={30} rounded duration={0.5} toggled={mobileSidebarOpen} toggle={handleSidebarOpenClose} />
					</SidebarButton>
				</SidebarContainer>
			</ClickAwayListener>
			{mobile && mobileSidebarOpen && <TransparentBackground />}
		</IconContext.Provider>
	);
};
