import React, { ChangeEvent } from 'react';
import {
  TextField,
  Block,
  AssistiveText
} from 'newskit';

export interface QuestionInputProps {
  errorMessage: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionInput = ({
  errorMessage,
  value,
  onChange
}: QuestionInputProps) => {
  

  return (
    <Block>
      <TextField  
      maxLength={100}
      size="medium"
      placeholder='Type Solution Here'
      state= {errorMessage ? 'invalid' : 'valid'}
      value={value}
      onChange= {onChange}
      overrides={{
      stylePreset: "inputStyle",
      typographyPreset: 'utilityBody020',

      
      }} />
      <AssistiveText
        id="styling-overrides-at"
        overrides={{stylePreset: 'assistiveTextError',
      typographyPreset: 'utilityBody010'}}
      >
      {errorMessage}
      </AssistiveText>
  </Block>
  );
};
