import LoadingButton from "@mui/lab/LoadingButton";
import {
	Button,
	ClickAwayListener,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Tooltip,
} from "@mui/material";
import Hamburger from "hamburger-react";
import { useLayoutEffect, useState } from "react";
import { IconContext } from "react-icons";
import {
	FaAngleRight,
	FaCalculator,
	FaCarrot,
	FaClipboardList,
	FaHome,
	FaUserCog,
} from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LogoSource from "../../assets/images/logo.svg";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { getUrl } from "../../store";
import { disconnectUrl } from "../../store/nightscoutSlice";
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
} from "./SidebarElements";

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
		<IconContext.Provider value={{ color: "#9FA2B4" }}>
			{/* Dialog for user URL change confirmation */}
			<DialogConfirmation
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				open={dialogOpen}
				onClose={handleDialogClose}
			>
				<DialogTitle id="alert-dialog-title">
					Confirmar alteração
				</DialogTitle>
				<DialogContent tabIndex={0} id="alert-dialog-description">
					<DialogContentText>
						Você quer mesmo alterar sua URL atual:
					</DialogContentText>
					<DialogContentText>{nightscoutUrl}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						disabled={isLoading}
						onClick={handleDialogClose}
					>
						Não, voltar
					</Button>
					<LoadingButton
						variant="contained"
						onClick={handleUrlChange}
						loading={isLoading}
						loadingPosition="end"
						endIcon={<MdExitToApp color="inherit" />}
					>
						Sim
					</LoadingButton>
				</DialogActions>
			</DialogConfirmation>
			{/* Listener for clicks outside sidebar */}
			<ClickAwayListener onClickAway={handleClickAway}>
				{/* Actual sidebar */}
				<>
					<SidebarButton
						mobileSidebarOpen={mobileSidebarOpen}
						aria-expanded={mobileSidebarOpen}
						mobile={mobile}
					>
						<Hamburger
							id="hamburger"
							label="Pressione para abrir a navegação"
							color="#a4a6b3"
							size={30}
							rounded
							duration={0.5}
							toggle={handleSidebarOpenClose}
							toggled={mobileSidebarOpen}
						/>
					</SidebarButton>
					<SidebarContainer
						aria-labelledby="hamburger"
						mobileSidebarOpen={mobileSidebarOpen}
						mobile={mobile}
					>
						<SidebarWrapper>
							<SidebarBrand>
								<SidebarLogo
									height="40"
									width="40"
									title="Logo do Insulhub"
									alt="Uma seringa e um vidro de insulina com conteúdo azul e rótulo amarelo."
									src={LogoSource}
								/>
								<SidebarTitle>INSULHUB</SidebarTitle>
							</SidebarBrand>
							<SidebarList
								onClick={mobile ? handleSidebarOpenClose : null}
							>
								<SidebarItem>
									<SidebarLink
										role="button"
										aria-label="Link do menu para a página inicial"
										activeclassname="active"
										to="/"
									>
										<FaHome />
										<span>Início</span>
									</SidebarLink>
								</SidebarItem>
								<SidebarItem>
									<SidebarLink
										role="button"
										aria-label="Link do menu para os relatórios mensais"
										activeclassname="active"
										to="/summary"
									>
										<FaClipboardList />
										<span>Relatório</span>
									</SidebarLink>
								</SidebarItem>
								<SidebarItem>
									<SidebarLink
										role="button"
										aria-label="Link do menu para a calculadora de regra de três"
										activeclassname="active"
										to="/calculator"
									>
										<FaCalculator />
										<span>Regra de Três</span>
									</SidebarLink>
								</SidebarItem>
								<SidebarItem>
									<SidebarLink
										role="button"
										aria-label="Link do menu para a tabela nutricional"
										activeclassname="active"
										to="/food"
									>
										<FaCarrot />
										<span>Alimentos</span>
									</SidebarLink>
								</SidebarItem>
							</SidebarList>
							<Tooltip
								title="👇 Clique para alterar sua URL Nightscout"
								placement="top"
								arrow
								disableInteractive
							>
								<SidebarUrlContainer
									role="button"
									aria-label="Pressione para trocar a url Nightscout configurada"
									type="button"
									tabIndex="0"
									onClick={handleDialogOpen}
								>
									<FaUserCog size={24} />
									<SidebarUrl>
										{nightscoutUrl || "your-url.herokuapp.com"}
									</SidebarUrl>
									<FaAngleRight size={14} />
								</SidebarUrlContainer>
							</Tooltip>
						</SidebarWrapper>
					</SidebarContainer>
				</>
			</ClickAwayListener>
			{mobile && mobileSidebarOpen && <TransparentBackground />}
		</IconContext.Provider>
	);
};
