import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchTrack, searchTrackQueue } from '../../actions/tracks';
import FontAwesome from '../Pure/FontAwesome';

// blocks
import Container from './Container';
import Field from './Field';
import IconContainer from './IconContainer';

class SearchBar extends Component {
  onSearchFieldChange = (e) => {
    const { value } = e.target;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.props.searchTrackQueue();
    this.timeout = setTimeout(() => {
      this.props.searchTrack(value);
    }, 300);
  };

  props: {
    loading: boolean,
    busy: boolean,
    searchTrack: Function,
    searchTrackQueue: Function,
  };

  render() {
    const { loading, busy } = this.props;
    return (
      <Container>
        <Field
          placeholder="Search by track, album, artist..."
          onChange={this.onSearchFieldChange}
        />
        <IconContainer>
          {
            (loading || busy) ?
              <FontAwesome name="spinner" spin />
              : <FontAwesome name="search" />
          }
        </IconContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.tracksQueryLoading,
  busy: state.tracks.busy,
});

const mapDispatchToProps = dispatch => ({
  searchTrack: searchValue => dispatch(searchTrack({ searchValue })),
  searchTrackQueue: () => dispatch(searchTrackQueue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
