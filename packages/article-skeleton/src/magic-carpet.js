import React from 'react';
import styled from 'styled-components'

const SlideUpWrapper = styled.div`
  position: fixed;
  bottom: ${(props) => (props.showComponent ? '0' : '-100%')}; /* Change based on isVisible prop */
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  z-index: 1000;
  transition: bottom 1s ease-in-out; /* Smooth transition */
`;

export const MagicCarpet = ({ showComponent }) => {
  return <SlideUpWrapper showComponent={showComponent}>Magic Carpet</SlideUpWrapper>;
}