import styled, { css } from 'styled-components';

const UITrow = styled.tr`
	height: 50px;
	border-bottom: 1px solid #dfe6e8;
	${props => props.action && css`
		cursor: pointer;
	`}
	${props => props.impress && css`
		background-color: #dfe6e8;
	`}
`;

export default UITrow;
