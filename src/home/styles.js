import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Moreinfo = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 16px;
  margin: 0 16px;
  height: calc(50vh - 60px);
  background-color: #30B9C4;
`;

export const ContainerInfo = styled.View`
  width: 100vw;
  height: 50px;
  flex-direction: row;
  display: flex;
`;

export const Info = styled.View`
  background-color: white;
  width: 50px;
  height: 70px;
  margin: 16px;
  flex: 1;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;