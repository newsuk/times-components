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
  SpeedButton,
  SpeedSelectModal,
  SpeedOptionsContainer,
  SpeedOptionItem,
  CloseButton,
  VolumeControlContainer,
  VolumeLabel,
  TabletDesktopWrapper,
  TabletDesktopInnerWrapper,
  LeftControls,
  CenterControls,
  RightControls,
  TabletDesktopPlayPauseButton,
  TabletDesktopStatusText,
  TabletDesktopVolumeControlContainer,
  TabletDesktopVolumeButton,
  TabletDesktopSeekBar,
  TabletDesktopSpeedButton,
  SpeedButtonContainer,
  TabletDesktopCloseButton
} from '../styles';

describe('Styled Components', () => {
  // 1. GlobalStyle
  it('should render GlobalStyle correctly', () => {
    const { container } = render(<GlobalStyle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // 2. AudioPlayerContainer
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
        '#ffffff'
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
        media: '(max-width:520px)'
      });
    });
  });

  // 3. Row
  it('should apply correct styles to Row', () => {
    const { container } = render(<Row>Test Row</Row>);

    expect(container.firstChild).toHaveStyleRule('width', '100%');
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('justify-content', 'center');
    expect(container.firstChild).toHaveStyleRule('align-items', 'center');
  });

  // 4. CollapseButton
  it('should apply correct styles to CollapseButton', () => {
    const { container } = render(<CollapseButton>Collapse</CollapseButton>);

    expect(container.firstChild).toHaveStyleRule('background', 'none');
    expect(container.firstChild).toHaveStyleRule('border', 'none');
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer');
    expect(container.firstChild).toHaveStyleRule('padding', '0');
  });

  // 6. StyledSeekBar
  it('should apply correct styles to StyledSeekBar based on progress', () => {
    const progress = 50;
    const { container } = render(<StyledSeekBar progress={progress} />);

    expect(container.firstChild).toHaveStyleRule(
      'background',
      'linear-gradient(to right,#1573A2 0%,#1573A2 50%,#f5f5f5 50%,#f5f5f5 100%)'
    );
    expect(container.firstChild).toHaveStyleRule('width', '90%');
    expect(container.firstChild).toHaveStyleRule('height', '4px');
    expect(container.firstChild).toHaveStyleRule('border-radius', '2px');
    expect(container.firstChild).toHaveStyleRule('outline', 'none');
    expect(container.firstChild).toHaveStyleRule('appearance', 'none');
    expect(container.firstChild).toHaveStyleRule('margin', '16px 0 6px 0');

    // Test ::-webkit-slider-thumb
    expect(container.firstChild).toHaveStyleRule('width', '16px', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule('height', '16px', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule('border-radius', '50%', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule('background', '#1573A2', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule(
      'border',
      '1px solid #1573A2',
      {
        modifier: '::-webkit-slider-thumb'
      }
    );
    expect(container.firstChild).toHaveStyleRule('margin-top', '-6px', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(container.firstChild).toHaveStyleRule(
      'transition',
      'background 0.3s ease',
      {
        modifier: '::-webkit-slider-thumb'
      }
    );

    // Test &:disabled
    expect(container.firstChild).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });
  });

  // 7. StyledTimeDisplay
  it('should apply correct styles to StyledTimeDisplay', () => {
    const { container } = render(
      <StyledTimeDisplay>00:00 / 03:30</StyledTimeDisplay>
    );

    const timeDisplay = container.firstChild;
    expect(timeDisplay).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(timeDisplay).toHaveStyleRule('font-size', '14px');
    expect(timeDisplay).toHaveStyleRule('font-weight', '500');
    expect(timeDisplay).toHaveStyleRule('text-align', 'right');
    expect(timeDisplay).toHaveStyleRule('width', '90%');
    expect(timeDisplay).toHaveStyleRule('display', 'flex');
    expect(timeDisplay).toHaveStyleRule('justify-content', 'space-between');
    expect(timeDisplay).toHaveStyleRule('margin-top', '6px');
    expect(timeDisplay).toHaveStyleRule('margin-bottom', '30px');
  });

  // 8. Controls
  it('should apply correct styles to Controls', () => {
    const { container } = render(<Controls>Controls</Controls>);

    const controls = container.firstChild;
    expect(controls).toHaveStyleRule('width', '90%');
    expect(controls).toHaveStyleRule('display', 'flex');
    expect(controls).toHaveStyleRule('justify-content', 'center');
    expect(controls).toHaveStyleRule('align-items', 'center');
    expect(controls).toHaveStyleRule('position', 'relative');

    // Media query for small screens
    expect(controls).toHaveStyleRule('gap', '16px', {
      media: '(max-width:520px)'
    });
  });

  // 9. PlaybackButtonsContainer
  it('should apply correct styles to PlaybackButtonsContainer', () => {
    const { container } = render(
      <PlaybackButtonsContainer>Playback Buttons</PlaybackButtonsContainer>
    );

    const playbackContainer = container.firstChild;
    expect(playbackContainer).toHaveStyleRule('display', 'flex');
    expect(playbackContainer).toHaveStyleRule('justify-content', 'center');
    expect(playbackContainer).toHaveStyleRule('align-items', 'center');
    expect(playbackContainer).toHaveStyleRule('gap', '8px');

    // Media query for larger screens
    expect(playbackContainer).toHaveStyleRule('gap', '16px', {
      media: '(min-width:520px)'
    });
  });

  // 10. ControlButton
  it('should apply correct styles to ControlButton', () => {
    const { container } = render(<ControlButton>Control</ControlButton>);

    const controlButton = container.firstChild;
    expect(controlButton).toHaveStyleRule('background', 'none');
    expect(controlButton).toHaveStyleRule('border', 'none');
    expect(controlButton).toHaveStyleRule('cursor', 'pointer');
    expect(controlButton).toHaveStyleRule('padding', '0');

    // Test svg inside ControlButton
    const svg = container.querySelector('svg');
    if (svg) {
      expect(svg).toHaveStyleRule('width', '24px');
      expect(svg).toHaveStyleRule('height', '24px');
      expect(svg).toHaveStyleRule('fill', '#333333');
    }

    // Test &:disabled
    expect(controlButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(controlButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });
  });

  // 11. PlayPauseButton
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

    // Test &:hover
    expect(playPauseButton).toHaveStyleRule('background-color', '#02020f', {
      modifier: ':hover'
    });

    // Test &:disabled
    expect(playPauseButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(playPauseButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });

    // Test svg inside PlayPauseButton
    const svg = container.querySelector('svg');
    if (svg) {
      expect(svg).toHaveStyleRule('width', '24px');
      expect(svg).toHaveStyleRule('height', '24px');
      expect(svg).toHaveStyleRule('position', 'absolute');
    }
  });

  // 12. SpeedButton
  it('should apply correct styles to SpeedButton', () => {
    const { container } = render(<SpeedButton>Speed</SpeedButton>);

    const speedButton = container.firstChild;
    expect(speedButton).toHaveStyleRule('background', 'none');
    expect(speedButton).toHaveStyleRule('border', '1px solid #333333');
    expect(speedButton).toHaveStyleRule('cursor', 'pointer');
    expect(speedButton).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(speedButton).toHaveStyleRule('font-size', '14px');
    expect(speedButton).toHaveStyleRule('font-weight', '500');
    expect(speedButton).toHaveStyleRule('color', '#333333');
    expect(speedButton).toHaveStyleRule('padding', '8px 16px');

    // Media query for small screens
    expect(speedButton).toHaveStyleRule('margin-left', '16px', {
      media: '(max-width:520px)'
    });
    expect(speedButton).toHaveStyleRule('position', 'absolute', {
      media: '(max-width:520px)'
    });
    expect(speedButton).toHaveStyleRule('right', '-10px', {
      media: '(max-width:520px)'
    });
    expect(speedButton).toHaveStyleRule('padding', '8px 16px', {
      media: '(max-width:520px)'
    });

    // Media query for larger screens
    expect(speedButton).toHaveStyleRule('position', 'absolute', {
      media: '(min-width:520px)'
    });
    expect(speedButton).toHaveStyleRule('right', '0', {
      media: '(min-width:520px)'
    });
    expect(speedButton).toHaveStyleRule('margin-left', '0', {
      media: '(min-width:520px)'
    });

    // Test &:hover
    expect(speedButton).toHaveStyleRule('background-color', '#f0f0f0', {
      modifier: ':hover'
    });

    // Test &:disabled
    expect(speedButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(speedButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });
  });

  // 13. SpeedSelectModal
  describe('SpeedSelectModal', () => {
    it('should apply correct styles when isMobile is true', () => {
      const { container } = render(
        <SpeedSelectModal isMobile>Modal Content</SpeedSelectModal>
      );

      const modal = container.firstChild;
      expect(modal).toHaveStyleRule('background', '#ffffff');
      expect(modal).toHaveStyleRule('z-index', '1000');
      expect(modal).toHaveStyleRule('display', 'flex');
      expect(modal).toHaveStyleRule('flex-direction', 'column');
      expect(modal).toHaveStyleRule('overflow', 'hidden');

      // Styles specific to isMobile
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
      expect(modal).toHaveStyleRule('background', '#ffffff');
      expect(modal).toHaveStyleRule('z-index', '1000');
      expect(modal).toHaveStyleRule('display', 'flex');
      expect(modal).toHaveStyleRule('flex-direction', 'column');
      expect(modal).toHaveStyleRule('overflow', 'unset');

      // Styles specific to desktop
      expect(modal).toHaveStyleRule('position', 'absolute');
      expect(modal).toHaveStyleRule('bottom', 'calc(100% + 18px)');
      expect(modal).toHaveStyleRule('left', '50%');
      expect(modal).toHaveStyleRule('transform', 'translateX(-50%)');
      expect(modal).toHaveStyleRule('width', '160px');
      expect(modal).toHaveStyleRule('height', '256px');
      expect(modal).toHaveStyleRule('border', '1px solid #ccc');
      expect(modal).toHaveStyleRule('padding', '16px 0px');
      expect(modal).toHaveStyleRule(
        'box-shadow',
        '0px 20px 32px 0px #0A0A0A14'
      );
      expect(modal).toHaveStyleRule('overflow', 'unset');

      // Test ::after pseudo-element
      expect(modal).toHaveStyleRule('content', "''", {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('position', 'absolute', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('top', '100%', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('left', '50%', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('transform', 'translateX(-50%)', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('border-width', '16px 16px 0 16px', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('border-style', 'solid', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule(
        'border-color',
        '#ffffff transparent transparent transparent',
        {
          modifier: '::after'
        }
      );
      expect(modal).toHaveStyleRule('width', '0', {
        modifier: '::after'
      });
      expect(modal).toHaveStyleRule('height', '0', {
        modifier: '::after'
      });
    });
  });

  // 14. SpeedOptionsContainer
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

  // 15. SpeedOptionItem
  describe('SpeedOptionItem', () => {
    it('should apply correct styles when selected and not mobile', () => {
      const { container } = render(
        <SpeedOptionItem selected={true}>Option</SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('display', 'flex');
      expect(optionItem).toHaveStyleRule('justify-content', 'space-between');
      expect(optionItem).toHaveStyleRule('align-items', 'center');
      expect(optionItem).toHaveStyleRule('background', '#BEDEED');
      expect(optionItem).toHaveStyleRule('padding', '8px 12px');
      expect(optionItem).toHaveStyleRule('cursor', 'pointer');
      expect(optionItem).toHaveStyleRule('width', '100%');
      expect(optionItem).toHaveStyleRule('font-family', 'Roboto,sans-serif');
      expect(optionItem).toHaveStyleRule('font-size', '16px');
      expect(optionItem).toHaveStyleRule('font-weight', '500');
      expect(optionItem).toHaveStyleRule('color', '#1D1D1B');

      // Test svg inside SpeedOptionItem
      const svg = container.querySelector('svg');
      if (svg) {
        expect(svg).toHaveStyleRule('width', '20px');
        expect(svg).toHaveStyleRule('height', '20px');
        expect(svg).toHaveStyleRule('fill', '#1d1d1b');
      }

      // Test &:hover when selected
      expect(optionItem).toHaveStyleRule('background', '#BEDEED', {
        modifier: ':hover'
      });
    });

    it('should apply correct styles when not selected and isMobile is true', () => {
      const { container } = render(
        <SpeedOptionItem selected={false} isMobile>
          Option
        </SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('background', 'transparent');
      expect(optionItem).toHaveStyleRule('color', '#696969');
      expect(optionItem).toHaveStyleRule('width', '80%');

      // Test &:hover when not selected
      expect(optionItem).toHaveStyleRule('background', '#f0f0f0', {
        modifier: ':hover'
      });
    });

    it('should apply correct styles when not selected and not mobile', () => {
      const { container } = render(
        <SpeedOptionItem selected={false}>Option</SpeedOptionItem>
      );

      const optionItem = container.firstChild;
      expect(optionItem).toHaveStyleRule('background', 'transparent');
      expect(optionItem).toHaveStyleRule('color', '#696969');
      expect(optionItem).toHaveStyleRule('width', '100%');

      // Test &:hover when not selected
      expect(optionItem).toHaveStyleRule('background', '#f0f0f0', {
        modifier: ':hover'
      });
    });
  });

  // 16. CloseButton
  it('should apply correct styles to CloseButton', () => {
    const { container } = render(<CloseButton>Close</CloseButton>);

    const closeButton = container.firstChild;
    expect(closeButton).toHaveStyleRule('background', 'none');
    expect(closeButton).toHaveStyleRule('border', 'none');
    expect(closeButton).toHaveStyleRule('cursor', 'pointer');
    expect(closeButton).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(closeButton).toHaveStyleRule('font-size', '16px');
    expect(closeButton).toHaveStyleRule('font-weight', '500');
    expect(closeButton).toHaveStyleRule('color', '#333333');
    expect(closeButton).toHaveStyleRule('padding', '12px 0');
    expect(closeButton).toHaveStyleRule('align-self', 'center');

    // Test &:hover
    expect(closeButton).toHaveStyleRule('text-decoration', 'underline', {
      modifier: ':hover'
    });
  });

  // 17. VolumeControlContainer
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

  // 18. VolumeLabel
  it('should apply correct styles to VolumeLabel', () => {
    const { container } = render(<VolumeLabel>Volume</VolumeLabel>);

    const label = container.firstChild;
    expect(label).toHaveStyleRule('margin-right', '10px');
    expect(label).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(label).toHaveStyleRule('font-size', '14px');
    expect(label).toHaveStyleRule('font-weight', '500');
  });

  // 20. TabletDesktopWrapper
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
    expect(wrapper).toHaveStyleRule('background-color', '#ffffff');
    expect(wrapper).toHaveStyleRule('box-shadow', '0px -2px 4px 0px #0000001a');
    expect(wrapper).toHaveStyleRule('display', 'flex');
    expect(wrapper).toHaveStyleRule('align-items', 'center');
    expect(wrapper).toHaveStyleRule('justify-content', 'center');
    expect(wrapper).toHaveStyleRule('z-index', '1000');
  });

  // 21. TabletDesktopInnerWrapper
  it('should apply correct styles to TabletDesktopInnerWrapper', () => {
    const { container } = render(
      <TabletDesktopInnerWrapper>Inner Wrapper</TabletDesktopInnerWrapper>
    );

    const innerWrapper = container.firstChild;
    expect(innerWrapper).toHaveStyleRule('max-width', '1440px');
    expect(innerWrapper).toHaveStyleRule('margin', '0 auto');
    expect(innerWrapper).toHaveStyleRule('width', '100%');
    expect(innerWrapper).toHaveStyleRule('display', 'flex');
    expect(innerWrapper).toHaveStyleRule('align-items', 'center');
    expect(innerWrapper).toHaveStyleRule('justify-content', 'space-between');
  });

  // 22. LeftControls
  it('should apply correct styles to LeftControls', () => {
    const { container } = render(<LeftControls>Left Controls</LeftControls>);

    const leftControls = container.firstChild;
    expect(leftControls).toHaveStyleRule('display', 'flex');
    expect(leftControls).toHaveStyleRule('align-items', 'center');
  });

  // 23. CenterControls
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

  // 24. RightControls
  it('should apply correct styles to RightControls', () => {
    const { container } = render(<RightControls>Right Controls</RightControls>);

    const rightControls = container.firstChild;
    expect(rightControls).toHaveStyleRule('display', 'flex');
    expect(rightControls).toHaveStyleRule('align-items', 'center');
  });

  // 25. TabletDesktopPlayPauseButton
  it('should apply correct styles to TabletDesktopPlayPauseButton', () => {
    const { container } = render(
      <TabletDesktopPlayPauseButton>Play/Pause</TabletDesktopPlayPauseButton>
    );

    const button = container.firstChild;
    expect(button).toHaveStyleRule('background', 'none');
    expect(button).toHaveStyleRule('border', 'none');
    expect(button).toHaveStyleRule('cursor', 'pointer');
    expect(button).toHaveStyleRule('padding', '0 8px');

    // Test svg inside TabletDesktopPlayPauseButton
    const svg = container.querySelector('svg');
    if (svg) {
      expect(svg).toHaveStyleRule('width', '32px');
      expect(svg).toHaveStyleRule('height', '32px');
      expect(svg).toHaveStyleRule('fill', '#333333');
    }
  });

  // 26. TabletDesktopStatusText
  it('should apply correct styles to TabletDesktopStatusText', () => {
    const { container } = render(
      <TabletDesktopStatusText>Status</TabletDesktopStatusText>
    );

    const statusText = container.firstChild;
    expect(statusText).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(statusText).toHaveStyleRule('font-size', '16px');
    expect(statusText).toHaveStyleRule('font-weight', '500');
    expect(statusText).toHaveStyleRule('margin', '0 16px');
  });

  // 27. TabletDesktopVolumeControlContainer
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

  // 28. TabletDesktopVolumeButton
  it('should apply correct styles to TabletDesktopVolumeButton', () => {
    const { container } = render(
      <TabletDesktopVolumeButton>Volume</TabletDesktopVolumeButton>
    );

    const volumeButton = container.firstChild;
    expect(volumeButton).toHaveStyleRule('background', 'none');
    expect(volumeButton).toHaveStyleRule('border', 'none');
    expect(volumeButton).toHaveStyleRule('cursor', 'pointer');
    expect(volumeButton).toHaveStyleRule('padding', '0 8px');

    // Test svg inside TabletDesktopVolumeButton
    const svg = container.querySelector('svg');
    if (svg) {
      expect(svg).toHaveStyleRule('width', '24px');
      expect(svg).toHaveStyleRule('height', '24px');
      expect(svg).toHaveStyleRule('fill', '#333333');
    }
  });

  // 30. SpeedButtonContainer
  it('should apply correct styles to SpeedButtonContainer', () => {
    const { container } = render(
      <SpeedButtonContainer>Speed Button Container</SpeedButtonContainer>
    );

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveStyleRule('position', 'relative');
  });

  // 31. TabletDesktopCloseButton
  it('should apply correct styles to TabletDesktopCloseButton', () => {
    const { container } = render(
      <TabletDesktopCloseButton>Close</TabletDesktopCloseButton>
    );

    const closeButton = container.firstChild;
    expect(closeButton).toHaveStyleRule('background', 'none');
    expect(closeButton).toHaveStyleRule('border', 'none');
    expect(closeButton).toHaveStyleRule('cursor', 'pointer');
    expect(closeButton).toHaveStyleRule('padding', '0 8px');

    // Test svg inside TabletDesktopCloseButton
    const svg = container.querySelector('svg');
    if (svg) {
      expect(svg).toHaveStyleRule('width', '24px');
      expect(svg).toHaveStyleRule('height', '24px');
      expect(svg).toHaveStyleRule('fill', '#333333');
    }
  });

  // 32. SpeedSelectModal (additional test for positioning)
  it('should apply correct positioning to SpeedSelectModal', () => {
    const { container } = render(
      <SpeedSelectModal isMobile={false}>Modal Content</SpeedSelectModal>
    );

    const modal = container.firstChild;
    // Since when isMobile is false, overflow is unset
    expect(modal).not.toHaveStyleRule('overflow', 'hidden');
    expect(modal).toHaveStyleRule('overflow', 'unset');
  });

  // 33. TabletDesktopSeekBar
  it('should apply correct styles to TabletDesktopSeekBar based on progress', () => {
    const progress = 75;
    const { container } = render(<TabletDesktopSeekBar progress={progress} />);

    const seekBar = container.firstChild;
    expect(seekBar).toHaveStyleRule(
      'background',
      'linear-gradient(to right,#1573A2 0%,#1573A2 75%,#f5f5f5 75%,#f5f5f5 100%)'
    );
    expect(seekBar).toHaveStyleRule('flex-grow', '1');
    expect(seekBar).toHaveStyleRule('height', '4px');
    expect(seekBar).toHaveStyleRule('outline', 'none');
    expect(seekBar).toHaveStyleRule('appearance', 'none');
    expect(seekBar).toHaveStyleRule('margin', '0 8px');

    // Test ::-webkit-slider-thumb
    expect(seekBar).toHaveStyleRule('width', '12px', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('height', '12px', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('background', '#1573A2', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('cursor', 'pointer', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('border-radius', '50%', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('border', '1px solid #1573A2', {
      modifier: '::-webkit-slider-thumb'
    });
    expect(seekBar).toHaveStyleRule('margin-top', '-4px', {
      modifier: '::-webkit-slider-thumb'
    });

    // Test ::-moz-range-thumb
    expect(seekBar).toHaveStyleRule('width', '12px', {
      modifier: '::-moz-range-thumb'
    });
    expect(seekBar).toHaveStyleRule('height', '12px', {
      modifier: '::-moz-range-thumb'
    });
    expect(seekBar).toHaveStyleRule('background', '#1573A2', {
      modifier: '::-moz-range-thumb'
    });
    expect(seekBar).toHaveStyleRule('cursor', 'pointer', {
      modifier: '::-moz-range-thumb'
    });
    expect(seekBar).toHaveStyleRule('border-radius', '50%', {
      modifier: '::-moz-range-thumb'
    });
    expect(seekBar).toHaveStyleRule('border', '1px solid #1573A2', {
      modifier: '::-moz-range-thumb'
    });

    // Test &:disabled
    expect(seekBar).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(seekBar).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });
  });

  // 34. TabletDesktopSpeedButton
  it('should apply correct styles to TabletDesktopSpeedButton', () => {
    const { container } = render(
      <TabletDesktopSpeedButton>Speed</TabletDesktopSpeedButton>
    );

    const speedButton = container.firstChild;
    expect(speedButton).toHaveStyleRule('background', 'none');
    expect(speedButton).toHaveStyleRule('border', '1px solid #333333');
    expect(speedButton).toHaveStyleRule('cursor', 'pointer');
    expect(speedButton).toHaveStyleRule('font-family', 'Roboto,sans-serif');
    expect(speedButton).toHaveStyleRule('font-size', '14px');
    expect(speedButton).toHaveStyleRule('font-weight', '500');
    expect(speedButton).toHaveStyleRule('color', '#333333');
    expect(speedButton).toHaveStyleRule('padding', '8px 16px');
    expect(speedButton).toHaveStyleRule('margin', '0 16px');

    // Test &:hover
    expect(speedButton).toHaveStyleRule('background-color', '#f0f0f0', {
      modifier: ':hover'
    });

    // Test &:disabled
    expect(speedButton).toHaveStyleRule('opacity', '0.5', {
      modifier: ':disabled'
    });
    expect(speedButton).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    });
  });
});
