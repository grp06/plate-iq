import React, { Component } from 'react';
import styled from 'styled-components';
import './App.scss';

import { DirectEmail, More, Approve, Expand } from '@/components';
import urlOrNone from './helpers/urlOrNone';
import tableData from './mocks/tableData';
import vendorApiResponse from './mocks/vendorApiResponse';
import fakeReport from './images/fake-report.png';
import caretDown from './images/caret-down.svg';
import caret2 from './images/caret2.svg';
import speechBubble from './images/speech-bubble.svg';
import mail from './images/mail.svg';
import {
  darkGreyBorder,
  darkBlueBackground,
  lightBlueButton,
  tableBackground
} from './variables/colors';

const Document = styled.div`
  background-image: ${urlOrNone};
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  background-size: cover;
`;

const LeftSide = styled.section`
  background: ${darkBlueBackground};
  height: 100vh;
  width: 50vw;
  padding: 30px;
  overflow: hidden;
`;

const RightSide = styled.section`
  height: 100vh;
  width: 50vw;
  overflow: auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 0;
`;

const Right = styled.div`
  display: flex;
`;

const ExpandableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;

  h2 {
    margin: 15px 0;
  }
`;

const Collapsed = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 30px;

  span {
    font-weight: 600;
    font-size: 14px;

    :nth-child(5) {
      border-bottom: 1px solid ${darkGreyBorder};
      width: 25%;
    }
  }
`;

const CollapsedTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-self: flex-end;
  width: 200px;
  margin-left: auto;
  margin-top: 15px;
  align-items: center;
  span {
    &:first-child {
      color: #ccc;
      font-size: 12px;
    }
    :nth-child(2) {
      font-size: 14px;
    }
  }
`;

const Expanded = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 30px;

  > span {
    font-size: 12px;
    color: rgba(31, 197, 162, 1);
    font-weight: bold;
    width: 100%;
  }
`;

const InvoiceCell = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  align-items: ${({ row }) => (row ? 'center' : 'flex-start')};
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 23%;
  border-top: 1px solid ${darkGreyBorder};
  margin-top: 15px;
`;

const CellTitle = styled.span`
  color: ${darkGreyBorder};
  font-size: 10px;
  padding-top: 10px;
  text-transform: uppercase;
  width: ${({ row }) => (row ? '50%' : 'auto')};
`;

const CellData = styled.span`
  font-size: 14px;
  padding-top: 10px;
`;

const MemoWrapper = styled.div`
  width: 50%;
  margin-top: 15px;
  border-top: 1px solid ${darkGreyBorder};
  padding-top: 15px;
  img {
    height: 10px;
  }
  input {
    border: none;
    margin-left: 10px;
    outline: none;
    padding-bottom: 5px;
    font-size: 12px;
    width: calc(100% - 20px);
    &:focus {
      border-bottom: 1px solid ${darkGreyBorder};
    }
  }
`;

const PurchasesTable = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const TableSelection = styled.div`
  display: flex;
  padding: 15px 30px 0;
  margin-top: ${({ collapsed }) => (!collapsed ? 0 : '-40px')};
`;

const LineItemsHeader = styled.span`
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? 'black' : darkGreyBorder)};
  margin: 10px 0 0 0;
  height: 25px;
  padding-bottom: 15px;
  border-bottom: ${({ active }) =>
    active ? `2px solid ${lightBlueButton}` : 'none'};
`;

const HistoryHeader = styled.span`
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? 'black' : darkGreyBorder)};
  margin: 10px 0 0 15px;
  height: 25px;
  padding-bottom: 15px;
  border-bottom: ${({ active }) =>
    active ? `2px solid ${lightBlueButton}` : 'none'};
`;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  background: ${tableBackground};
  padding: 35px 30px 15px;

  > span {
    font-weight: bold;
    font-size: 12px;
  }
  .name {
    width: 60%;
  }
  .quantity {
    width: 10%;
    text-align: center;
  }
  .unitPrice {
    width: 20%;
    text-align: center;
  }
  .total {
    width: 20%;
    text-align: right;
  }
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-top: 1px solid ${darkGreyBorder};
  background: ${tableBackground};
  padding: 15px 30px;
  font-size: 12px;
  align-items: center;
  > span {
    font-weight: bold;
  }
  .name {
    width: 60%;
    display: flex;
    flex-direction: column;
    span {
      padding: 3px 0;
      &:nth-child(2) {
        font-size: 10px;
      }
    }
  }
  .quantity {
    width: 10%;
    text-align: center;
  }
  .unitPrice {
    width: 20%;
    text-align: center;
  }
  .total {
    width: 20%;
    text-align: right;
  }
`;

const HistoryTable = styled.section`
  padding: 15px 30px;
`;

class App extends Component {
  state = {
    collapsed: true,
    activeTab: 'Line Items'
  };

  renderCompanyDetails = () => {
    if (this.state.collapsed) {
      return (
        <Collapsed>
          <span>00003526</span>
          <span>July 9, 2017</span>
          <span>Monty's Cheese Shop</span>
          <span>Lorem Ipsum...</span>
          <span />
          <CollapsedTotal>
            <span>Total</span>
            <span>$10,000</span>
          </CollapsedTotal>
        </Collapsed>
      );
    }
    const responseKeys = Object.keys(vendorApiResponse);
    return (
      <Expanded>
        <span>This vendor is mapped</span>
        {responseKeys.map((item, idx) => {
          if (idx === 3) {
            return (
              <InvoiceCell row>
                <CellTitle row>SubTotal</CellTitle>
                <CellData>{vendorApiResponse['price']['Sub Total']}</CellData>
                <CellTitle row>Tax</CellTitle>
                <CellData>{vendorApiResponse['price'].Tax}</CellData>
              </InvoiceCell>
            );
          }

          return (
            <InvoiceCell row={idx === 7}>
              <CellTitle row={idx === 7}>{responseKeys[idx]}</CellTitle>
              <CellData>{vendorApiResponse[item]}</CellData>
            </InvoiceCell>
          );
        })}
        <MemoWrapper>
          <img src={speechBubble} alt="speech bubble" />
          <input
            type="text"
            value={this.state.memo}
            onChange={this.updateMemo}
            placeholder="Click to Enter memo"
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Click to Enter memo')}
          />
        </MemoWrapper>
      </Expanded>
    );
  };

  toggleCompanyDetails = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  setActiveTab = tab => {
    this.setState({
      activeTab: tab
    });
  };

  renderTable = () => {
    const { activeTab, collapsed } = this.state;
    if (activeTab === 'Line Items') {
      return (
        <PurchasesTable>
          <TableHeader>
            <span className="name">Name</span>
            <span className="quantity">Qty</span>
            <span className="unitPrice">Unit Price</span>
            <span className="total">Total</span>
          </TableHeader>
          {tableData.map(foodItem => {
            const { name, subName, quantity, unitPrice, total, id } = foodItem;
            return (
              <TableRow key={id}>
                <div className="name">
                  <span>{name}</span>
                  <span>{subName}</span>
                </div>
                <div className="quantity">{quantity}</div>
                <div className="unitPrice">{unitPrice}</div>
                <div className="total">{total}</div>
              </TableRow>
            );
          })}
        </PurchasesTable>
      );
    }
    return <HistoryTable>History table content</HistoryTable>;
  };

  render() {
    const { collapsed, activeTab } = this.state;
    return (
      <div className="app">
        <LeftSide>
          <Document url={fakeReport} />
        </LeftSide>
        <RightSide>
          <TopBar>
            <DirectEmail>
              <img alt="direct mail button" src={mail} />
              <span>Direct</span>
            </DirectEmail>
            <Right>
              <More>
                <span>More</span>
                <img alt="more " src={caretDown} />
              </More>
              <Approve>Approve</Approve>
            </Right>
          </TopBar>

          <ExpandableHeader>
            <h2>Freguesia Cheese</h2>
            <Expand
              collapsed={collapsed}
              url={caret2}
              onClick={this.toggleCompanyDetails}
            />
          </ExpandableHeader>
          {this.renderCompanyDetails()}
          <TableSelection collapsed={collapsed}>
            <LineItemsHeader
              onClick={() => this.setActiveTab('Line Items')}
              active={activeTab === 'Line Items'}
            >
              Line Items
            </LineItemsHeader>
            <HistoryHeader
              onClick={() => this.setActiveTab('History')}
              active={activeTab === 'History'}
            >
              History
            </HistoryHeader>
          </TableSelection>
          {this.renderTable()}
        </RightSide>
      </div>
    );
  }
}

export default App;
