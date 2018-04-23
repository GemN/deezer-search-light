import React, { Component } from 'react';
import styled from 'styled-components';
import DataGridHeader from './DataGridHeader';

const DataGridContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const DataGridContent = styled.tbody`

`;

const DataGridRow = styled.tr`
  color: #32323d;
  height: 52px;
  cursor: pointer;
  border-top: 1px solid #EFEFF2;
  transition: 0.15s;
  &:hover {
    background-color: #EFEFF2;
  }
`;

const DataGridCol = styled.td`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding-right: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
    <DataGridRow onClick={() => this.props.onRowClick(item)} key={this.props.keyExtractor(item)}>
      {
          this.props.headerCols.map((header) => {
            const customColRender = this.props.renderCols[header.key];
            return (
              <DataGridCol key={header.key}>
                {customColRender ? customColRender(item) : item[header.key]}
              </DataGridCol>
            );
          })
        }

    </DataGridRow>
  );

  render() {
    const { data } = this.props;
    return (
      <DataGridContainer>
        <DataGridHeader
          resizable={this.props.resizable}
          currentOrderCol={this.props.currentOrderCol}
          headerCols={this.props.headerCols}
          onClickHeaderCol={this.props.onClickHeaderCol}
        />
        <DataGridContent>
          {data && data.map(item => this.renderRow(item))}
        </DataGridContent>
      </DataGridContainer>
    );
  }
}

export default DataGrid;
