import format from "date-fns/format";
import addMinutes from "date-fns/add_minutes";
import PropTypes from "prop-types";
import React from "react";
import { isDate } from "util";

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
    const userOffset = new Date().getTimezoneOffset();
    const currentOffset = this.props.isGMT ? 0 : 60;
    if (userOffset !== currentOffset) {
      this.setState({ tz: this.props.isDateGMT ? "GMT" : "BST" }); // eslint-disable-line react/no-did-mount-set-state
    }
  }
  render() {
    const { date, isDateGMT, publication } = this.props;
    const dateJs = new Date(date);
    const datetimeUTC = new Date(
      dateJs.getUTCFullYear(),
      dateJs.getUTCMonth(),
      dateJs.getUTCDate(),
      dateJs.getUTCHours(),
      dateJs.getUTCMinutes()
    );

    const offset = isDateGMT ? 0 : 60;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);
    return `${format(datetimeLondonTimezone, "dddd MMMM DD YYYY, hh:mma")} ${
      this.state.tz
    }, ${publications[publication]}`;
  }
}

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  isDateGMT: PropTypes.bool,
  isGMT: PropTypes.bool,
  publication: PropTypes.oneOf(Object.keys(publications))
};

DatePublication.defaultProps = {
  publication: "TIMES",
  isGMT: true,
  isDateGMT: true
};

export default DatePublication;
