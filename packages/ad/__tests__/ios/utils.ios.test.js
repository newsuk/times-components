import sharedAdInit from "../utils/ad-init";
import sharedAdInitGPT from "../utils/ad-init-gpt";
import sharedAdInitPrebid from "../utils/ad-init-prebid";
import sharedAdInitUtils from "../utils/ad-init-utils";
import sharedGenerateConfig from "../utils/generate-config.shared";
import sharedPrebidConfig from "../utils/prebid-config";

describe("ios", () => {
  sharedAdInit();
  sharedAdInitGPT();
  sharedAdInitPrebid();
  sharedAdInitUtils();
  sharedGenerateConfig();
  sharedPrebidConfig();
});
