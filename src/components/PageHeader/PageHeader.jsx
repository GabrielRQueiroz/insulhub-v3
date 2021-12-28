import React from 'react';

import styled from 'styled-components';

const PageTitle = styled.h2`
	font-size: 1.5rem;
`;

const PageHeaderWrapper = styled.header`
	top: 0;

	display: flex;
	justify-content: space-between;

	height: 44px;
	width: 100%;

	color: #252733;

	margin: 20px 0;
	padding: 0 15px;

	@media screen and (max-width: 576px) {
		flex-direction: column;

		& h2,
		h3 {
			text-align: center;
		}
	}
`;

export const PageHeader = ({ heading, children }) => {
	return (
		<PageHeaderWrapper>
			<PageTitle>{heading}</PageTitle>
			{children}
		</PageHeaderWrapper>
	);
};
