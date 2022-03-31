import styled from "styled-components";
// not sure how else to put the default styles, this the default style for a React Native <Text/> component

const TcText = styled.div`
  border: 0px solid black;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  display: inline;
  font: 14px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  margin: 0px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export default TcText;
