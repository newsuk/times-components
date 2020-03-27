import styled from "styled-components";

const DatawrapperFrame = styled.iframe`
  border: 0;
  width: 100%;
  height: ${props => props.height}px;
`;

export default DatawrapperFrame;
