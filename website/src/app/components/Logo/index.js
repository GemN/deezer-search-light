import React from 'react';

// blocks
import Container from './Container';
import Deezer from './Deezer';
import Light from './Light';

const Logo = () => (
  <Container>
    <Deezer />
    <Light />
  </Container>
);

Logo.Deezer = Deezer;
Logo.Light = Light;

export default Logo;
