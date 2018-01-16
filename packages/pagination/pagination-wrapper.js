import React from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";

export default Component => {
  class Helper extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;
    }

    componentWillReceiveProps(nextProps) {
      return this.setState(
        Object.assign({}, nextProps, {
          page: this.state.page
        })
      );
    }

    onChangePage = page => {
      this.setState({ page });
    };

    render() {
      return <Component {...this.state} onChangePage={this.onChangePage} />;
    }
  }

  Helper.displayName = `Pagination Helper (${getDisplayName(Component)})`;
  Helper.propTypes = {
    page: PropTypes.number
  };

  Helper.defaultProps = {
    page: 1
  };

  return Helper;
};
