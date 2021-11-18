import React from 'react';

import {
  Text,
  Image
} from 'react-native';

import {
  Container,
  Icon,
  Title
} from './styles';

const backImg = require("../../../../assets/back.svg");

const Header = ({ title, leftAction, rightAction, backButton, rightIcon }) => (
  <Container>

    {
      backButton &&
      <Image
        onClick={leftAction}
        style={{ width: 10, height: 10 }}
        source={backImg} />
    }

    <Title>
      {title}
    </Title>

    {
      rightIcon &&
      <Image
        onClick={rightAction}
        style={{ width: 20, height: 20 }}
        source={rightIcon} />
    }

  </Container>
);

export default Header;
