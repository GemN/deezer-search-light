import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const SearchField = styled.input`
  outline: none;
  font-size: 15px;
  border: none;
  width: 350px;
  ::-webkit-input-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  ::-moz-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  :-ms-input-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
  :-moz-placeholder {
    font-weight: 100;
    color: #cdcdcd;
  }
`;

const SearchContainer = styled.div`
  display: inline-block;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  padding: 6px;
`;

const IconContainer = styled.div`
  display: inline-block;
  color: #afafaf;
`;

class SearchBar extends Component {
  state = {
    timeout: null,
    loading: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.loading === this.state.loading) return false;
    return true;
  }

  onSearchFieldChange = (e) => {
    const { value } = e.target;
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({
      loading: true,
      timeout: setTimeout(async () => {
        this.props.onSearch(value);
        this.setState({ loading: false });
      }, 300),
    });
  };

  props: {
    onSearch: Function,
    containerStyle: {},
  };

  render() {
    return (
      <SearchContainer style={this.props.containerStyle}>
        <SearchField
          placeholder="Search by track, album, artist..."
          onChange={this.onSearchFieldChange}
        />
        <IconContainer>
          {
            this.state.loading ?
              <FontAwesome name="spinner" spin />
              : <FontAwesome name="search" />
          }
        </IconContainer>
      </SearchContainer>
    );
  }
}

export default SearchBar;
