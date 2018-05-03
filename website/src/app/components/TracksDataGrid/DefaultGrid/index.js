import React, { PureComponent } from 'react';
import moment from 'moment';
import DataGrid from '../../DataGrid/index';

// blocks
import CoverImageCol from './CoverImageCol';
import DefaultCol from './DefaultCol';
import DurationCol from './DurationCol';

class DefaultGrid extends PureComponent {
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

  constructor(props) {
    super(props);
    this.renderCols = {
      cover: track => (
        <span>{track.album && <CoverImageCol src={track.album.cover_small} />}</span>
      ),
      title: track => (<DefaultCol>{track.title}</DefaultCol>),
      artist: track => (
        <DefaultCol onClick={e => this.artistOnClick(e, track)}>
          {track.artist && track.artist.name}
        </DefaultCol>),
      album: track => (
        <DefaultCol onClick={e => this.albumOnClick(e, track)}>
          {track.album && track.album.title}
        </DefaultCol>),
      duration: (track) => {
        const trackDuration = moment(moment.duration(track.duration, 'seconds')._data);
        return (<DurationCol>{trackDuration.format('mm:ss')}</DurationCol>);
      },
    };
  }

  onClickHeaderCol = async (header) => {
    // dispatch redux
  };

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

  props: {
    tracks: [],
    currentOrder: string,
  };

  render() {
    return (
      <DataGrid
        resizable
        headerCols={DefaultGrid.headerCols}
        currentOrderCol={this.props.currentOrder} // props redux
        onClickHeaderCol={this.onClickHeaderCol} // dispatch redux
        data={this.props.tracks}
        keyExtractor={this.trackKeyExtractor}
        onRowClick={this.goToTrackLink}
        renderCols={this.renderCols}
      />
    );
  }
}

export default DefaultGrid;
