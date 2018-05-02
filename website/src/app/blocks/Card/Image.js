import styled from 'styled-components';

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: ${p => (p.rounded ? '100%' : '10px')};
  -webkit-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  -moz-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
`;

export default CardImage;
