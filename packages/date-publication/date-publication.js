import format from "date-fns/format";
import addMinutes from "date-fns/add_minutes";
import PropTypes from "prop-types";
import React from "react";
import { isLondonTimezone, isBST, getUTCTime } from "./date-helper";

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
  }

  componentDidMount() {
    const dateUTC = getUTCTime(this.props.date);
    if (!isLondonTimezone()) {
      this.setState({ tz: isBST(dateUTC) ? " BST" : " GMT" }); // eslint-disable-line react/no-did-mount-set-state
    }
  }
  render() {
    const { date, publication } = this.props;
    const datetimeUTC = getUTCTime(date);
    const isDateGMT = !isBST(datetimeUTC);
    const offset = isDateGMT ? 0 : 60;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);
    return `${format(datetimeLondonTimezone, "dddd MMMM DD YYYY, hh:mma")}${
      this.state.tz
    }, ${publications[publication]}`;
  }
}

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  publication: PropTypes.oneOf(Object.keys(publications))
};

DatePublication.defaultProps = {
  publication: "TIMES"
};

export default DatePublication;
