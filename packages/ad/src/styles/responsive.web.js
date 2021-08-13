import styled from "styled-components";

export const InlineAdWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  margin: 30px 0;
  box-sizing: content-box;
  padding: 10px 0;
  border-top: 1px solid rgb(219, 219, 219);
  border-bottom: 1px solid rgb(219, 219, 219);
  @media (min-width: 768px) {
    min-height: 90px;
  }

  @media (min-width: 970px) {
    min-height: 250px;
  }
`;
