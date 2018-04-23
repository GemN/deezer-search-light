import React, { Component } from 'react';
import styled from 'styled-components';

const CardGridContainer = styled.div`
  width: 100%;
  min-width: 900px;
  padding: 0;
`;

const Card = styled.div`
  display: inline-block;
  width: 25%;
  margin: 16px 0;
  text-align: center;
  cursor: pointer;
  -webkit-transition: opacity 0.2s ease-in-out;
  -moz-transition: opacity 0.2s ease-in-out;
  -ms-transition: opacity 0.2s ease-in-out;
  -o-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

const CardImgContainer = styled.div`
  padding: 0 24px;
`;

const CardImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: ${p => (p.rounded ? '100%' : '10px')};
  -webkit-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  -moz-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
`;

const CardTitle = styled.div`
  margin-top: 16px;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;


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
      <CardImgContainer>
        <CardImg rounded={this.props.rounded} src={this.props.imageExtractor(cardData)} />
      </CardImgContainer>
      <CardTitle>{this.props.titleExtractor(cardData)}</CardTitle>
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
