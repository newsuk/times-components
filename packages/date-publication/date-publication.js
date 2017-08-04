import React from 'react';
import { Text } from 'react-native';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const styles = {
  default: {
    color: '#696969',
    fontSize: 13,
    fontFamily: 'GillSansMTStd-Medium'
  }
};

const DatePublication = ({ date, publication, style }) => {

  if (!date || !publication) {
    return null;
  }

  return (
    <Text style={[styles.default, style]}>
      {format(date, 'dddd MMMM DD YYYY')}, {publication}
    </Text>
  );
};

DatePublication.propTypes = {
  date: PropTypes.instanceOf(Date),
  publication: PropTypes.string,
  style: Text.propTypes.style
};

DatePublication.defaultProps = {
  date: null,
  publication: '',
  style: {}
};

export default DatePublication;
