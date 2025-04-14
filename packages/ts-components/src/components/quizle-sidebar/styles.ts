import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 12px;
  border-style: solid none none none;
  border-width: 3px;
  border-color: #c05729;
  min-width: 160px;
  margin-bottom: 120px;
`;

export const Description = styled.p`
  display: block;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: 0em;
  margin: 7px 0 4px;
`;

export const Divider = styled.hr`
  margin: 12px 0;
  border-style: dashed none none none;
  border-width: 1px;
  border-color: #01000d;
  &:first-of-type {
    margin-top: 12px;
  }
`;

export const Link = styled.a`
  display: block;
  text-decoration: none;

  &:hover {
    button {
      background-color: #e4e4e4;
    }
    h3 {
      color: #00527a;
    }
  }
  h3 {
    color: #c05729;
  }
`;

export const TitleIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .question-icon {
    width: 37.652px;
    height: 40px;
    margin-left: 8px;
  }
`;

export const Title = styled.h3`
  font-family: 'Times Modern';
  font-weight: 800;
  line-height: 1.125;
  font-size: 1.8rem;
  letter-spacing: 0em;
  margin: 2px 0 0;
`;

export const Titletag = styled.h3`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-align: left;
  margin-block: 0;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0 0;
  min-height: 90px;
  justify-content: space-between;

  & .q-icon {
    position: absolute;
    color: #C74600;
    font-family: TimesModern-Regular, TimesModern-Regular-fallback, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    left: -28px;
    top: -7px;
  }

  & .q-arrow {
    width: 16px;
    height: 16px;
    background-image: url('data:image/svg+xml; charset=utf-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.67999 4L5.73999 4.94L8.79332 8L5.73999 11.06L6.67999 12L10.68 8L6.67999 4Z" fill="%23C74600"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
  	display: inline-block;
  	background-position: -3px 4px;
    margin-left: 4px;
}

  & p {
    position: relative;
    color: #333;
    font-family: Roboto-Regular, Roboto-Regular-fallback, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin: 0 0 20px;
    text-indent: 28px;
}

  & a {
    position: relative;
    width: 100%;
    color: #C74600;
    font-family: Roboto-Regular, Roboto-Regular-fallback, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 112.5%;
    text-decoration: none;
    & :hover{
      color:#00527A;

      & .q-arrow {
        background-image: url('data:image/svg+xml; charset=utf-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.67999 4L5.73999 4.94L8.79332 8L5.73999 11.06L6.67999 12L10.68 8L6.67999 4Z" fill="%2300527A"/></svg>')
    }
  }
`;
