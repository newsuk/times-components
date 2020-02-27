import styled from "styled-components";
import {
    breakpoints,
    colours,
    fonts,
    fontSizes,
    spacing
  } from "@times-components/styleguide";
  import {View, Text, Platform} from 'react-native';

export const InpContainer = styled(View)`
    background-color: #F9F8F3;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-left: 10px;

   @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    margin: 0 auto;
    width: 80.8%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  } 
`
export const InpImageContainer = styled(View)`
   @media (min-width: ${breakpoints.medium}px) {
    width: 45%;
  } 
`
export const InpTextEditor = styled(View)`
justify-content: center;
    padding: 20px;
    flex: 1;
   @media (min-width: ${breakpoints.small}px) {
      padding-right: 0px;
      padding-left: 0px;
  } 
`
export const InpLabel = styled(Text)`
    font-family: 'GillSansMTStd-Medium';
    font-size: 12px;
    letter-spacing: 1px;
    color: #1d1d1b;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 3px;
    @media (min-width: ${breakpoints.medium}px) {
      margin-bottom: 6px;
  } 
`
export const InpHeadline = styled(Text)`
    color: #1d1d1b;
    font-family: 'TimesModern-Bold';
    text-align: center;
    font-size: 28px;
    text-decoration: none;
    margin-bottom: 5px;
    @media (max-width: ${breakpoints.medium}px) {
  } 
`
export const InpDetails = styled(Text)`
    font-family: 'TimesDigitalW04';
    font-size: 15px;
    text-align: center;
    color: #333333;
    margin-bottom: 16px;
    @media (max-width: ${breakpoints.medium}px) {
  } 
`
export const InpCTA = styled(Text)`
    color: #CD0000;
    font-family: 'GillSansMTStd-Medium';
    font-size: 13px;
    letter-spacing: 0.2;
    line-height: 13px;
    margin-top: 10px;

    /* &::after{
    content: "";
    font-family: iconfont;
    padding: 0 0 0 .5rem;
    font-size: .8em;
    display: inline-block;
    vertical-align: middle;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    } */
`
export const TagContainer = styled(View)`
   @media (min-width: ${breakpoints.medium}px) {
    width: 220px;
    margin: 0px auto;
  } 
`

export const Atag = styled(View)`
color: #CD0000;    
border-width: 2px;
border-style: solid;
border-color: #1d1d1b;
font-family: 'GillSansMTStd-Medium';
letter-spacing: 0.2;
height: 45px;
justify-content: center;
align-items: center;
`


export const Linktext = styled(Text)`
font-size: 15px;
font-family: 'GillSansMTStd-Medium';
`
