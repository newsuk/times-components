import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import {
  GlobalStyle,
  AudioPlayerContainer,
  Row,
  CollapseButton,
  StyledSeekBar,
  StyledTimeDisplay,
  Controls,
  PlaybackButtonsContainer,
  ControlButton,
  PlayPauseButton,
  SpeedSelectModal,
  SpeedOptionsContainer,
  SpeedOptionItem,
  CloseButton,
  VolumeControlContainer,
  VolumeLabel,
  VolumeSlider,
  TabletDesktopWrapper,
  TabletDesktopInnerWrapper,
  LeftControls,
  CenterControls,
  RightControls,
  TabletDesktopPlayPauseButton,
  TabletDesktopStatusText,
  TabletDesktopVolumeControlContainer,
  TabletDesktopVolumeButton,
  TabletDesktopVolumeSlider,
  TabletDesktopSeekBar,
  TabletDesktopSpeedButton,
  SpeedButtonContainer,
  TabletDesktopCloseButton,
} from '../styles';
import { colours, fonts, breakpoints } from '@times-components/ts-styleguide';

describe('Styled Components', () => {
  it('should render GlobalStyle correctly', () => {
    const { container } = render(<GlobalStyle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('AudioPlayerContainer', () => {
    it('should apply correct styles when not expanded and modal is closed', () => {
      const { container } = render(
        <AudioPlayerContainer isExpanded={false} isModalOpen={false}>
          Test
        </AudioPlayerContainer>
      );

      expect(container.firstChild).toHaveStyleRule('height', '48px');
      expect(container.firstChild).toHaveStyleRule(
        'transform',
        'translateY(calc(100% - 48px))'
      );
      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        colours.functional.white
      );
    });

    it('should apply correct styles when expanded and modal is open', () => {
      const { container } = render(
        <AudioPlayerContainer isExpanded={true} isModalOpen={true}>
          Test
        </AudioPlayerContainer>
      );

      expect(container.firstChild).toHaveStyleRule('height', '370px');
      expect(container.firstChild).toHaveStyleRule(
        'transform',
        'translateY(0)'
      );
    });

    it('should apply correct styles when expanded and modal is closed', () => {
      const { container } = render(
        <AudioPlayerContainer isExpanded={true} isModalOpen={false}>
          Test
        </AudioPlayerContainer>
      );

      expect(container.firstChild).toHaveStyleRule('height', '221px');
      expect(container.firstChild).toHaveStyleRule(
        'transform',
        'translateY(0)'
      );
    });

    it('should apply media query styles correctly', () => {
      const { container } = render(
        <AudioPlayerContainer isExpanded={true} isModalOpen={false}>
          Test
        </AudioPlayerContainer>
      );

      expect(container.firstChild).toHaveStyleRule('width', '100%', {
        media: `(max-width:${breakpoints.small})`,
      });
    });
  });
  it('should apply correct styles to Row', () => {
    const { container } = render(<Row>Test Row</Row>);

    expect(container.firstChild).toHaveStyleRule('width', '100%');
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('justify-content', 'center');
    expect(container.firstChild).toHaveStyleRule('align-items', 'center');
  });

  it('should apply correct styles to CollapseButton', () => {
    const { container } = render(<CollapseButton>Collapse</CollapseButton>);

    expect(container.firstChild).toHaveStyleRule('background', 'none');
    expect(container.firstChild).toHaveStyleRule('border', 'none');
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer');
    expect(container.firstChild).toHaveStyleRule('padding', '0');
  });

  it('should apply correct styles to StyledTimeDisplay', () => {
    const { container } = render(
      <StyledTimeDisplay>00:00 / 03:30</StyledTimeDisplay>
    );

    const timeDisplay = container.firstChild;
    expect(timeDisplay).toHaveStyleRule('font-family', fonts.supporting);
    expect(timeDisplay).toHaveStyleRule('font-size', '14px');
    expect(timeDisplay).toHaveStyleRule('font-weight', '500');
    expect(timeDisplay).toHaveStyleRule('text-align', 'right');
    expect(timeDisplay).toHaveStyleRule('width', '90%');
    expect(timeDisplay).toHaveStyleRule('display', 'flex');
    expect(timeDisplay).toHaveStyleRule('justify-content', 'space-between');
    expect(timeDisplay).toHaveStyleRule('margin-top', '6px');
    expect(timeDisplay).toHaveStyleRule('margin-bottom', '30px');
  });

  it('should apply correct styles to Controls', () => {
    const { container } = render(<Controls>Controls</Controls>);

    const controls = container.firstChild;
    expect(controls).toHaveStyleRule('width', '90%');
    expect(controls).toHaveStyleRule('display', 'flex');
    expect(controls).toHaveStyleRule('justify-content', 'center');
    expect(controls).toHaveStyleRule('align-items', 'center');
    expect(controls).toHaveStyleRule('position', 'relative');

    expect(controls).toHaveStyleRule('gap', '16px', {
      media: `(max-width:${breakpoints.small})`,
    });
  });

  it('should apply correct styles to PlaybackButtonsContainer', () => {
    const { container } = render(
      <PlaybackButtonsContainer>Playback Buttons</PlaybackButtonsContainer>
    );

    const playbackContainer = container.firstChild;
    expect(playbackContainer).toHaveStyleRule('display', 'flex');
    expect(playbackContainer).toHaveStyleRule('justify-content', 'center');
    expect(playbackContainer).toHaveStyleRule('align-items', 'center');
    expect(playbackContainer).toHaveStyleRule('gap', '8px');

    expect(playbackContainer).toHaveStyleRule('gap', '16px', {
      media: `(min-width:${breakpoints.small})`,
    });
  });

  it('should apply correct styles to ControlButton', () => {
    const { container } = render(<ControlButton>Control</ControlButton>);

    const controlButton = container.firstChild;
    expect(controlButton).toHaveStyleRule('background', 'none');
    expect(controlButton).toHaveStyleRule('border', 'none');
    expect(controlButton).toHaveStyleRule('cursor', 'pointer');
    expect(controlButton).toHaveStyleRule('padding', '0');

    expect(controlButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled',
    });
    expect(controlButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  it('should apply correct styles to PlayPauseButton', () => {
    const { container } = render(<PlayPauseButton>Play/Pause</PlayPauseButton>);

    const playPauseButton = container.firstChild;
    expect(playPauseButton).toHaveStyleRule('width', '48px');
    expect(playPauseButton).toHaveStyleRule('height', '48px');
    expect(playPauseButton).toHaveStyleRule('border', 'none');
    expect(playPauseButton).toHaveStyleRule('border-radius', '50%');
    expect(playPauseButton).toHaveStyleRule('background-color', '#01000d');
    expect(playPauseButton).toHaveStyleRule('display', 'flex');
    expect(playPauseButton).toHaveStyleRule('justify-content', 'center');
    expect(playPauseButton).toHaveStyleRule('align-items', 'center');
    expect(playPauseButton).toHaveStyleRule('cursor', 'pointer');
    expect(playPauseButton).toHaveStyleRule('padding', '0');
    expect(playPauseButton).toHaveStyleRule('position', 'relative');

    expect(playPauseButton).toHaveStyleRule('background-color', '#02020f', {
      modifier: ':hover',
    });

    expect(playPauseButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled',
    });
    expect(playPauseButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  describe('SpeedSelectModal', () => {
    it('should apply correct styles when isMobile is true', () => {
      const { container } = render(
        <SpeedSelectModal isMobile>Modal Content</SpeedSelectModal>
      );

      const modal = container.firstChild;
      expect(modal).toHaveStyleRule('background', colours.functional.white);
      expect(modal).toHaveStyleRule('z-index', '1000');
      expect(modal).toHaveStyleRule('display', 'flex');
      expect(modal).toHaveStyleRule('flex-direction', 'column');
      expect(modal).toHaveStyleRule('overflow', 'hidden');

      expect(modal).toHaveStyleRule('position', 'absolute');
      expect(modal).toHaveStyleRule('top', '40px');
      expect(modal).toHaveStyleRule('left', '0');
      expect(modal).toHaveStyleRule('width', '100%');
      expect(modal).toHaveStyleRule('height', 'calc(100% - 40px)');
      expect(modal).toHaveStyleRule('border', 'none');
      expect(modal).toHaveStyleRule('padding', '16px');
    });

    it('should apply correct styles when isMobile is false', () => {
      const { container } = render(
        <SpeedSelectModal isMobile={false}>Modal Content</SpeedSelectModal>
      );

      const modal = container.firstChild;
      expect(modal).toHaveStyleRule('background', colours.functional.white);
      expect(modal).toHaveStyleRule('z-index', '1000');
      expect(modal).toHaveStyleRule('display', 'flex');
      expect(modal).toHaveStyleRule('flex-direction', 'column');
      expect(modal).toHaveStyleRule('overflow', 'unset');

      expect(modal).toHaveStyleRule('position', 'absolute');
      expect(modal).toHaveStyleRule('bottom', 'calc(100% + 18px)');
      expect(modal).toHaveStyleRule('left', '50%');
      expect(modal).toHaveStyleRule('transform', 'translateX(-50%)');
      expect(modal).toHaveStyleRule('width', '160px');
      expect(modal).toHaveStyleRule('height', '256px');
      expect(modal).toHaveStyleRule(
        'border',
        `1px solid ${colours.functional.greyLabel}`
      );
      expect(modal).toHaveStyleRule('padding', '16px 0px');
      expect(modal).toHaveStyleRule(
        'box-shadow',
        '0px 20px 32px 0px #0A0A0A14'
      );
      expect(modal).toHaveStyleRule('overflow', 'unset');

      // Test ::after pseudo-element
      expect(modal).toHaveStyleRule('content', "''", {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('position', 'absolute', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('top', '100%', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('left', '50%', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('transform', 'translateX(-50%)', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('border-width', '16px 16px 0 16px', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('border-style', 'solid', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule(
        'border-color',
        `${colours.functional.white} transparent transparent transparent`,
        {
          modifier: '::after',
        }
      );
      expect(modal).toHaveStyleRule('width', '0', {
        modifier: '::after',
      });
      expect(modal).toHaveStyleRule('height', '0', {
        modifier: '::after',
      });
    });
  });

  it('should apply correct styles to SpeedOptionsContainer', () => {
    const { container } = render(
      <SpeedOptionsContainer>Options</SpeedOptionsContainer>
    );

    const optionsContainer = container.firstChild;
    expect(optionsContainer).toHaveStyleRule('flex', '1');
    expect(optionsContainer).toHaveStyleRule('width', '100%');
    expect(optionsContainer).toHaveStyleRule('display', 'flex');
    expect(optionsContainer).toHaveStyleRule('flex-direction', 'column');
    expect(optionsContainer).toHaveStyleRule('align-items', 'center');
  });

  describe('SpeedOptionItem', () => {
    it('should apply correct styles when selected and not mobile', () => {
      const { container } = render(
        <SpeedOptionItem selected={true}>Option</SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('display', 'flex');
      expect(optionItem).toHaveStyleRule('justify-content', 'space-between');
      expect(optionItem).toHaveStyleRule('align-items', 'center');
      expect(optionItem).toHaveStyleRule(
        'background',
        colours.functional.bannerBackground
      );
      expect(optionItem).toHaveStyleRule('padding', '8px 12px');
      expect(optionItem).toHaveStyleRule('cursor', 'pointer');
      expect(optionItem).toHaveStyleRule('width', '100%');
      expect(optionItem).toHaveStyleRule('font-family', fonts.supporting);
      expect(optionItem).toHaveStyleRule('font-size', '16px');
      expect(optionItem).toHaveStyleRule('font-weight', '500');
      expect(optionItem).toHaveStyleRule(
        'color',
        colours.functional.brandColour
      );

      expect(optionItem).toHaveStyleRule(
        'background',
        colours.functional.bannerBackground,
        {
          modifier: ':hover',
        }
      );
    });

    it('should apply correct styles when not selected and isMobile is true', () => {
      const { container } = render(
        <SpeedOptionItem selected={false} isMobile>
          Option
        </SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('background', 'transparent');
      expect(optionItem).toHaveStyleRule('color', colours.functional.secondary);
      expect(optionItem).toHaveStyleRule('width', '80%');

      expect(optionItem).toHaveStyleRule(
        'background',
        colours.functional.border,
        {
          modifier: ':hover',
        }
      );
    });

    it('should apply correct styles when not selected and not mobile', () => {
      const { container } = render(
        <SpeedOptionItem selected={false}>Option</SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('background', 'transparent');
      expect(optionItem).toHaveStyleRule('color', colours.functional.secondary);
      expect(optionItem).toHaveStyleRule('width', '100%');

      expect(optionItem).toHaveStyleRule(
        'background',
        colours.functional.border,
        {
          modifier: ':hover',
        }
      );
    });
  });

  it('should apply correct styles to CloseButton', () => {
    const { container } = render(<CloseButton>Close</CloseButton>);

    const closeButton = container.firstChild;
    expect(closeButton).toHaveStyleRule('background', 'none');
    expect(closeButton).toHaveStyleRule('border', 'none');
    expect(closeButton).toHaveStyleRule('cursor', 'pointer');
    expect(closeButton).toHaveStyleRule('font-family', fonts.supporting);
    expect(closeButton).toHaveStyleRule('font-size', '16px');
    expect(closeButton).toHaveStyleRule('font-weight', '500');
    expect(closeButton).toHaveStyleRule('color', colours.functional.primary);
    expect(closeButton).toHaveStyleRule('padding', '12px 0');
    expect(closeButton).toHaveStyleRule('align-self', 'center');

    expect(closeButton).toHaveStyleRule('text-decoration', 'underline', {
      modifier: ':hover',
    });
  });

  it('should apply correct styles to VolumeControlContainer', () => {
    const { container } = render(
      <VolumeControlContainer>Volume</VolumeControlContainer>
    );

    const volumeContainer = container.firstChild;
    expect(volumeContainer).toHaveStyleRule('display', 'flex');
    expect(volumeContainer).toHaveStyleRule('align-items', 'center');
    expect(volumeContainer).toHaveStyleRule('width', '90%');
    expect(volumeContainer).toHaveStyleRule('padding', '5px 0');
  });

  it('should apply correct styles to VolumeLabel', () => {
    const { container } = render(<VolumeLabel>Volume</VolumeLabel>);

    const label = container.firstChild;
    expect(label).toHaveStyleRule('margin-right', '10px');
    expect(label).toHaveStyleRule('font-family', fonts.supporting);
    expect(label).toHaveStyleRule('font-size', '14px');
    expect(label).toHaveStyleRule('font-weight', '500');
  });

  it('should apply correct styles to TabletDesktopWrapper', () => {
    const { container } = render(
      <TabletDesktopWrapper>Wrapper</TabletDesktopWrapper>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyleRule('width', '100%');
    expect(wrapper).toHaveStyleRule('padding', '16px 20px');
    expect(wrapper).toHaveStyleRule('position', 'fixed');
    expect(wrapper).toHaveStyleRule('bottom', '0');
    expect(wrapper).toHaveStyleRule('left', '0');
    expect(wrapper).toHaveStyleRule(
      'background-color',
      colours.functional.white
    );
    expect(wrapper).toHaveStyleRule('box-shadow', '0px -2px 4px 0px #0000001a');
    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('align-items', 'center');
    expect(wrapper).toHaveStyleRule('justify-content', 'center');
    expect(wrapper).toHaveStyleRule('z-index', '1000');
  });

  describe('StyledSeekBar', () => {
    it('should apply correct styles with progress at 0%', () => {
      const { container } = render(<StyledSeekBar progress={0} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('0%')
      );
    });

    it('should apply correct styles with progress at 50%', () => {
      const { container } = render(<StyledSeekBar progress={50} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('50%')
      );
    });

    it('should apply correct styles with progress at 100%', () => {
      const { container } = render(<StyledSeekBar progress={100} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('100%')
      );
    });
  });

  describe('TabletDesktopSeekBar', () => {
    it('should apply correct styles with progress at 25%', () => {
      const { container } = render(<TabletDesktopSeekBar progress={25} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('25%')
      );
    });

    it('should apply correct styles with progress at 75%', () => {
      const { container } = render(<TabletDesktopSeekBar progress={75} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('75%')
      );
    });
  });

  it('should apply correct styles to VolumeSlider', () => {
    const { container } = render(<VolumeSlider />);

    const volumeSlider = container.firstChild;
    expect(volumeSlider).toHaveStyleRule('width', '100%');
    expect(volumeSlider).toHaveStyleRule('height', '4px');
    expect(volumeSlider).toHaveStyleRule('border-radius', '2px');
    expect(volumeSlider).toHaveStyleRule(
      'background',
      colours.functional.whiteGrey
    );
    expect(volumeSlider).toHaveStyleRule('outline', 'none');
    expect(volumeSlider).toHaveStyleRule('appearance', 'none');

    // Thumb styles
    expect(volumeSlider).toHaveStyleRule('appearance', 'none', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('width', '16px', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('height', '16px', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('border-radius', '50%', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('background', '#1573A2', {
      modifier: '&::-webkit-slider-thumb',
    });
  });

  it('should apply correct styles to TabletDesktopInnerWrapper', () => {
    const { container } = render(
      <TabletDesktopInnerWrapper>Inner Wrapper</TabletDesktopInnerWrapper>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyleRule('max-width', '1440px');
    expect(wrapper).toHaveStyleRule('margin', '0 auto');
    expect(wrapper).toHaveStyleRule('width', '100%');
    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('align-items', 'center');
    expect(wrapper).toHaveStyleRule('justify-content', 'space-between');
  });

  it('should apply correct styles to LeftControls', () => {
    const { container } = render(<LeftControls>Left Controls</LeftControls>);

    const leftControls = container.firstChild;
    expect(leftControls).toHaveStyleRule('display', 'flex');
    expect(leftControls).toHaveStyleRule('align-items', 'center');
  });

  it('should apply correct styles to CenterControls', () => {
    const { container } = render(
      <CenterControls>Center Controls</CenterControls>
    );

    const centerControls = container.firstChild;
    expect(centerControls).toHaveStyleRule('display', 'flex');
    expect(centerControls).toHaveStyleRule('align-items', 'center');
    expect(centerControls).toHaveStyleRule('flex-grow', '1');
    expect(centerControls).toHaveStyleRule('margin', '0 16px');
  });

  it('should apply correct styles to RightControls', () => {
    const { container } = render(<RightControls>Right Controls</RightControls>);

    const rightControls = container.firstChild;
    expect(rightControls).toHaveStyleRule('display', 'flex');
    expect(rightControls).toHaveStyleRule('align-items', 'center');
  });

  it('should apply correct styles to TabletDesktopPlayPauseButton', () => {
    const { container } = render(
      <TabletDesktopPlayPauseButton>Play/Pause</TabletDesktopPlayPauseButton>
    );

    const button = container.firstChild;
    expect(button).toHaveStyleRule('background', 'none');
    expect(button).toHaveStyleRule('border', 'none');
    expect(button).toHaveStyleRule('cursor', 'pointer');
    expect(button).toHaveStyleRule('padding', '0 8px');

    // SVG styles
    expect(button).toHaveStyleRule('width', '32px', {
      modifier: 'svg',
    });
    expect(button).toHaveStyleRule('height', '32px', {
      modifier: 'svg',
    });
    expect(button).toHaveStyleRule('fill', colours.functional.primary, {
      modifier: 'svg',
    });
  });

  it('should apply correct styles to TabletDesktopStatusText', () => {
    const { container } = render(
      <TabletDesktopStatusText>Status Text</TabletDesktopStatusText>
    );

    const statusText = container.firstChild;
    expect(statusText).toHaveStyleRule('font-family', fonts.supporting);
    expect(statusText).toHaveStyleRule('font-size', '16px');
    expect(statusText).toHaveStyleRule('font-weight', '500');
    expect(statusText).toHaveStyleRule('margin', '0 16px');
  });

  it('should apply correct styles to TabletDesktopVolumeControlContainer', () => {
    const { container } = render(
      <TabletDesktopVolumeControlContainer>
        Volume Control
      </TabletDesktopVolumeControlContainer>
    );

    const volumeControl = container.firstChild;
    expect(volumeControl).toHaveStyleRule('display', 'flex');
    expect(volumeControl).toHaveStyleRule('align-items', 'center');
    expect(volumeControl).toHaveStyleRule('margin', '0 16px');
  });

  it('should apply correct styles to TabletDesktopVolumeButton', () => {
    const { container } = render(
      <TabletDesktopVolumeButton>Volume Button</TabletDesktopVolumeButton>
    );

    const volumeButton = container.firstChild;
    expect(volumeButton).toHaveStyleRule('background', 'none');
    expect(volumeButton).toHaveStyleRule('border', 'none');
    expect(volumeButton).toHaveStyleRule('cursor', 'pointer');
    expect(volumeButton).toHaveStyleRule('padding', '0 8px');

    // SVG styles
    expect(volumeButton).toHaveStyleRule('width', '24px', {
      modifier: 'svg',
    });
    expect(volumeButton).toHaveStyleRule('height', '24px', {
      modifier: 'svg',
    });
    expect(volumeButton).toHaveStyleRule('fill', colours.functional.primary, {
      modifier: 'svg',
    });
  });

  it('should apply correct styles to TabletDesktopVolumeSlider', () => {
    const { container } = render(<TabletDesktopVolumeSlider />);

    const volumeSlider = container.firstChild;
    expect(volumeSlider).toHaveStyleRule('width', '100px');
    expect(volumeSlider).toHaveStyleRule('margin-left', '8px');
    expect(volumeSlider).toHaveStyleRule('height', '4px');
    expect(volumeSlider).toHaveStyleRule(
      'background',
      colours.functional.whiteGrey
    );
    expect(volumeSlider).toHaveStyleRule('outline', 'none');
    expect(volumeSlider).toHaveStyleRule('appearance', 'none');

    // Thumb styles
    expect(volumeSlider).toHaveStyleRule('width', '12px', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('height', '12px', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('background', '#1573A2', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('border-radius', '50%', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('border', '1px solid #1573A2', {
      modifier: '&::-webkit-slider-thumb',
    });
    expect(volumeSlider).toHaveStyleRule('margin-top', '-4px', {
      modifier: '&::-webkit-slider-thumb',
    });
  });

  describe('TabletDesktopSeekBar', () => {
    it('should apply correct styles with progress at 0%', () => {
      const { container } = render(<TabletDesktopSeekBar progress={0} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('0%')
      );
    });

    it('should apply correct styles with progress at 50%', () => {
      const { container } = render(<TabletDesktopSeekBar progress={50} />);

      const seekBar = container.firstChild;
      expect(seekBar).toHaveStyleRule(
        'background',
        expect.stringContaining('50%')
      );
    });
  });

  it('should apply correct styles to TabletDesktopSpeedButton', () => {
    const { container } = render(
      <TabletDesktopSpeedButton>1x</TabletDesktopSpeedButton>
    );

    const speedButton = container.firstChild;
    expect(speedButton).toHaveStyleRule('background', 'none');
    expect(speedButton).toHaveStyleRule(
      'border',
      `1px solid ${colours.functional.primary}`
    );
    expect(speedButton).toHaveStyleRule('cursor', 'pointer');
    expect(speedButton).toHaveStyleRule('font-family', fonts.supporting);
    expect(speedButton).toHaveStyleRule('font-size', '14px');
    expect(speedButton).toHaveStyleRule('font-weight', '500');
    expect(speedButton).toHaveStyleRule('color', colours.functional.primary);
    expect(speedButton).toHaveStyleRule('padding', '8px 16px');
    expect(speedButton).toHaveStyleRule('margin', '0 16px');

    expect(speedButton).toHaveStyleRule(
      'background-color',
      colours.functional.border,
      {
        modifier: ':hover',
      }
    );

    expect(speedButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled',
    });
    expect(speedButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  it('should apply correct styles to SpeedButtonContainer', () => {
    const { container } = render(
      <SpeedButtonContainer>Speed Button Container</SpeedButtonContainer>
    );

    const speedButtonContainer = container.firstChild;
    expect(speedButtonContainer).toHaveStyleRule('position', 'relative');
  });

  it('should apply correct styles to TabletDesktopCloseButton', () => {
    const { container } = render(
      <TabletDesktopCloseButton>Close</TabletDesktopCloseButton>
    );

    const closeButton = container.firstChild;
    expect(closeButton).toHaveStyleRule('background', 'none');
    expect(closeButton).toHaveStyleRule('border', 'none');
    expect(closeButton).toHaveStyleRule('cursor', 'pointer');
    expect(closeButton).toHaveStyleRule('padding', '0 8px');

    // SVG styles
    expect(closeButton).toHaveStyleRule('width', '24px', {
      modifier: 'svg',
    });
    expect(closeButton).toHaveStyleRule('height', '24px', {
      modifier: 'svg',
    });
    expect(closeButton).toHaveStyleRule('fill', colours.functional.primary, {
      modifier: 'svg',
    });
  });
});
