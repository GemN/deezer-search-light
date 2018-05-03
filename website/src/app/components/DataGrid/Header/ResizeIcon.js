import React from 'react';
import styled from 'styled-components';
import FontAwesome from '../../Pure/FontAwesome';

const ResizeContainer = styled.div`
  position: absolute;
  top: calc(50% - 6.5px);
  right: 0;
  display: inline-block;
  margin-left: 4px;
  cursor: col-resize;
  color: #afafaf;
  fontSize: 10px;
`;

const ResizeIcon = () => (
  <ResizeContainer>
    <FontAwesome name="arrows" />
  </ResizeContainer>
);

export default ResizeIcon;
