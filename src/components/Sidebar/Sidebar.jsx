import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars, FaCalculator, FaCarrot, FaHome, FaRegClipboard } from 'react-icons/fa';
import LogoSource from '../../assets/images/logo.svg';
// import bgSource from '../../assets/videos/bg.mp4';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {
	SidebarBrand,
	SidebarButton,
	SidebarContainer,
	SidebarList,
	SidebarLink,
	SidebarLogo,
	SidebarTitle,
	SidebarWrapper,
	SidebarItem,
} from './SidebarElements';

export const Sidebar = () => {
	const [mobile, setMobile] = useState();
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const windowWidth = useWindowWidth();

	const handleOpen = () => {
		setMobileSidebarOpen(!mobileSidebarOpen);
	};

	useEffect(() => {
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
			<SidebarContainer mobileSidebarOpen={mobileSidebarOpen} mobile={mobile}>
				<SidebarWrapper>
					<SidebarBrand>
						<SidebarLogo title='InsulHub brand logo' src={LogoSource}></SidebarLogo>
						<SidebarTitle>INSULHUB</SidebarTitle>
					</SidebarBrand>
					<SidebarList onClick={mobile ? handleOpen : null}>
						<SidebarItem>
							<SidebarLink activeclassname='active' to='/'>
								<FaHome />
								<span>Principal</span>
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
				</SidebarWrapper>
				{/* <SidebarBG loop muted autoPlay>
				<source src={bgSource} type='video/mp4' />
			</SidebarBG> */}
				<SidebarButton
					onClick={handleOpen}
					mobileSidebarOpen={mobileSidebarOpen}
					mobile={mobile}
				>
					{mobileSidebarOpen ? <AiOutlineClose /> : <FaBars />}
				</SidebarButton>
			</SidebarContainer>
		</IconContext.Provider>
	);
};
