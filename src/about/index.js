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
    name: "João Ricardi",
    rm: "85061"
  },
];

const About = ({ navigation }) => (
  <TemplateBase
    header
    backButton
    title="Sobre o Air Fresh"
    leftAction={() => navigation.navigate('Home')}>

    <Container>

      <Label variant="description" color="#30B9C4" strong>
        AirFresh App, aplicativo para descobrir como está a qualidade do ar, temperatura e umidade da sua localização.
      </Label>

      <br />

      <Label variant="description" color="#30B9C4" strong>
        Equipe: {"\n \n"}
      </Label>
      {
        team.map(({ name, rm }) => (
          <Label key={name} variant="description" color="#30B9C4" strong>
            {name} - RM: {rm}
          </Label>
        ))
      }
    </Container>

  </TemplateBase>
);

export default About;
