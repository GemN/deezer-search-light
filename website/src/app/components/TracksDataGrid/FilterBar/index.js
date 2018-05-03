import React, { Component } from 'react';
import { connect } from 'react-redux';

// blocks
import Button from './Button';
import Container from './Container';
import { filterTracksBy } from '../../../actions/tracks';

class FilterBar extends Component {
  static filters = [
    { key: 'all', label: 'All' },
    { key: 'artist', label: 'Artists' },
    { key: 'album', label: 'Albums' },
  ];

  shouldComponentUpdate(nextProps) {
    if (nextProps.filterBy !== this.props.filterBy) {
      return true;
    }
    return false;
  }

  props: {
    filterBy: string,
    filterTracksBy: Function,
  };

  filterBy = trackFilter => this.props.filterTracksBy(trackFilter);

  render() {
    return (
      <Container>
        {
          FilterBar.filters.map((f) => {
            const active = f.key === this.props.filterBy;
            return (
              <Button active={active} onClick={() => this.filterBy(f.key)} key={f.key}>
                {f.label}
              </Button>
            );
          })
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  filterBy: state.tracks.filterBy,
});

const mapDispatchToProps = dispatch => ({
  filterTracksBy: filter => dispatch(filterTracksBy(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
