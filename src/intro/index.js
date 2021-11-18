import React, { useEffect } from 'react';

import TemplateBase from '../shared/templates/base';

import {
  Container
} from './styles';

import Label from '../shared/components/label';

const Intro = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  }, [])

  return (
    <TemplateBase>
      <Container>
        <Label variant="header" color="#FFF">
          AirFresh
        </Label>
        <Label color="#FFF">
          Quality Air Informations
        </Label>
      </Container>
    </TemplateBase>
  )
};

export default Intro;
