import React from 'react';
import styled from 'styled-components';
import FontAwesome from '../../Pure/FontAwesome';

const OrderIconContainer = styled.span`
  margin: 0 4px;
`;

type Props = {
  orderKey: string,
  colAscKey: string,
};

const OrderIcon = (props: Props) => (
  <OrderIconContainer>
    <FontAwesome name={props.orderKey === props.colAscKey ? 'angle-up' : 'angle-down'} />
  </OrderIconContainer>
);

export default OrderIcon;
