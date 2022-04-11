import styled from "styled-components";
import { fonts, spacing, colours } from "@times-components/styleguide";

export const Video360Container = styled.div`
  border-radius: 100%;
  left: 50%;
  position: absolute;
  height: 100px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  z-index: 1;
  pointer-events: none;

  [data-is-360="true"]:hover & {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const VideoErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colours.functional.transparentBlack};
`;

export const VideoErrorHeading = styled.span`
  color: white;
  font-family: ${fonts.headline};
  font-size: 20px;
  height: auto;
  width: auto;
  margin-bottom: ${spacing(2)};
  text-align: center;
`;

export const VideoErrorBody = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-family: ${fonts.body};
  font-size: 14px;
  height: auto;
  max-width: 80%;
  text-align: center;
  width: 410px;
`;

export const NoSubscriptionWrapper = styled.div`
  position: absolute;
  height: 65px;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -32px;
`;

export const NoSubscriptionMessage = styled.span`
  background-color: rgba(0, 0, 0, 0.7);
  color: ${colours.functional.contrast};
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
  padding: ${spacing(2)};
  text-align: center;
  width: 300px;
  font-family: ${fonts.body};
  font-size: 14px;
`;
