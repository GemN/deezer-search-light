import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const DataGridHeaderContainer = styled.thead`
`;

const DataGridHeaderRow = styled.tr`
  height: 52px;
  cursor: pointer;
`;

const DataGridHeaderCol = styled.th`
  position: relative;
  border-top: 1px solid #efeff2;
  color: #92929d;
  letter-spacing: 1px;
  line-height: 20px;
  font-weight: 300;
  font-size: 12px;
  white-space: nowrap;
  text-transform: uppercase;
  text-align: left;
  margin: 0;
`;

const IconContainer = styled.span`
  margin: 0 4px;
`;

const Resize = styled.div`
  position: absolute;
  top: calc(50% - 6.5px);
  right: 0;
  display: inline-block;
  margin-left: 4px;
  cursor: col-resize;
  color: black;
`;

const Label = styled.span`
  transition: color 0.15s ease-out;
  &:hover {
    color: #007feb;
  }
`;

const styles = {
  iconStyle: { color: '#afafaf', fontSize: 10 },
};

class DataGridHeader extends Component {
  constructor(props) {
    super(props);
    this.colsRef = {};
    this.state = {
      refCol: null,
    };
  }

  componentWillMount() {
    window.addEventListener('mousemove', this.onMouseMoveResize);
    window.addEventListener('mouseup', this.onMouseUpResize);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.headerCols !== this.props.headerCols) {
      return true;
    }
    if (nextProps.currentOrderCol !== this.props.currentOrderCol) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMoveResize);
    window.removeEventListener('mouseup', this.onMouseUpResize);
  }

  onMouseDownResize = (e, h) => {
    this.setState({
      refCol: {
        ref: this.colsRef[h.key],
        offset: this.colsRef[h.key].offsetWidth - e.pageX,
      },
    });
  };

  onMouseMoveResize = (e) => {
    if (this.state.refCol) {
      this.state.refCol.ref.style.width = this.state.refCol.offset + e.pageX;
    }
  };

  onMouseUpResize = () => {
    if (this.state.refCol) {
      this.setState({ refCol: null });
    }
  };

  props: {
    onClickHeaderCol: Function,
    resizable: boolean,
    headerCols: [{
      style: {},
      key: string,
      label: string,
      ascKey: string,
      descKey: string,
    }],
    currentOrderCol: {
      colKey: string,
      orderKey: string,
    }
  };

  renderOrderIcon = (currentOrderCol, h) => (
    <IconContainer>
      <FontAwesome name={currentOrderCol.orderKey === h.ascKey ? 'angle-up' : 'angle-down'} />
    </IconContainer>
  );

  render() {
    const { currentOrderCol } = this.props;
    return (
      <DataGridHeaderContainer>
        <DataGridHeaderRow>
          {
            this.props.headerCols.map(h => (
              <DataGridHeaderCol
                style={h.style}
                key={h.key}
                innerRef={(ref) => { this.colsRef[h.key] = ref; }}
              >
                <Label
                  onClick={() => this.props.onClickHeaderCol(h)}
                >
                  {h.label}
                </Label>
                {
                  currentOrderCol
                  && currentOrderCol.orderKey
                  && currentOrderCol.colKey === h.key
                  && this.renderOrderIcon(currentOrderCol, h)
                }
                {
                  this.props.resizable &&
                  <Resize
                    onMouseDown={e => this.onMouseDownResize(e, h)}
                  >
                    <FontAwesome style={styles.iconStyle} name="arrows" />
                  </Resize>
                }
              </DataGridHeaderCol>
            ))
          }
        </DataGridHeaderRow>
      </DataGridHeaderContainer>
    );
  }
}

export default DataGridHeader;
