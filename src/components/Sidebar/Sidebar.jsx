import React from 'react';

import LogoSource from '../../assets/images/logo.svg';
// import bgSource from '../../assets/videos/bg.mp4';

import { FaHome, FaRegClipboard, FaCalculator, FaCarrot } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import {
	SidebarWrapper,
	SidebarBrand,
	SidebarLogo,
	SidebarTitle,
	SidebarItems,
	SidebarLink,
	// SidebarBG,
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
