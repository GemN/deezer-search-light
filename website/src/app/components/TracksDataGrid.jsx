import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import DataGrid from './DataGrid/DataGrid';
import CardGrid from './CardGrid/CardGrid';

const CoverImg = styled.img`
  margin: 0 8px;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  object-fit: cover;
`;

const Duration = styled.span`
  color: #92929d;
  margin-right: 8px;
`;

const BasicCol = styled.div`
  transition: color 0.15s ease-out;
  &:hover {
    color: #007feb;
  }
`;

const Error = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 200;
`;

const TracksDataGridContainer = styled.div`

`;

const InfosContainer = styled.div`

`;

const TryThis = styled.div`
  color: #afafaf;
  letter-spacing: 0.25px;
  font-weight: 100;
  font-size: 15px;
`;

const InfosContainerTitle = styled.h1`
  font-size: 28px;
  letter-spacing: 0.25px;
  font-weight: 400;
`;

const FilterBar = styled.div`
  margin: 4px 0;
`;

const FilterButton = styled.div`
  display: inline-block;
  padding-bottom: 16px;
  font-size: 16px;
  margin-right: 32px;
  letter-spacing: 0.5px;
  transition: color 0.15s ease-out;
  cursor: pointer;
  color: #92929d;
  border-bottom: 2px solid transparent;
  &:hover {
    color: #23232d;
    border-bottom: 2px solid #92929d;
  }
  ${props => (props.active ? `
    color: #23232d;
    border-bottom: 2px solid #007feb;
  ` : '')}
`;

class TracksDataGrid extends PureComponent {
  static headerCols = [
    {
      label: '',
      key: 'cover',
      style: { width: '5%' },
    },
    {
      label: 'Title',
      key: 'title',
      ascKey: 'TRACK_ASC',
      descKey: 'TRACK_DESC',
      style: { width: '35%' },
    },
    {
      label: 'Artist',
      key: 'artist',
      ascKey: 'ARTIST_ASC',
      descKey: 'ARTIST_DESC',
      style: { width: '25%' },
    },
    {
      label: 'Album',
      key: 'album',
      ascKey: 'ALBUM_ASC',
      descKey: 'ALBUM_DESC',
      style: { width: '25%' },
    },
    {
      label: 'D',
      key: 'duration',
      ascKey: 'DURATION_ASC',
      descKey: 'DURATION_DESC',
      style: { width: '5%' },
    },
  ];

  static filters = [
    { key: 'all', label: 'All' },
    { key: 'artist', label: 'Artists' },
    { key: 'album', label: 'Albums' },
  ];

  constructor(props) {
    super(props);

    this.state = {
      fetchedData: {},
      lastIndex: 0,
      trackFilter: 'all',
      loading: false,
      currentOrder: null,
      error: null,
    };
    this.renderCols = {
      cover: track => (
        <span>{track.album && <CoverImg src={track.album.cover_small} />}</span>
      ),
      title: track => (<BasicCol>{track.title}</BasicCol>),
      artist: track => (
        <BasicCol onClick={e => this.artistOnClick(e, track)}>
          {track.artist && track.artist.name}
        </BasicCol>),
      album: track => (
        <BasicCol onClick={e => this.albumOnClick(e, track)}>
          {track.album && track.album.title}
        </BasicCol>),
      duration: (track) => {
        const trackDuration = moment(moment.duration(track.duration, 'seconds')._data);
        return (<Duration>{trackDuration.format('mm:ss')}</Duration>);
      },
    };
  }

  async componentWillMount() {
    const searchValue = this.props.searchValue.trim();
    if (searchValue) {
      await this.searchData(searchValue);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps = async (nextProps) => {
    const searchValue = nextProps.searchValue.trim();
    if (searchValue && (this.props.searchValue.trim() !== searchValue)) {
      await this.searchData(searchValue);
    }
  };

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

  onClickHeaderCol = async (header) => {
    const { currentOrder } = this.state;
    let orderKey = null;
    if (currentOrder && (currentOrder.colKey === header.key)) {
      switch (currentOrder.orderKey) {
        case header.ascKey:
          orderKey = header.descKey;
          break;
        case header.descKey:
          orderKey = null;
          break;
        default:
          orderKey = header.ascKey;
          break;
      }
    } else {
      orderKey = header.ascKey;
    }
    await this.orderByCol(header.key, orderKey);
  };

  searchData = async (searchValue) => {
    try {
      this.setState({ loading: true, error: false });
      const fetchedData = await this.fetchSearchResults({ searchValue });
      this.setState({ fetchedData, loading: false, lastIndex: 0 });
    } catch (e) {
      console.error(e);
      this.setState({ error: 'Sorry... we couldn\'t load any tracks', loading: false });
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

  fetchSearchResults = async (searchOptionsParams) => {
    const searchOpts = {
      searchValue: searchOptionsParams.searchValue || this.props.searchValue,
      index: searchOptionsParams.index || 0,
      limit: searchOptionsParams.limit || 25,
    };
    let queryUrl = `/api/search/track?q=${searchOpts.searchValue}&index=${searchOpts.index}&limit=${searchOpts.limit}`;
    if (searchOptionsParams.orderKey) {
      queryUrl += `&order=${searchOptionsParams.orderKey}`;
    } else if (searchOptionsParams.orderKey !== null && this.state.currentOrder) {
      queryUrl += `&order=${this.state.currentOrder.orderKey}`;
    }

    try {
      const results = await axios.get(queryUrl);
      return results.data;
    } catch (err) {
      return [];
    }
  };

  removeDuplicateArtists = data => [...((new Map(data.map(o => [o.artist.id, o]))).values())];

  removeDuplicateAlbums = data => [...((new Map(data.map(o => [o.album.id, o]))).values())];

  goToTrackLink = (track) => {
    const winRef = window.open();
    winRef.location = track.link;
  };

  artistOnClick = (e, track) => {
    e.stopPropagation();
    if (track && track.artist) {
      const winRef = window.open();
      winRef.location = track.artist.link;
    }
  };

  albumOnClick = (e, track) => {
    e.stopPropagation();
    if (track && track.album) {
      const winRef = window.open();
      winRef.location = `https://www.deezer.com/fr/album/${track.album.id}`;
    }
  };

  trackKeyExtractor = track => track.id;

  artistImageExtractor = track => track.artist && track.artist.picture_medium;

  artistTitleExtractor = track => track.artist && track.artist.name;

  albumImageExtractor = track => track.album && track.album.cover_medium;

  albumTitleExtractor = track => track.album && track.artist.name;

  filterBy = trackFilter => this.setState({ trackFilter });

  props: {
    searchValue: string,
  };

  renderFilterBar = () => (
    <FilterBar>
      {
        TracksDataGrid.filters.map((f) => {
          const active = f.key === this.state.trackFilter;
          return (
            <FilterButton active={active} onClick={() => this.filterBy(f.key)} key={f.key}>
              {f.label}
            </FilterButton>
          );
        })
      }
    </FilterBar>
  );

  render() {
    const { data } = this.state.fetchedData;
    const { searchValue } = this.props;
    const { trackFilter } = this.state;
    if (this.state.error) {
      return <Error>{this.state.error}</Error>;
    }

    return (
      <TracksDataGridContainer>
        <InfosContainer>
          <InfosContainerTitle>
            {
              (data && data.length) || this.state.loading ?
              `Search results for « ${searchValue} »`
              : `No results for « ${searchValue} »`
            }
          </InfosContainerTitle>
          {
            (!data || data.length === 0) && !this.state.loading ?
              <TryThis>Pssst..! Try this « Can't Stop (Dub Mix) - Hanson & Davis »</TryThis>
              : this.renderFilterBar()
          }
        </InfosContainer>
        {
          trackFilter === 'all' && (data && data.length) ?
            <DataGrid
              resizable
              headerCols={TracksDataGrid.headerCols}
              currentOrderCol={this.state.currentOrder}
              onClickHeaderCol={this.onClickHeaderCol}
              data={data}
              keyExtractor={this.trackKeyExtractor}
              onRowClick={this.goToTrackLink}
              renderCols={this.renderCols}
            /> : ''
        }
        {
          trackFilter === 'artist' && (data && data.length) ?
            <CardGrid
              data={this.removeDuplicateArtists(data)}
              rounded
              keyExtractor={this.trackKeyExtractor}
              imageExtractor={this.artistImageExtractor}
              titleExtractor={this.artistTitleExtractor}
              onClick={this.artistOnClick}
            /> : ''
        }
        {
          trackFilter === 'album' && (data && data.length) ?
            <CardGrid
              data={this.removeDuplicateAlbums(data)}
              keyExtractor={this.trackKeyExtractor}
              imageExtractor={this.albumImageExtractor}
              titleExtractor={this.albumTitleExtractor}
              onClick={this.albumOnClick}
            /> : ''
        }
      </TracksDataGridContainer>
    );
  }
}

export default TracksDataGrid;
