import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TracksDataGrid from '../../components/TracksDataGrid';
import Navbar from '../../components/Navbar/index';

// blocks
import Container from './Container';
import Placeholder from './Placeholder';
import TrackDataGridContainer from './TracksDataGridContainer';


class Home extends PureComponent {
  props: {
    searchValue: string,
  };

  renderTrackList = () => (
    <TrackDataGridContainer>
      <TracksDataGrid
        searchValue={this.props.searchValue}
      />
    </TrackDataGridContainer>
  );

  renderPlaceholder = () => (
    <Placeholder>
      {'Listen to your music, no limits.\nAnywhere, anytime.'}
    </Placeholder>
  );

  render() {
    return (
      <Container>
        <Navbar />
        {this.props.searchValue ? this.renderTrackList() : this.renderPlaceholder()}
      </Container>
    );
  }
}

const mapStateToProps = ({ searchValue }) => ({
  searchValue,
});

export default connect(mapStateToProps)(Home);
