import { colours, fontFactory } from "@times-components/styleguide";

const sharedStyle = scale => ({
  MessageBarBody: {
    flex: 1,
    backgroundColor: colours.functional.articleFlagUpdated,
    height: 50,
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
});

export default sharedStyle;