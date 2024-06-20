function sendTrackingData(data) {
  const windowWithUtag = global.window;

  if (data && windowWithUtag.utag) {
    windowWithUtag.requestAnimationFrame(() => {
      setTimeout(() => {
        if (windowWithUtag.utag) {
          windowWithUtag.utag.link(data);
        }
      }, 0);
    });
  }
}

export default sendTrackingData;
