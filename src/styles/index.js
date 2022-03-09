import { Input, Space } from 'antd';
import styled from 'styled-components';

export const Body = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 32px 15%;
  width: 100%;'
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  background-color: #1A90FF;
  height: 64px;
  left: 0;
  justify-content: space-between;
  padding: 12px 48px;
  position: fixed;
  right: 0;
  top: 0;

  h1, h2, h3, h4 {
    margin: 0 !important;
  }
`;

export const LoadMoreContainer = styled.div`
	text-align: center;
`;

export const Viewport = styled.div`
  bottom: 0;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 64px;
`;

export const Spacer = styled.div`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px; 
`;

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;

export const FullWidthInput = styled(Input)`
  width: 100% !important;
`;