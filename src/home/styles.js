import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  width: 100%;
  height: 50%;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

export const Moreinfo = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 16px;
  margin: 0 16px;
  height: 50%;
  flex: 1;
  background-color: #30B9C4;
`;

export const ContainerInfo = styled.View`
  width: 100%;
  height: 50px;
  padding: 16px;
  display: flex;
`;

export const Info = styled.View`
  background-color: white;
  height: 70px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  margin-bottom: 8px;
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px;
`;