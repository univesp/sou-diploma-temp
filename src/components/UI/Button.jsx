import styled, { css } from 'styled-components'

const UIButton = styled.button`
    display: block;
    margin-left: auto;
    padding: 0.75rem 1.8rem;
    text-transform: uppercase;
    border: none;
    background-color: #ed3b48;
    color: #fff;
    border-radius: 4px;
    margin-top: 30px;
    cursor: pointer;
    ${props => props.disabled && css`
        cursor: not-allowed;
        background-color: rgba(237, 59, 72, 0.3);
    `}
`;

export default UIButton