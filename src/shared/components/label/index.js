import React from 'react';

import {
  UiLabel
} from './styles';

const Label = ({ children, variant, strong, color, extraStrong }) => (
  <UiLabel 
    variant={variant} 
    strong={strong} 
    color={color}
    extraStrong={extraStrong}>
    {children}
  </UiLabel>
);

export default Label;
