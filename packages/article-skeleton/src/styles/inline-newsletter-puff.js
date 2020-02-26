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
    border-top-width: 6px;
    border-style: solid;
    border-top-color: #1D1D1B;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-left: 10px;

   @media (min-width: ${breakpoints.medium}px) {
    background-color: #F9F8F3;
    border-top-width: 8px;
    flex-direction: row;
    margin: 0 auto;
    padding: 10px;
    width: 80.8%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  } 
`
export const InpImageContainer = styled(View)`
   @media (min-width: ${breakpoints.medium}px) {
    padding-right: 10px;
    width: 45%;
  } 
`
export const InpTextEditor = styled(View)`
    padding-top: 5px;  
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    width:100%;
   @media (min-width: ${breakpoints.small}px) {
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      width: 55%;

    /* padding: 0.5rem 1rem 1rem 1rem; */
  } 
`
export const InpLabel = styled(Text)`
    font-family: 'GillSansMTStd-Medium';
    font-size: 12px;
    letter-spacing: 1;
    line-height: 15px;
    text-transform: uppercase;
`
export const InpHeadline = styled(Text)`
    color: #1D1D1B;
    font-family: 'TimesModern-Bold';
    font-size: 25px;
    line-height: 27px;
    text-decoration: none;
    @media (max-width: ${breakpoints.medium}px) {
        font-size: 22px;

  } 
`
export const InpDetails = styled(Text)`
    color: #737373;
    flex-wrap: wrap;
    font-family: 'TimesDigital-Regular';
    font-size: 16px;
    line-height: 22px;
    padding-top: 5;
    @media (max-width: ${breakpoints.medium}px) {
        font-size: 14px;

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
export const Atag = styled(View)`
background-color: black;
color: #CD0000;
font-family: 'GillSansMTStd-Medium';
font-size: 13px;
letter-spacing: 0.2;
line-height: 13px;
`
export const TagContainer = styled(View)`
width: 30%;
margin-top: 10px;
`

export const Linktext = styled(Text)`
text-align: center;
color: white;
`
