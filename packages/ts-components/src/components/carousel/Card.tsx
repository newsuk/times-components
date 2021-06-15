import React from 'react';
import {
  CardContainer,
  Credit,
  MobileCardContent,
  MobileCopyCreditContainer,
  Copy,
  CardButtonContainer,
  DesktopCardContent,
  Label,
  Headline,
  CreditButtonContainer
} from './styles';
import { DataObj } from './GalleryCarousel';

export const Card: React.FC<{
  isLarge: boolean;
  isSmall: boolean;
  data: DataObj;
  sectionColour: string;
}> = ({ children, isLarge, data, isSmall, sectionColour }) => {
  return (
    <>
      <CardContainer isLarge={isLarge} isSmall={isSmall}>
        <MobileCardContent>
          <MobileCopyCreditContainer>
            <Credit>{data.paneldata.credit}</Credit>
            <Copy data-testid="Copy" isLarge={isLarge}>{data.paneldata.copy}</Copy>
          </MobileCopyCreditContainer>
            <CardButtonContainer
              isLarge={isLarge}
              style={{ justifyContent: 'flex-end' }}
            >
              {children}
            </CardButtonContainer>
        </MobileCardContent>
        <DesktopCardContent>
          <div>
            <Label sectionColour={sectionColour}>{data.paneldata.label}</Label>
            <Headline>{data.paneldata.headline}</Headline>
            <Copy isLarge={isLarge}>{data.paneldata.copy}</Copy>
            {!isLarge && window.innerWidth >= 1024 ? (
              <Credit>{data.paneldata.credit}</Credit>
            ) : null}
            </div>
          <CreditButtonContainer>
            {window.innerWidth < 1024 || isLarge ? (
              <Credit>{data.paneldata.credit}</Credit>
            ) : null}
            {children}
          </CreditButtonContainer>
        </DesktopCardContent>
      </CardContainer>
    </>
  );
};
