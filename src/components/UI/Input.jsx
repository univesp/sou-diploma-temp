import styled, { css } from 'styled-components';

const UIInput = styled.input`
    ${(props) => props.hide && css`display: none;`};
`;

export default UIInput;
