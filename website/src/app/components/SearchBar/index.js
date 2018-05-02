import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { searchTrack, searchTrackQueue } from '../../actions/tracks';

// blocks
import Container from './Container';
import Field from './Field';
import IconContainer from './IconContainer';

class SearchBar extends Component {
  onSearchFieldChange = (e) => {
    const { value } = e.target;
    this.props.searchTrackQueue({
      timeout: setTimeout(() => {
        this.props.searchTrack(value);
      }, 400),
    });
  };

  props: {
    loading: boolean,
    searchTrack: Function,
    searchTrackQueue: Function,
  };

  render() {
    return (
      <Container>
        <Field
          placeholder="Search by track, album, artist..."
          onChange={this.onSearchFieldChange}
        />
        <IconContainer>
          {
            this.props.loading ?
              <FontAwesome name="spinner" spin />
              : <FontAwesome name="search" />
          }
        </IconContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ loading }) => ({
  loading,
});

const mapDispatchToProps = dispatch => ({
  searchTrack: searchValue => dispatch(searchTrack(searchValue)),
  searchTrackQueue: searchTimeout => dispatch(searchTrackQueue(searchTimeout)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
