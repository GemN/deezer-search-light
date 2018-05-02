import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card';

const CardGridContainer = styled.div`
  width: 100%;
  min-width: 900px;
  padding: 0;
`;

const CardImgContainer = styled.div`
  padding: 0 24px;
`;


class CardGrid extends Component {
  static defaultProps = {
    keyExtractor: item => item.id,
  };

  // todo passe redux
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      return true;
    }
    return false;
  }

  props: {
    data: {},
    rounded: boolean,
    keyExtractor: Function,
    imageExtractor: Function,
    titleExtractor: Function,
    onClick: Function,
  };

  renderCard = cardData => (
    <Card onClick={e => this.props.onClick(e, cardData)} key={this.props.keyExtractor(cardData)}>
      <Card.ImageContainer>
        <Card.Image rounded={this.props.rounded} src={this.props.imageExtractor(cardData)} />
      </Card.ImageContainer>
      <Card.Title>{this.props.titleExtractor(cardData)}</Card.Title>
    </Card>
  );

  render() {
    const { data } = this.props;
    return (
      <CardGridContainer>
        {data && data.map(this.renderCard)}
      </CardGridContainer>
    );
  }
}

export default CardGrid;
