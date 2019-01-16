import styled, { css } from 'styled-components';

const UICheck = styled.span`
	position: absolute;
	top: 50%;
	left: 0;
	width: 16px;
	height: 16px;
	margin-left: 5px;
	background-color: transparent;
	border: 1px solid #dfe6e8;
	border-radius: 2px;
	transform: translateY(-50%);
	&:after {
		content: "";
		position: absolute;
		display: none;
	}
	${(props) =>
		props.checked &&
		css`
			border-color: #ed3b48;
			&:after {
				display: block;
			}
		`};
	&:after {
		left: 4px;
		top: 0;
		width: 5px;
		height: 10px;
		border: solid #ed3b48;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`;

export default UICheck;
