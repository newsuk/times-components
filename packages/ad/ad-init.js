// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

/* eslint-env browser */
const adInit = args => {
  const { el, data, window, globals: { googletag }, renderComplete } = args;

  let executed = false;
  return {
    pageInit() {
      googletag.cmd.push(() => {
        const pubads = googletag.pubads();
        Object.entries(data.pageTargeting || {}).forEach(entry =>
          pubads.setTargeting(entry[0], entry[1])
        );
        googletag.pubads().disableInitialLoad();
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });

      window.setTimeout(() => {
        googletag.cmd.push(() => {
          googletag.display(data.config.code);
          googletag.pubads().refresh();
        });
      }, 0);
    },

    slotInit() {
      googletag.cmd.push(() => {
        const slotName = `/${data.networkId}/${data.adUnit}/${data.code}`;

        const slot = googletag.defineSlot(
          slotName,
          data.config.sizes,
          data.config.code
        );
        if (!slot) {
          throw new Error(
            `Ad slot ${
              slotName
            } could not be defined, probably it was already defined`
          );
        }
        slot.addService(googletag.pubads());

        el.innerHTML = `
          <div
            id="${data.code}"
            style="display: table-cell; vertical-align: middle"
          ></div>
        `;
        el.style.display = "table";
        el.style.margin = "0 auto";

        const mapping = googletag.sizeMapping();
        data.sizingMap.forEach(size =>
          mapping.addSize([size.width, size.height], size.sizes)
        );
        slot.defineSizeMapping(mapping.build());

        Object.entries(data.slotOptions || {}).forEach(entry =>
          slot.setTargeting(entry[0], entry[1])
        );

        renderComplete();
      });
    },

    execute() {
      if (executed) throw new Error("execute() has already been called");
      executed = true;
      if (!window.globalAdInitComplete) {
        window.globalAdInitComplete = true;
        this.pageInit();
      }
      this.slotInit();
    }
  };
};

export default adInit;
