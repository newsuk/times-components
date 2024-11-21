import styled, { createGlobalStyle } from 'styled-components';

// Define breakpoints
const breakpoints = {
  sm: '520px'
};

// Global Styles - box-sizing
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

// Define thumbColor variable
const thumbColor = '#1573A2';

// Container
export const AudioPlayerContainer = styled.div<{
  isExpanded: boolean;
  isModalOpen: boolean;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ isExpanded, isModalOpen }) => {
    if (!isExpanded) {
      return '48px';
    }
    return isModalOpen ? '370px' : '221px';
  }};
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0px -2px 4px 0px #0000001a;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: height 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'translateY(0)' : 'translateY(calc(100% - 48px))'};

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
  }
`;

// Row
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Collapse Button
export const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

// Title Scroller
export const Title = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 90%;
  margin-top: 16px;

  & > div {
    display: inline-block;
    padding-left: 100%;
    animation: scroll 10s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

// Seek Bar
interface StyledSeekBarProps {
  progress: number;
}

export const StyledSeekBar = styled.input<StyledSeekBarProps>`
  width: 90%;
  height: 4px;
  border-radius: 2px;
  background: ${({ progress }) =>
    `linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} ${progress}%, #f5f5f5 ${progress}%, #f5f5f5 100%)`};
  outline: none;
  appearance: none;
  margin: 16px 0 6px 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${thumbColor};
    cursor: pointer;
    border: 1px solid ${thumbColor};
    margin-top: -6px;
    transition: background 0.3s ease;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${thumbColor};
    cursor: pointer;
    border: 1px solid ${thumbColor};
    transition: background 0.3s ease;
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: transparent;
    border: none;
  }

  &::-moz-range-track {
    height: 4px;
    background: transparent;
    border: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Time Display
export const StyledTimeDisplay = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  margin-bottom: 30px;
`;

// Controls Container
export const Controls = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${breakpoints.sm}) {
    gap: 16px;
  }
`;

// Playback Buttons Container
export const PlaybackButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  @media (min-width: ${breakpoints.sm}) {
    gap: 16px;
  }
`;

// Control Button (Rewind and Forward)
export const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
    fill: #333333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Play/Pause Button
export const PlayPauseButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #01000d;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  position: relative;

  &:hover {
    background-color: #02020f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
    position: absolute;
  }
`;

// Speed Button
export const SpeedButton = styled.button`
  background: none;
  border: 1px solid #333333;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding: 8px 16px;

  @media (max-width: ${breakpoints.sm}) {
    margin-left: 16px;
    position: absolute;
    right: -10px;
    padding: 8px 16px;
  }

  @media (min-width: ${breakpoints.sm}) {
    position: absolute;
    right: 0;
    margin-left: 0;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Speed Select Modal
export const SpeedSelectModal = styled.div<{ isMobile?: boolean }>`
  background: #ffffff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ isMobile }) =>
    isMobile
      ? `
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        height: calc(100% - 40px);
        border: none;
        padding: 16px;
      `
      : `
        position: absolute;
        bottom: calc(100% + 18px);
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        height: 256px;
        border: 1px solid #ccc;
        padding: 16px 0px;
        box-shadow: 0px 20px 32px 0px #0A0A0A14;
        overflow: unset;

        &::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 16px 16px 0 16px;
          border-style: solid;
          border-color: #ffffff transparent transparent transparent;
          width: 0;
          height: 0;
        }
      `};
`;

// Speed Options Container
export const SpeedOptionsContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Speed Option Item
export const SpeedOptionItem = styled.div<{
  selected: boolean;
  isMobile?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ selected }) => (selected ? '#BEDEED' : 'transparent')};
  padding: 8px 12px;
  cursor: pointer;
  width: ${({ isMobile }) => (isMobile ? '80%;' : '100%')};
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#1D1D1B' : '#696969')};

  svg {
    width: 20px;
    height: 20px;
    fill: #1d1d1b;
  }

  &:hover {
    background: ${({ selected }) => (selected ? '#BEDEED' : '#f0f0f0')};
  }
`;

// Close Button in Modal
export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  padding: 12px 0;
  align-self: center;

  &:hover {
    text-decoration: underline;
  }
`;

// Volume Control
export const VolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  padding: 5px 0;
`;

// Volume Label
export const VolumeLabel = styled.label`
  margin-right: 10px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

// Volume Slider
export const VolumeSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #f5f5f5;
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${thumbColor};
    cursor: pointer;
    border: 1px solid ${thumbColor};
    margin-top: -6px;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${thumbColor};
    cursor: pointer;
    border: 1px solid ${thumbColor};
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: #f5f5f5;
    border: none;
  }

  &::-moz-range-track {
    height: 4px;
    background: #f5f5f5;
    border: none;
  }
`;

// Tablet/Desktop Wrapper
export const TabletDesktopWrapper = styled.div`
  width: 100%;
  padding: 16px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0px -2px 4px 0px #0000001a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Inner Wrapper
export const TabletDesktopInnerWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Left Controls
export const LeftControls = styled.div`
  display: flex;
  align-items: center;
`;

// Center Controls
export const CenterControls = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 16px;
`;

// Right Controls
export const RightControls = styled.div`
  display: flex;
  align-items: center;
`;

// Tablet/Desktop Play/Pause Button
export const TabletDesktopPlayPauseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 8px;

  svg {
    width: 32px;
    height: 32px;
    fill: #333333;
  }
`;

// Tablet/Desktop Status Text
export const TabletDesktopStatusText = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin: 0 16px;
`;

// Tablet/Desktop Volume Control
export const TabletDesktopVolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 16px;
`;

export const TabletDesktopVolumeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 8px;

  svg {
    width: 24px;
    height: 24px;
    fill: #333333;
  }
`;

export const TabletDesktopVolumeSlider = styled.input`
  width: 100px;
  margin-left: 8px;
  height: 4px;
  background: #f5f5f5;
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${thumbColor};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${thumbColor};
    margin-top: -4px;
  }
`;

// Tablet/Desktop Time Display
export const TabletDesktopTimeDisplay = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;

  span {
    margin: 0 4px;
  }
`;

// Tablet/Desktop Seek Bar
interface TabletDesktopSeekBarProps {
  progress: number;
}

export const TabletDesktopSeekBar = styled.input<TabletDesktopSeekBarProps>`
  flex-grow: 1;
  height: 4px;
  background: ${({ progress }) =>
    `linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} ${progress}%, #f5f5f5 ${progress}%, #f5f5f5 100%)`};
  outline: none;
  appearance: none;
  margin: 0 8px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${thumbColor};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${thumbColor};
    margin-top: -4px;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: ${thumbColor};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid ${thumbColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Tablet/Desktop Speed Button
export const TabletDesktopSpeedButton = styled.button`
  background: none;
  border: 1px solid #333333;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding: 8px 16px;
  margin: 0 16px;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Speed Button Container
export const SpeedButtonContainer = styled.div`
  position: relative;
`;

// Tablet/Desktop Close Button
export const TabletDesktopCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 8px;

  svg {
    width: 24px;
    height: 24px;
    fill: #333333;
  }
`;
