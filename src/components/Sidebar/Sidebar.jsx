import { ClickAwayListener, Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Hamburger from 'hamburger-react';
import { useLayoutEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaCalculator, FaCarrot, FaHome, FaRegClipboard, FaUserCog, FaAngleRight } from 'react-icons/fa';
import LogoSource from '../../assets/images/logo.svg';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
	SidebarBrand,
	SidebarButton,
	SidebarContainer,
	SidebarItem,
	SidebarLink,
	SidebarList,
	SidebarLogo,
	SidebarTitle,
	SidebarWrapper,
	TransparentBackground,
	SidebarUrlContainer,
	SidebarUrl,
} from './SidebarElements';

export const Sidebar = () => {
	const [mobile, setMobile] = useState();
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
		setTimeout(() => {
			localStorage.removeItem('nightscout_url');
			window.location.reload();
		}, 2 * 1000);
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
			<Dialog aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description' open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle id='alert-dialog-title'>{'Confirmar alteração'}</DialogTitle>
				<DialogContent id='alert-dialog-description'>
					<DialogContentText>Você quer mesmo alterar sua URL atual:</DialogContentText>
					<DialogContentText>{localStorage.getItem('nightscout_url')}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button disabled={isLoading} onClick={handleDialogClose}>
						Não, voltar
					</Button>
					<LoadingButton variant='contained' onClick={handleUrlChange} loading={isLoading}>
						Sim
					</LoadingButton>
				</DialogActions>
			</Dialog>
			<ClickAwayListener onClickAway={handleClickAway}>
				<SidebarContainer mobileSidebarOpen={mobileSidebarOpen} mobile={mobile}>
					<SidebarWrapper>
						<SidebarBrand>
							<SidebarLogo height='40' width='40' title='InsulHub brand logo' src={LogoSource}></SidebarLogo>
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
								<SidebarUrl>{localStorage.getItem('nightscout_url') || 'your-url.herokuapp.com'}</SidebarUrl>
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
