import format from "date-fns/format";
import React from "react";
import PropTypes from "prop-types";

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};
class DatePublication extends React.Component {
  constructor(props) {
    super(props);
    const offset = new Date().getTimezoneOffset();
    this.state = {
      gmt: offset !== 0 ? " GMT," : ","
    };
  }
  render() {
    const { date, publication } = this.props;
    // use the date as an UTC/GMT date (due to date parse behaviour)
    const UTCDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    );
    return `${format(UTCDate, "dddd MMMM DD YYYY, hh:mma")}${this.state.gmt}${
      publications[publication]
    }`;
  }
}

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  publication: PropTypes.oneOf(Object.keys(publications))
};

DatePublication.defaultProps = {
  publication: "TIMES"
};

export default DatePublication;
