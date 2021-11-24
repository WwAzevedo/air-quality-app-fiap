import React, { useEffect } from 'react';

import TemplateBase from '../shared/templates/base';
import {
  Image
} from 'react-native';

import {
  Container
} from './styles';

const logoImg = require("../../assets/logo.png");


const Intro = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, [])

  return (
    <TemplateBase>
      <Container>

      <Image
        style={{ width: 202, height: 140 }}
        source={logoImg} />
       
      </Container>
    </TemplateBase>
  )
};

export default Intro;
