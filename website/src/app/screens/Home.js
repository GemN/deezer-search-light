import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import TracksDataGrid from '../components/TracksDataGrid';

const HomeContainer = styled.div`
  position: relative;
  height: 100vh;
`;
const GridContainer = styled.div`
  padding: 0px 32px 32px 32px;
`;

const TitleContainer = styled.div`
  width: 100%;
  -webkit-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  -moz-box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
  box-shadow: 0px 2px 10px 1px rgba(175,175,175,0.24);
`;

const Title = styled.div`
  padding: 0 32px;
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  line-height: 54px;
`;

const Deezer = styled.span`
  font-size: 24px;
  letter-spacing: -1.5px;
`;

const Light = styled.span`
  margin: 8px;
  font-family: Meddon, sans-serif;
`;

const NoSearch = styled.div`
  font-size: 40px;
  line-height: 1.55;
  width: 60%;
  margin: auto;
  min-width: 450px;
  text-align: center;
  font-weight: 100;
  position: absolute;
  color: #32323d;
  top: calc(50% - 27px - 40px);
  left: 0;
  right: 0;
  white-space: pre-wrap;
`;

const styles = {
  searchBar: {
    lineHeight: 54,
    color: '#848484',
  },
};

class Home extends PureComponent {
  state = {
    searchValue: '',
  };

  render() {
    return (
      <HomeContainer>
        <TitleContainer>
          <Title><Deezer>DEEZER</Deezer> <Light>light</Light></Title>
          <SearchBar
            containerStyle={styles.searchBar}
            onSearch={(searchValue) => {
              if (searchValue) this.setState({ searchValue });
            }}
          />
        </TitleContainer>
        {
          this.state.searchValue ?
            <GridContainer>
              <TracksDataGrid
                searchValue={this.state.searchValue}
              />
            </GridContainer>
          :
            <NoSearch>
              {'Listen to your music, no limits.\nAnywhere, anytime.'}
            </NoSearch>
        }
      </HomeContainer>
    );
  }
}

export default Home;
