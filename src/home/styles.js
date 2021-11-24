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
  display: grid;
  grid-template-areas:
    "temp um"
    "pol pol";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 8px;
  
`;

export const Info = styled.View`
  background-color: white;
  height: auto;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  box-shadow: #ccc 1px 2px 8px;
`;