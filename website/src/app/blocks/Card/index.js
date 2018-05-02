import styled from 'styled-components';
import Image from './Image';
import Title from './Title';
import ImageContainer from './ImageContainer';

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

Card.Title = Title;
Card.Image = Image;
Card.ImageContainer = ImageContainer;

export default Card;
