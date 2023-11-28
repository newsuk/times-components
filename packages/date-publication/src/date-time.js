import { Component } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import addMinutes from "date-fns/addMinutes";
import { getUTCTime, isBST, isLondonTimezone } from "./date";

class DatePublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timezone: ""
    };
    this.updateTimezone = this.updateTimezone.bind(this);
  }

  componentDidMount() {
    this.updateTimezone();
  }

  updateTimezone() {
    const { date } = this.props;

    const dateUTC = getUTCTime(date);
    if (!isLondonTimezone()) {
      this.setState({ timezone: isBST(dateUTC) ? " BST" : " GMT" });
    }
  }

  render() {
    const { children, showDay } = this.props;
    let { date = new Date() } = this.props;
    const { timezone } = this.state;
    const datetimeUTC = getUTCTime(date);
    const isDateBST = isBST(datetimeUTC);
    const offset = isDateBST ? 60 : 0;
    const datetimeLondonTimezone = addMinutes(datetimeUTC, offset);

    if (date === undefined) {
      date = new Date();
    }
    const baseFormatString = "MMMM dd yyyy, h.mmaaa";
    const formatString = showDay
      ? `EEEE ${baseFormatString}`
      : baseFormatString;

    const formattedString = `${format(
      datetimeLondonTimezone,
      formatString
    )}${timezone}`;
    return children(formattedString);
  }
}

DatePublication.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  date: PropTypes.string.isRequired,
  showDay: PropTypes.bool
};

DatePublication.defaultProps = {
  showDay: true
};

export default DatePublication;
