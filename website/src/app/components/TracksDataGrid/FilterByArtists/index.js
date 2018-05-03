import React, { PureComponent } from 'react';
import CardGrid from '../../CardGrid/index';

class FilterByArtists extends PureComponent {
  removeDuplicateArtists = data => [...((new Map(data.map(o => [o.artist.id, o]))).values())];

  artistOnClick = (e, track) => {
    e.stopPropagation();
    if (track && track.artist) {
      const winRef = window.open();
      winRef.location = track.artist.link;
    }
  };

  trackKeyExtractor = track => track.id;

  artistImageExtractor = track => track.artist && track.artist.picture_medium;

  artistTitleExtractor = track => track.artist && track.artist.name;

  props: {
    tracks: [],
  };

  render = () => (
    <CardGrid
      data={this.removeDuplicateArtists(this.props.tracks)}
      rounded
      keyExtractor={this.trackKeyExtractor}
      imageExtractor={this.artistImageExtractor}
      titleExtractor={this.artistTitleExtractor}
      onClick={this.artistOnClick}
    />
  );
}

export default FilterByArtists;
