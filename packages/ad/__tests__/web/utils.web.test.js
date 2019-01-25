import sharedAdInit from "../utils/ad-init.web";
import sharedAdInitGPT from "../utils/ad-init-gpt";
import sharedAdInitPrebid from "../utils/ad-init-prebid.web";
import sharedAdInitUtils from "../utils/ad-init-utils";
import sharedGenerateConfig from "../utils/generate-config.shared";
import sharedPrebidConfig from "../utils/prebid-config";
import webviewSetup from "../utils/webview-event-callback-setup";

describe("web", () => {
  sharedAdInit();
  sharedAdInitGPT();
  sharedAdInitPrebid();
  sharedAdInitUtils();
  sharedGenerateConfig();
  sharedPrebidConfig();
  webviewSetup();
});
