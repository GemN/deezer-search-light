import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadMoreTracks } from '../../actions/tracks';

// blocks
import FilterByArtists from './FilterByArtists';
import FilterByAlbums from './FilterByAlbums';
import DefaultGrid from './DefaultGrid/index';
import Container from './Container';
import FilterBar from './FilterBar';
import TryThis from './TryThis';
import Error from './Error';
import InfosContainer from './InfosContainer';
import InfosContainerTitle from './InfosContainerTitle';

class TracksDataGrid extends PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { data, next } = this.props.tracks;

    if ((window.scrollY - window.innerHeight) >= (document.body.offsetHeight - 200)
      && (data && data.length) && next) {
      this.props.loadMoreTracks();
    }
  };

  props: {
    loadMoreTracks: Function,
    searchValue: string,
    trackFilter: string,
    tracks: [],
    error: boolean,
    loading: boolean,
  };

  renderDataContainer = (filter, tracks) => {
    switch (filter) {
      case 'artist':
        return <FilterByArtists tracks={tracks} />;
      case 'album':
        return <FilterByAlbums tracks={tracks} />;
      default:
        return (<DefaultGrid tracks={tracks} />);
    }
  };

  renderInfoContainer = () => {
    const {
      searchValue, loading, tracks,
    } = this.props;
    const { data } = tracks;

    return (
      <InfosContainer>
        <InfosContainerTitle>
          {
            (data && data.length) || loading ?
              `Search results for « ${searchValue} »`
              : `No results for « ${searchValue} »`
          }
        </InfosContainerTitle>
        {
          (!data || data.length === 0) && !loading ?
            <TryThis>Pssst..! Try this « Can't Stop (Dub Mix) - Hanson & Davis »</TryThis>
            : <FilterBar />
        }
      </InfosContainer>
    );
  };

  render() {
    const {
      tracks, error, trackFilter,
    } = this.props;
    const { data } = tracks;

    if (error) {
      return <Error>Sorry couldn't load any tracks...</Error>;
    }

    return (
      <Container>
        {this.renderInfoContainer()}
        {(data && data.length) ? this.renderDataContainer(trackFilter, data) : ''}
      </Container>
    );
  }
}

TracksDataGrid.FilterByArtists = FilterByArtists;
TracksDataGrid.FilterByAlbums = FilterByAlbums;

const mapStateToProps = state => ({
  error: state.tracksQueryError,
  loading: state.tracksQueryLoading,
  tracks: state.tracks.data,
  searchValue: state.tracks.searchValue,
  trackFilter: state.tracks.filterBy,
});

const mapDispatchToProps = dispatch => ({
  loadMoreTracks: () => dispatch(loadMoreTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksDataGrid);
