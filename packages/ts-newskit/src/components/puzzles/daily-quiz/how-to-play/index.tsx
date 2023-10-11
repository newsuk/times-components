import React, { FC, ReactNode } from 'react';
import { Button, UnorderedList, P, Stack } from 'newskit';
import { StyledModal } from './styles';

interface HowToPlayProps {
  title?: string;
  header?: string;
  listItems?: ReactNode[];
}

const useActiveState = (initial = false): [boolean, () => void, () => void] => {
  const [isActive, setIsActive] = React.useState(initial);

  const open = () => setIsActive(true);
  const close = () => setIsActive(false);

  return [isActive, open, close];
};

export const HowToPlay: FC<HowToPlayProps> = ({ title, header, listItems }) => {
  const [isActive, open, close] = useActiveState();
  const modalContent = (
    <P overrides={{ typographyPreset: 'editorialParagraph010' }}>
      <UnorderedList
        overrides={{
          marker: { size: 'sizing010' },
          marginBlock: 'space020',
          marginInline: 'space020'
        }}
      >
        {listItems
          ? listItems.map((item, index) => <li key={index}>{item}</li>)
          : [
              'Answer the question of the day by typing your answer in the text box.',
              'Use up to four hints to find the answer.',
              'If you submit an incorrect answer, the next hint will display.',
              'If you submit an incorrect answer after the fourth hint, the answer will be revealed.'
            ]}
      </UnorderedList>
    </P>
  );

  return (
    <Stack flow="vertical-center">
      <Button
        onClick={open}
        data-testid="modal-open-button"
        overrides={{
          stylePreset: `HowToPlay`,
          typographyPreset: 'utilityButton020'
        }}
      >
        {title ? title : 'How to play'}
      </Button>
      <StyledModal
        aria-label="Default Modal"
        open={isActive}
        onDismiss={close}
        overrides={{
          overlay: {
            zIndex: 60,
            stylePreset: 'overlayCustom'
          },
          panel: {
            width: {
              xs: '100%',
              sm: '100%',
              md: '80%',
              lg: '65%',
              xl: '52%'
            }
          },
          header: {
            stylePreset: 'modalHeaderCustom'
          }
        }}
        header={header ? header : 'How to play Today’s Mini Quiz'}
      >
        {modalContent}
      </StyledModal>
    </Stack>
  );
};
