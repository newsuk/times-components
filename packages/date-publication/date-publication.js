import format from "date-fns/format";
import addMinutes from "date-fns/add_minutes";
import PropTypes from "prop-types";
import React from "react";
import {
  isLondonTimezone,
  isBST,
  getUTCTime
} from "@times-components/utils/date";

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

class DatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tz: ""
    };
    this.updateTimezone = this.updateTimezone.bind(this);
  }
  componentDidMount() {
    this.updateTimezone();
  }
  updateTimezone() {
    const dateUTC = getUTCTime(this.props.date);
    if (!isLondonTimezone()) {
      this.setState({ tz: isBST(dateUTC) ? " BST" : " GMT" });
    }
  }
  render() {
    const { date, publication, showPublication } = this.props;
    const datetimeUTC = getUTCTime(date);
    const isDateBST = isBST(datetimeUTC);
    const offset = isDateBST ? 60 : 0;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);
    const publicationString = showPublication
      ? `, ${publications[publication]}`
      : ``;
    return `${format(datetimeLondonTimezone, "dddd MMMM DD YYYY, hh:mma")}${
      this.state.tz
    }${publicationString}`;
  }
}

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  publication: PropTypes.oneOf(Object.keys(publications)),
  showPublication: PropTypes.bool
};

DatePublication.defaultProps = {
  publication: "TIMES",
  showPublication: true
};

export default DatePublication;
