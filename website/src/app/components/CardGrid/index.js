import React, { Component } from 'react';
import Card from '../../blocks/Card';

// blocks
import Container from './Container';

class CardGrid extends Component {
  static defaultProps = {
    keyExtractor: item => item.id,
  };

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
      <Container>
        {data && data.map(this.renderCard)}
      </Container>
    );
  }
}

export default CardGrid;
