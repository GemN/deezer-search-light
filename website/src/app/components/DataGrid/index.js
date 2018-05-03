import React, { Component } from 'react';

// blocks
import Header from './Header';
import Container from './Container';
import Body from './Body/Content';
import BodyRow from './Body/Row';
import BodyCol from './Body/Col';

class DataGrid extends Component {
  static defaultProps = {
    renderCols: {},
    keyExtractor: item => item.id,
  };

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      return true;
    }
    return false;
  }

  props: {
    headerCols: [],
    onClickHeaderCol: Function,
    data: {},
    onRowClick: Function,
    keyExtractor: Function,
    renderCols: {},
    currentOrderCol: {},
    resizable: boolean,
  };

  renderRow = item => (
    <BodyRow onClick={() => this.props.onRowClick(item)} key={this.props.keyExtractor(item)}>
      {
          this.props.headerCols.map((header) => {
            const customColRender = this.props.renderCols[header.key];
            return (
              <BodyCol key={header.key}>
                {customColRender ? customColRender(item) : item[header.key]}
              </BodyCol>
            );
          })
        }

    </BodyRow>
  );

  render() {
    const { data } = this.props;
    return (
      <Container>
        <Header
          resizable={this.props.resizable}
          currentOrderCol={this.props.currentOrderCol}
          headerCols={this.props.headerCols}
          onClickHeaderCol={this.props.onClickHeaderCol}
        />
        <Body>
          {data && data.map(item => this.renderRow(item))}
        </Body>
      </Container>
    );
  }
}

DataGrid.Header = Header;
DataGrid.Body = Body;
DataGrid.BodyRow = BodyRow;
DataGrid.BodyCol = BodyCol;

export default DataGrid;
