import React from 'react';

import TemplateBase from '../shared/templates/base';
import Label from '../shared/components/label';

import {
  Container
} from './styles';

const team = [
  {
    name: "Teiji Uekita",
    rm: "89222"
  },
  {
    name: "Wesley Wendel",
    rm: "86357"
  },
  {
    name: "Alexandre Mazarão",
    rm: "84194"
  },
  {
    name: "Danilo Caetano",
    rm: "84426"
  },
  {
    name: "João",
    rm: "?"
  },
];

const About = ({ navigation }) => (
  <TemplateBase
    header
    backButton
    title="Sobre o app"
    leftAction={() => navigation.navigate('Home')}>

    <Container>

      <Label variant="description" color="#30B9C4" strong>
        AirFresh App, aplication.
      </Label>

      <br />

      <Label variant="description" color="#30B9C4" strong>
        Equipe
      </Label>
      {
        team.map(({ name, rm }) => (
          <Label variant="description" color="#30B9C4" strong>
            {name} - RM: {rm}
          </Label>
        ))
      }
    </Container>

  </TemplateBase>
);

export default About;