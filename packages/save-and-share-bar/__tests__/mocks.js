/* eslint-disable import/prefer-default-export */
import { mockUserState } from "@times-components/user-state";

export const UserState = mockUserState();

jest.mock("../src/bar-item", () => "BarItem");

jest.mock("@times-components/icons", () => ({
  IconCopyLink: "IconCopyLink",
  IconEmail: "IconEmail",
  IconFacebook: "IconFacebook",
  IconSaveBookmark: "IconSaveBookmark",
  IconTwitter: "IconTwitter",
  IconActivityIndicator: "IconActivityIndicator"
}));

jest.mock("@times-components/ts-components", () => ({
  SaveStar: "SaveStar"
}));
