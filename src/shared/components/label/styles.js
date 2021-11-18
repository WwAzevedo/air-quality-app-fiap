import styled, { css } from 'styled-components/native';

const getSize = (variant) => {
  switch (variant) {
    case 'header':
      return 'font-size: 54px'
    case 'title':
      return 'font-size: 40px'
    case 'subtitle':
      return 'font-size: 32px'
    case 'paragraph':
      return 'font-size: 24px'
    case 'description':
      return 'font-size: 16px'
    default:
      return 'font-size: 14px'
  }
}

export const UiLabel = styled.Text`
  ${props => getSize(props.variant)}
  ${props => props.strong && css`
    font-weight: 500;
  `}
  ${props => props.extraStrong && css`
    font-weight: 900;
  `}
  ${props => `color: ${props.color}`}
`;