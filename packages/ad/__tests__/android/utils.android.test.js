import sharedAdInit from "../utils/ad-init";
import sharedAdInitGPT from "../utils/ad-init-gpt";
import sharedAdInitPrebid from "../utils/ad-init-prebid";
import sharedAdInitUtils from "../utils/ad-init-utils";
import sharedPrebidConfig from "../utils/prebid-config";
import sharedGenerateConfig from "../utils/generate-config.shared";

describe("android", () => {
  sharedAdInit();
  sharedAdInitGPT();
  sharedAdInitPrebid();
  sharedAdInitUtils();
  sharedPrebidConfig();
  sharedGenerateConfig();
});
