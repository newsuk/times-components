function sendTrackingData(data) {
    const windowWithUtag = window;

    if (data && windowWithUtag.utag) {
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (windowWithUtag.utag) {
                    windowWithUtag.utag.link(data);                    
                }
            }, 0)
        });
    }
}

export { sendTrackingData };
