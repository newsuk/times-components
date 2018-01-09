import format from "date-fns/format";
import addHours from "date-fns/add_hours";
import PropTypes from "prop-types";

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const DatePublication = ({ date, publication, isGMT }) => {
  const dateJs = new Date(date);
  const datetimeUTC = new Date(
    dateJs.getUTCFullYear(),
    dateJs.getUTCMonth(),
    dateJs.getUTCDate(),
    dateJs.getUTCHours(),
    dateJs.getUTCMinutes()
  );
  let datetimeLondonTimezone = datetimeUTC;
  if (!isGMT) {
    datetimeLondonTimezone = addHours(datetimeUTC, 1);
  }
  return `${format(datetimeLondonTimezone, "dddd MMMM DD YYYY, hh:mma")} ${
    isGMT ? "GMT" : "BST"
  }, ${publications[publication]}`;
};

DatePublication.propTypes = {
  date: PropTypes.string.isRequired,
  isGMT: PropTypes.bool,
  publication: PropTypes.oneOf(Object.keys(publications))
};

DatePublication.defaultProps = {
  publication: "TIMES",
  isGMT: false
};

export default DatePublication;
