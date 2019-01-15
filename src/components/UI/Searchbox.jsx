import styled from 'styled-components';

const UISearchbox = styled.div`
	position: relative;
	display: inline-block;
	width: 250px;
	height: 32px;
    padding-left: 7px;
	border: 1px solid #dfe6e8;
	i {
		position: absolute;
		top: 4px;
		right: 6px;
		z-index: -1;
		background-color: #dfe6e8;
	}

    &:focus-within {
        border-color: black;
        i { 
            background-color: black;
        }
    }

	margin: 0 0 15px 0;
`;

const UISearch = styled.input`
	width: 100%;
	height: 100%;
	border: none;
	background-color: transparent;
`;

export { UISearchbox, UISearch };
