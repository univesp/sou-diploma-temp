import styled, { css } from 'styled-components';

const UITable = styled.table`
	width: 100%;
	height: 100%;
	border-collapse: collapse;
`;

const UITbody = styled.tbody``;

const UITcol = styled.td`
    position: relative;
    min-width: 25px;
`;

const UIThead = styled.thead`font-weight: bold;`;

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

export { UITable, UITbody, UITcol, UIThead, UITrow };
