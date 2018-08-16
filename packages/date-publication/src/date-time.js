import { Component } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import addMinutes from "date-fns/add_minutes";
import { getUTCTime, isBST, isLondonTimezone } from "./date";

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
    const { children, date, showDay } = this.props;
    const datetimeUTC = getUTCTime(date);
    const isDateBST = isBST(datetimeUTC);
    const offset = isDateBST ? 60 : 0;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);
    const formatString = showDay
      ? "dddd MMMM DD YYYY, hh:mma"
      : "MMMM DD YYYY, hh:mma";

    return children(
      `${format(datetimeLondonTimezone, formatString)}${this.state.tz}`
    );
  }
}

DatePublication.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
  showDay: PropTypes.bool
};

DatePublication.defaultProps = {
  showDay: true
};

export default DatePublication;
