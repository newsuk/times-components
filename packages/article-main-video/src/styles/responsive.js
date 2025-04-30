import styled from "styled-components";
import { breakpoints } from "@times-components/ts-styleguide";

export const ArticleMainVideoContainer = styled.div`
  background-color: #121212;
`;
export const CommentContainer = styled.div`
  background-color: #fff;
  margin: 32px auto 0;
  padding-inline: 20px;

  @media (min-width: ${breakpoints.wide}px) {
    max-width: 1144px;
  }
`;
export const VideoArticleContainer = styled.div`
  width: 100%;
  max-width: 1144px;
  margin: 0 auto;
  @media (min-width: ${breakpoints.wide}px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 24px;
  }
`;
export const ArticleLeadAssetContainer = styled.div`
  position: relative;
  width: 100%;
  & * {
    max-width: 100%;
  }
  &&& .vjs-poster::before {
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &&& .vjs-big-play-button .vjs-icon-placeholder::before,
  .vjs-big-play-button .vjs-icon-placeholder::after {
    bottom: 24px;
    left: 24px;
    width: 48px !important;
    background-size: 48px;
    background-position-y: 32px;
    z-index: 2;
    @media (min-width: ${breakpoints.medium}px) {
      background-position-y: 18px;
      background-size: 62px;
      width: 62px !important;
    }
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASOSURBVHgB7Z2/ctNKFMY/M+mveYHL5tYXSGiBQaYEZjBvEOigCemgCq6gIqSBjjgFlBgKKLFmoIbwBN7wApgnWM7R7hpZ/iPJGGs32t/MiWJsJvaX7+zZ7D81UCFKqSZdIgpBcd5chXlaZF4+pJCp6zFFTHHUaDSGqIgGVkhKsCsUbUyKtCgSWsx3fK1S0L8CCRdR9Ch+qNVwQNGGz7DbKHZXKNo0BhRbFAK+oNwQLsuAYheuo/Rve6DcZUCxBdegNyUo+sofuD0WcAF6I9vKrXQtCr/nLVSF0m3dnvKfPfwBC/UDlbZ/j2IDJ4MjilvUf5QoSWkBjXh9LK8T7AqSolVWxFICnmDxLBIlRSwsYA3Es0iUELGQgDUSzyJRUMSiAn7FySkYReHC0sobmDiFHEyZr5t4DH/m3D//5jpQ6Y7mAerNDrnw2awnZwpo2j1O3SbqDafw5qz2cF4Kc+rWXTyGNZiZhVMFNKnr94DkconUjL+bp6YwvXiA+nRZiiKhU3msKk84UOmBR4FAFkFxP/uPYw6sYYe5LOy+9bQLsw6MEMSbBxeUMRdmHRjavnyG5MDT9sHIgUpPAwoE8uCB5Mg+SKfwTQSKsm2/SVJY6RUDPxAoyqiYWAdGqJA4/oTh8Cc8wi5RGaVwpel7ePgaFzYv0vUVPCLiL044kJHyO25v3cWd23eT7z0gMd0p0/4JOEK3+wpXW9d8cCMvJmiyA50bLLVuvNq67robIxYwgqNwcflv/X90Oo/hKIIFFHCczqPHiZAOuvE8C3gGHsDisYg7Ow9c6vIkDvRq1Hn/2XOXujx+pHAWl7o83jkwjQNdHpE7L+w6VXd5vBewarwXsNlsYm/vCT7230OIf7Fq1qBnmwQ8pN2+gZcHL0jEf1ARwzV4iBBnEuGi6BIqRnIKS3jE9vY9fPn62QXxmMSBx/CAjY1zeEptnSPCWRIHHsFhuEjs7j50yXVpjm0RcZIoupy0dVVU14LE7MAYjlF116QER2s8s0QjqxKOdGUc6JoURaZn5d6hYrhr8rH/AW96r30Qj4n5i50X5lUJPVREHH+mKnvWF+EsvLPpbXpindfFhBWpxTk9SmGzXCtGoChdu8QtPZiwj0BRRjUju7yN18eENJ4PV991+yA7nBVcmE8n/SDrwFBM5iOR2UM35kDTMAYXzuYwu+FmYpuDcSHvUBIIpBlr+ywTQ/rGhR0EskzVZN5eOd7uECHAvCVj3Zr2RNhsmM9imw3NfwiprLe7yllPzp3WNPtk61yV90mD7rwX5G75N1WZ28Pabfkn8TbzXpQ7sW6qMjegEvVBQn/mXMKxJ5NILPvYE0s4eGeScPTTbyQWOPqp9OIi8wNacHw+uST2jBiJkiy0Oot/kKlQJ6GLw59hIfGWgtLHfvp6AON9uIDSR4D2lD/0lYsn+6pwCO1yoDf5SLklJKcrvyd/BkaUTuuqHemfcNOgD9Cm6KrVwKJxexxhBSx0CO2iqN83I+ClJHxDAoHlIGFuRIAV34xgpQJmMYLyKE8EvWdPQA/g2msambpyfDPXSu/e8AvQJ5cIyAKg2gAAAABJRU5ErkJggg==);
  }
  &&& .vjs-big-play-button:hover .vjs-icon-placeholder::before,
  .vjs-big-play-button:hover .vjs-icon-placeholder::after {
    opacity: 0.4;
  }
`;
export const ArticleBodyContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: ${breakpoints.wide}px) {
    margin: 0;
    width: calc(100% - 240px);
  }
`;
export const ArticleBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  & > div {
    margin: 0;
    padding: 0;
  }
  @media (min-width: ${breakpoints.medium}px) {
    padding: 24px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    padding: 24px 0;
  }
  @media (min-width: 1440px) {
    flex-direction: row;
  }
`;
export const ContentFooterContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1144px;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 24px;
  }
`;
export const SaveAndShareContainer = styled.div`
  &&& {
    margin: 8px 0 28px;
    & > div {
      padding: 0;
      align-items: flex-start;
    }
    & button {
      color: #e4e4e4;
      background-color: transparent;
      border-color: #e4e4e4;
    }
  }
`;
export const TopicsContainer = styled.nav`
  &&& {
    border-bottom: 1px solid #4e4e4e;
    border-top: 1px solid #4e4e4e;
    margin-top: 20px;
    &&& div {
      border-color: #E4E4E !important;
      color: #e4e4e4 !important;
    }
  }
`;
export const ArticleContentContainer = styled.div`
  max-width: 853px;
  width: 100%;
`;
export const ArticleContent = styled.div`
  & * {
    font-family: "Times Digital W04 Regular";
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: 0em;
    color: #aaa;
    width: 100%;
    padding: 0;
    margin-block: 16px;
  }
`;
export const ArticleHeadline = styled.h1`
  font-family: "TimesModern-Bold";
  font-size: 3.6rem;
  font-weight: 400;
  line-height: 1.125;
  letter-spacing: 0.03em;
  color: #fff;
  margin: 0;
`;
export const ArticleTitle = styled.span`
  font-family: "TimesModern-Bold";
  font-size: 2rem;
  line-height: 1.125;
  letter-spacing: 0em;
  color: #fff;
`;
export const ArticleMeta = styled.div`
  font-family: "Roboto";
  font-size: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0em;
  color: #aaa;
  margin-top: 10px;
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: 8px;
  }
`;
export const ArticleLabelContainer = styled.div`
  &&& {
    width: 100%;
    @media (min-width: ${breakpoints.wide}px) {
      margin-bottom: 10px;
    }
  }
`;
export const ArticleLabelText = styled.p`
  font-family: "Roboto";
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin: 0;
  margin-bottom: 10px;
  position: relative;
  text-transform: uppercase;
  color: ${({ $color }) => $color || "#FFF"};
  z-index: 2;
`;

export const BreadcrumbContainer = styled.div`
  & * {
    color: #fff !important;
    justify-content: center;
  }
`;
