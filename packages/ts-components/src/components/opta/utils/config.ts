import { injectScript } from '../../../helpers/widgets/inject-script';

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

const getStyleSheetUrl = (sport: string) => {
  switch (sport) {
    case 'cricket':
      return 'https://secure.widget.cloud.opta.net/v3/css/v3.cricket.opta-widgets.css';

    case 'rugby':
      return 'https://secure.widget.cloud.opta.net/v3/css/v3.rugby.opta-widgets.css';

    case 'football':
    default:
      return 'https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css';
  }
};

export const initStyleSheet = (sport: string) => {
  const cssUrl = getStyleSheetUrl(sport);

  if (!document.head.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', cssUrl);

    document.getElementsByTagName('head')[0].appendChild(link);
  }
};

const scriptUrl = 'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js';

export const initScript = () => injectScript(scriptUrl);

export const initElement = (name: string, args?: any, child?: HTMLElement) => {
  const element = document.createElement(name);

  if (args) {
    Object.keys(args).map(key => {
      if (args[key] !== undefined) {
        element.setAttribute(key, args[key].toString());
      }
    });
  }

  if (child) {
    element.appendChild(child);
  }

  return element;
};

export const initComponent = () => {
  if (typeof window !== 'undefined' && typeof window.Opta !== 'undefined') {
    window.Opta.start();
  }
};
