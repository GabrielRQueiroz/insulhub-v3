import React from 'react';
import { IconContext } from 'react-icons';
// import bgSource from '../../assets/videos/bg.mp4';
import { FaCalculator, FaCarrot, FaHome, FaRegClipboard } from 'react-icons/fa';
import LogoSource from '../../assets/images/logo.svg';
import {
	SidebarBrand,
	SidebarItems,
	SidebarLink,
	SidebarLogo,
	SidebarTitle,
	SidebarWrapper,
} from './SidebarElements';

export const Sidebar = () => {
	return (
		<IconContext.Provider value={{ color: '#9FA2B4' }}>
			<SidebarWrapper>
				<SidebarBrand>
					<SidebarLogo src={LogoSource}></SidebarLogo>
					<SidebarTitle>INSULHUB</SidebarTitle>
				</SidebarBrand>
				<SidebarItems>
					<SidebarLink activeclassname='active' to='/'>
						<FaHome />
						<span>Principal</span>
					</SidebarLink>
					<SidebarLink activeclassname='active' to='/summary'>
						<FaRegClipboard />
						<span>Relatório</span>
					</SidebarLink>
					<SidebarLink activeclassname='active' to='/calculator'>
						<FaCalculator />
						<span>Regra de Três</span>
					</SidebarLink>
					<SidebarLink activeclassname='active' to='/food'>
						<FaCarrot />
						<span>Alimentos</span>
					</SidebarLink>
				</SidebarItems>
			</SidebarWrapper>
			{/* <SidebarBG loop muted autoPlay>
				<source src={bgSource} type='video/mp4' />
			</SidebarBG> */}
		</IconContext.Provider>
	);
};
