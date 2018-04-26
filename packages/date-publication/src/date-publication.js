import { Component } from "react";
import format from "date-fns/format";
import addMinutes from "date-fns/add_minutes";
import PropTypes from "prop-types";
import { isLondonTimezone, isBST, getUTCTime } from "./date";

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

class DatePublication extends Component {
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
    const { date, publication, showDay } = this.props;
    const datetimeUTC = getUTCTime(date);
    const isDateBST = isBST(datetimeUTC);
    const offset = isDateBST ? 60 : 0;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);
    const formatString = showDay
      ? "dddd MMMM DD YYYY, hh:mma"
      : "MMMM DD YYYY, hh:mma";
    const publicationString = publication
      ? `, ${publications[publication]}`
      : ``;
    return `${format(datetimeLondonTimezone, formatString)}${this.state.tz}${
      publicationString
    }`;
  }
}

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  publication: PropTypes.oneOf(Object.keys(publications)),
  showDay: PropTypes.bool
};

DatePublication.defaultProps = {
  publication: null,
  showDay: true
};

export default DatePublication;
