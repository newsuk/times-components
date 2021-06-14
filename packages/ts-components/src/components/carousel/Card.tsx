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
}> = ({ children, isLarge, data, isSmall }) => {
  return (
    <>
      <CardContainer isLarge={isLarge} isSmall={isSmall}>
        <MobileCardContent>
          <MobileCopyCreditContainer>
            <Credit>{data.paneldata.credit}</Credit>
            <Copy isLarge={isLarge}>{data.paneldata.copy}</Copy>
          </MobileCopyCreditContainer>
          <div>
            <CardButtonContainer
              isLarge={isLarge}
              style={{ justifyContent: 'flex-end' }}
            >
              {/* @ts-ignore */}
              {children}
            </CardButtonContainer>
          </div>
        </MobileCardContent>
        <DesktopCardContent>
          <div>
            <Label>{data.paneldata.label}</Label>
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
