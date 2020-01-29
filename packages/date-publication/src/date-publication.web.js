import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DateTime from "./date-time";
import {
  publications,
  getPublicationComma,
  getPublicationName
} from "./publication";

const DatePublication = ({ publication, ...props }) => (
  <DateTime {...props}>
    {dateTime => (
      <Fragment>
        <time dateTime={props.date}>
          {dateTime}
          {getPublicationComma(publication)}
        </time>
        {publication ? (
          <PublicationName>{getPublicationName(publication)}</PublicationName>
        ) : null}
      </Fragment>
    )}
  </DateTime>
);

const PublicationName = styled.span`
  display: inline-block;
`;

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  publication: PropTypes.oneOf(Object.keys(publications)),
  showDay: PropTypes.bool
};

DatePublication.defaultProps = { ...DateTime.defaultProps, publication: null };

export default DatePublication;
