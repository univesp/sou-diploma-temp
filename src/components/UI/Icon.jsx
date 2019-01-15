import styled from 'styled-components';

const UIIcon = styled.i`
	width: 20px;
	height: 20px;
	-webkit-mask-image: url(${(props) => props.icon});
	mask-image: url(${(props) => props.icon});
`;

export default UIIcon;
