import React, { PureComponent } from 'react';
import CardGrid from '../../CardGrid/index';

class FilterByArtists extends PureComponent {
  removeDuplicateAlbums = data => [...((new Map(data.map(o => [o.album.id, o]))).values())];

  albumOnClick = (e, track) => {
    e.stopPropagation();
    if (track && track.album) {
      const winRef = window.open();
      winRef.location = `https://www.deezer.com/fr/album/${track.album.id}`;
    }
  };

  trackKeyExtractor = track => track.id;

  albumImageExtractor = track => track.album && track.album.cover_medium;

  albumTitleExtractor = track => track.album && track.album.title;

  props: {
    tracks: [],
  };

  render = () => (
    <CardGrid
      data={this.removeDuplicateAlbums(this.props.tracks)}
      keyExtractor={this.trackKeyExtractor}
      imageExtractor={this.albumImageExtractor}
      titleExtractor={this.albumTitleExtractor}
      onClick={this.albumOnClick}
    />
  );
}

export default FilterByArtists;
