import styled from "styled-components";

const TcView = styled.div`
  border: 0px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${props =>
    props.style && props.style.margin ? props.style.margin : "0px"};
  border-bottom-color: ${props =>
    props.style && props.style.borderBottomColor
      ? props.style.borderBottomColor
      : "black"};
  border-bottom-width: ${props =>
    props.style && props.style.borderBottomWidth
      ? props.style.borderBottomWidth
      : "0px"};
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
`;

export default TcView;
