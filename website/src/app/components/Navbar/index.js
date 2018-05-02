import React from 'react';
import SearchBar from '../SearchBar';
import Logo from '../Logo';

// blocks
import Container from './Container';
import LogoContainer from './LogoContainer';
import SearchBarContainer from './SearchBarContainer';

const Navbar = () => (
  <Container>
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <SearchBarContainer>
      <SearchBar />
    </SearchBarContainer>
  </Container>
);

export default Navbar;
