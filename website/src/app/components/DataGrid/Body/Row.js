import styled from 'styled-components';

const DataGridRow = styled.tr`
  color: #32323d;
  height: 52px;
  cursor: pointer;
  border-top: 1px solid #EFEFF2;
  transition: 0.15s;
  &:hover {
    background-color: #EFEFF2;
  }
`;

export default DataGridRow;
