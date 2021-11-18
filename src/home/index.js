import React from 'react';

import {
  Container,
  Moreinfo,
  Info,
  ContainerInfo
} from './styles';

import {
  Text
} from 'react-native';

import Label from '../shared/components/label';

import { useGeoLocation } from './api/geo-localization';
import { getAirCondition } from './api/air-condition';

import TemplateBase from '../shared/templates/base';

const infoImg = require("../../assets/info.svg");

const Home = ({ navigation }) => {
  const { city, locality } = useGeoLocation();

  const {
    air_quality_number,
    category,
    health_recommendations,
    pollutants,
    pollutants_full_name
  } = getAirCondition();

  return (
    <TemplateBase
      header
      title="Home"
      rightAction={() => navigation.navigate('About')}
      rightIcon={infoImg}>

      <Container>

        <Label variant="paragraph" strong color="#30B9C4">
          {city}, {locality}
        </Label>

        <Label variant="header" extraStrong color="#30B9C4">
          {air_quality_number}
        </Label>

        <Label variant="title" strong color="#30B9C4">
          {category}
        </Label>

        <ContainerInfo>
          <Info>
            <Label variant="paragraph" strong color="#30B9C4">
              27 C
            </Label>
          </Info>
          <Info>
            <Label variant="paragraph" strong color="#30B9C4">
              27 Hu
            </Label>
          </Info>
        </ContainerInfo>

      </Container>

      <Moreinfo>
        <Label strong color="#FFF">
          Outras informações
        </Label><br />
        <Label strong color="#FFF">
          Recomendação: {health_recommendations}
        </Label>
        <Label strong color="#FFF">
          Principal Poluente: {pollutants} ({pollutants_full_name})
        </Label>
      </Moreinfo>

    </TemplateBase>

  );
}

export default Home;