import { colours, fontFactory } from "@times-components/styleguide";

const height = 50

const sharedStyle = scale => ({
  MessageBarBody: {
    width: '100%',
    backgroundColor: colours.functional.articleFlagUpdated,
    height,
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  MessageBarText: {
    marginLeft: 20,
    color: colours.functional.white,
    ...fontFactory({
      scale,
      font: 'headline',
      fontSize: 'secondary'
    })
  },
  MessageBarCloseButton: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 'auto',
    marginRight: 20,
    borderRadius: 28 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  MessageQueue: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    width: '100%',
    height,
    zIndex: 10,
    flexDirection: 'row'
  }
});

export default sharedStyle;