import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin: 30px 0 60px 0;
  padding: 1px 1px 10px;
`;

export const Disclaimer = styled.div`
  text-align: center;
  padding: 14px 0;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .shortcode-disclaimer_text {
    display: inline;
    clear: both;
    font-size: 1.8rem;
    line-height: 1.5;
    color: #1d1d1b;
    padding: 0;
    font-weight: 400;
    margin: 0;
  }

  .shortcode-disclaimer__toggle {
    font-weight: 400;
    word-wrap: break-word;
    margin-left: 8px;
    font-family: Roboto, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    font-weight: 400;
    color: rgb(105, 105, 105) !important;
    font-style: normal;
    text-decoration: none !important;
    display: inline-flex;
    margin-top: 5px;
  }

  .shortcode-disclaimer__toggle:after {
    transition: transform 0.2s linear;
    content: '';
    display: inline-block;
    background-image: url('https://www.thetimes.co.uk/travel/wp-content/themes/tnl-travel-refactor/dist/assets/css/svg/arrow-affiliate.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    height: 16px;
    width: 16px;
    margin-left: 2px;
    margin-top: 2px;
    -webkit-transform: rotate(180deg);
  }
`;

export const TextContainer = styled.div`
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  p {
    text-align: center;
    margin: 0 !important;
    clear: both;
    font-size: 1.8rem;
    line-height: 1.6;
    color: rgb(105, 105, 105) !important;
    padding: 0 5px 30px;
    font-weight: 400;
    font-family: TimesDigitalW04-Regular, TimesDigitalW04-Regular-fallback,
      serif;
  }
`;
