/* eslint-disable import/prefer-default-export */
import { mockUserState } from "@times-components-native/user-state";

export const UserState = mockUserState();

jest.mock("../src/bar-item", () => "BarItem");

jest.mock("@times-components-native/icons", () => ({
  IconCopyLink: "IconCopyLink",
  IconEmail: "IconEmail",
  IconFacebook: "IconFacebook",
  IconSaveBookmark: "IconSaveBookmark",
  IconTwitter: "IconTwitter"
}));

jest.mock("react-native", () => {
  const reactNativeMock = require.requireActual("react-native");
  reactNativeMock.Clipboard = {
    setString: jest.fn()
  };
  return reactNativeMock;
});
