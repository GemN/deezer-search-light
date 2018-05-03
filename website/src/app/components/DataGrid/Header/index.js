import React, { Component } from 'react';

// blocks
import Container from './Container';
import HeaderCol from './Col';
import HeaderRow from './Row';
import Label from './Label';
import ResizeIcon from './ResizeIcon';
import OrderIcon from './OrderIcon';

class DataGridHeader extends Component {
  constructor(props) {
    super(props);
    this.colsRef = {};
    this.refCol = null;
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
    this.refCol = {
      ref: this.colsRef[h.key],
      offset: this.colsRef[h.key].offsetWidth - e.pageX,
    };
  };

  onMouseMoveResize = (e) => {
    if (this.refCol) {
      this.refCol.ref.style.width = this.refCol.offset + e.pageX;
    }
  };

  onMouseUpResize = () => {
    if (this.refCol) {
      this.refCol = null;
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
    },
  };

  renderHeaderCol = (h, currentOrderCol) => (
    <HeaderCol
      style={h.style}
      key={h.key}
      innerRef={(ref) => { this.colsRef[h.key] = ref; }}
    >
      <Label onClick={() => this.props.onClickHeaderCol(h)} >{h.label}</Label>
      {
        currentOrderCol
        && currentOrderCol.orderKey
        && currentOrderCol.colKey === h.key
        && <OrderIcon orderKey={currentOrderCol.orderKey} colAscKey={h.ascKey} />
      }
      {this.props.resizable &&
        <span onMouseDown={e => this.onMouseDownResize(e, h)}>
          <ResizeIcon />
        </span>
      }
    </HeaderCol>
  );

  render() {
    const { currentOrderCol } = this.props;
    return (
      <Container>
        <HeaderRow>
          {this.props.headerCols.map(h => this.renderHeaderCol(h, currentOrderCol))}
        </HeaderRow>
      </Container>
    );
  }
}

DataGridHeader.Head = Container;
DataGridHeader.Col = HeaderCol;
DataGridHeader.Row = HeaderRow;
DataGridHeader.Label = Label;

export default DataGridHeader;
