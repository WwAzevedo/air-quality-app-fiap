import React from 'react';

import {
  Container
} from './styles';

import Header from '../../components/header';

const TemplateBase = ({ header, title, children, leftAction, rightAction, backButton, rightIcon }) => (
  <Container>
    {header &&
      <Header
        backButton={backButton}
        title={title}
        leftAction={leftAction}
        rightAction={rightAction}
        rightIcon={rightIcon} />
    }
    {children}
  </Container>
);

export default TemplateBase;
