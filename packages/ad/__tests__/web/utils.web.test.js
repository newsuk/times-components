import sharedAdInit from "../utils/ad-init";
import sharedAdInitADmantx from "../utils/ad-init-admantx";
import sharedAdInitGPT from "../utils/ad-init-gpt";
import sharedAdInitApsTag from "../utils/ad-init-apstag";
import sharedAdInitPrebid from "../utils/ad-init-prebid";
import sharedAdInitUtils from "../utils/ad-init-utils";
import sharedGenerateConfig from "../utils/generate-config.shared";
import sharedPrebidConfig from "../utils/prebid-config";
import webviewSetup from "../utils/webview-event-callback-setup";
import logger from "../utils/logger";

describe("web", () => {
  sharedAdInit();
  sharedAdInitADmantx();
  sharedAdInitGPT();
  sharedAdInitPrebid();
  sharedAdInitUtils();
  sharedGenerateConfig();
  sharedPrebidConfig();
  sharedAdInitApsTag();
  webviewSetup();
  logger();
});
