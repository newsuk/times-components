import PropTypes from "prop-types";

const articleHeaderPropTypes = {
  backgroundColour: PropTypes.shape({
    rgba: PropTypes.shape({
      alpha: PropTypes.number,
      blue: PropTypes.number,
      green: PropTypes.number,
      red: PropTypes.number
    })
  }),
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  textColour: PropTypes.shape({
    rgba: PropTypes.shape({
      alpha: PropTypes.number,
      blue: PropTypes.number,
      green: PropTypes.number,
      red: PropTypes.number
    })
  })
};

const articleHeaderDefaultProps = {
  backgroundColour: {
    rgba: {
      alpha: 1,
      blue: 255,
      green: 255,
      red: 255
    }
  },
  flags: null,
  hasVideo: false,
  label: null,
  standfirst: null,
  textColour: {
    rgba: {
      alpha: 1,
      blue: 0,
      green: 0,
      red: 0
    }
  }
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
