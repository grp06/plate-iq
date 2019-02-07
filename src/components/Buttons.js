import styled from 'styled-components';
import {
  lightGrey,
  darkGreyBorder,
  buttonGreyBackground,
  lightBlueButton
} from './../variables/colors';
import urlOrNone from './../helpers/urlOrNone';

const DirectEmail = styled.button`
  display: flex;
  height: 25px;
  background: white;
  cursor: pointer;
  border: 1px solid ${lightGrey};
  color: ${lightGrey};
  display: flex;
  border-radius: 15px;
  width: 70px;
  align-items: center;
  justify-content: space-around;
  img {
    height: 10px;
  }
  span {
    font-size: 10px;
    padding-left: 5px;
    text-transform: uppercase;
    font-weight: bold;
  }
`;
const More = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  justify-content: space-around;
  border: 1px solid ${darkGreyBorder};
  border-radius: 3px;
  background: ${buttonGreyBackground};
  height: 35px;
  width: 80px;
  font-size: 11px;
  img {
    height: 10px;
  }
`;
const Approve = styled.button`
  background: ${lightBlueButton};
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  border: none;
  height: 35px;
  width: 140px;
  text-align: center;
  font-size: 11px;
  margin-left: 15px;
`;

const Expand = styled.button`
  border: 1px solid ${darkGreyBorder};
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;
  background-image: ${urlOrNone};
  background-repeat: no-repeat;
  background-position: 50% 32%;
  height: 20px;
  width: 20px;
  outline: none;
  background-size: 60%;
  transform: ${({ collapsed }) => (collapsed ? 'rotate(180deg)' : 'rotate(0)')};
  margin: 0 15px;
`;

export { DirectEmail, More, Approve, Expand };

export default {};
