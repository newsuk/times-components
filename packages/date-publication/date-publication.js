import format from "date-fns/format";
import PropTypes from "prop-types";

const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const DatePublication = ({ date, publication }) =>
  `${format(date, "dddd MMMM DD YYYY")}, ${publications[publication]}`;

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  publication: PropTypes.oneOf(Object.keys(publications))
};

DatePublication.defaultProps = {
  publication: "TIMES"
};

export default DatePublication;
