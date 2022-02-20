import React from 'react';

import styled from 'styled-components';

const PageTitle = styled.h2`
	font-size: 1.5rem;
`;

const PageHeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;

	width: 100%;

	color: #252733;

	margin-top: 30px;

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
