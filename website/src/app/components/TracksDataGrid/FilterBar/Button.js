import styled from 'styled-components';

const FilterButton = styled.div`
  display: inline-block;
  padding-bottom: 16px;
  font-size: 16px;
  margin-right: 32px;
  letter-spacing: 0.5px;
  transition: color 0.15s ease-out;
  cursor: pointer;
  color: #92929d;
  border-bottom: 2px solid transparent;
  &:hover {
    color: #23232d;
    border-bottom: 2px solid #92929d;
  }
  ${props => (props.active ? `
    color: #23232d;
    border-bottom: 2px solid #007feb;
  ` : '')}
`;

export default FilterButton;
