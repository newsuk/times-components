import React from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";

export default Component => {
  class Helper extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;

      this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      return this.setState(
        Object.assign({}, nextProps, {
          page: this.state.page
        })
      );
    }

    handleChangePage(event, page) {
      this.setState({ page });
      event.preventDefault();
    }

    render() {
      return (
        <Component
          {...this.state}
          onNext={this.handleChangePage}
          onPrev={this.handleChangePage}
        />
      );
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
