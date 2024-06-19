export type TrackingData = Record<string, string | number | boolean | object>;
export interface WindowWithUtag extends Window {
    utag:
        | {
              link: (data: TrackingData) => void;
          }
        | undefined;
}

function sendTrackingData(data?: TrackingData) {
    const windowWithUtag = window as any as WindowWithUtag;

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
