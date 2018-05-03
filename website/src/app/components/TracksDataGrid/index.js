import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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
  constructor(props) {
    super(props);

    this.state = {
      lastIndex: 0,
      currentOrder: null,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = async () => {
    const { data } = this.state.fetchedData;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)
      && (data && data.length) && this.state.fetchedData.next) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        const fetchedDataNext = await this.fetchSearchResults({ index: this.state.lastIndex + 25 });
        const updatedData = {
          ...fetchedDataNext,
          data: [...data, ...fetchedDataNext.data],
        };
        updatedData.data = [...((
          new Map(updatedData.data.map(o => [o.id, o]))).values())];
        this.setState({
          fetchedData: updatedData,
          loading: false,
          lastIndex: this.state.lastIndex + 25,
        });
      }
    }
  };

  orderByCol = async (colKey, orderKey) => {
    try {
      this.setState({ loading: true });
      const fetchedData = await this.fetchSearchResults({ orderKey });
      this.setState({
        fetchedData,
        loading: false,
        currentOrder: { colKey, orderKey },
        lastIndex: 0,
      });
    } catch (e) {
      console.error(e);
      this.setState({ error: 'Sorry... we couldn\'t load any tracks', loading: false });
    }
  };

  props: {
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
        return (<DefaultGrid
          currentOrderCol={this.state.currentOrder}
          tracks={tracks}
        />);
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
  searchTrack: searchValue => dispatch(searchTrack({ searchValue })),
});

export default connect(mapStateToProps, mapDispatchToProps())(TracksDataGrid);
