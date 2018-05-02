import styled from 'styled-components';

const SearchField = styled.input`
  outline: none;
  font-size: 15px;
  border: none;
  width: 350px;
  ::-webkit-input-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  ::-moz-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  :-ms-input-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  :-moz-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
`;

export default SearchField;
