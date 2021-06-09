declare global {
  interface Window {
    opta_settings: {
      subscription_id: string;
      language: string;
      timezone: string;
      load_when_visible: boolean;
    };
    Opta: {
      start: () => void;
    };
  }
}

export const initSettings = () => {
  if (typeof window !== 'undefined' && !window.opta_settings) {
    window.opta_settings = {
      subscription_id: 'db98cff9f9612c01bbf3435964748e95',
      language: 'en_GB',
      timezone: 'Europe/London',
      load_when_visible: false
    };
  }
};

const scriptUrl = 'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js';

export const initScript = () => {
  if (document.body.querySelector(`script[src="${scriptUrl}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('async', 'async');
    script.setAttribute('src', scriptUrl);
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
};

export const initElement = (name: string, args?: any) => {
  const element = document.createElement(name);

  if (args) {
    Object.keys(args).map(key => {
      if (args[key]) {
        element.setAttribute(key, args[key].toString());
      }
    });
  }

  return element;
};

export const initComponent = () => {
  if (typeof window !== 'undefined' && typeof window.Opta !== 'undefined') {
    window.Opta.start();
  }
};
