import { initSettings, initStyleSheet, initElement } from '../config';

describe('Opta config', () => {
  it('should initialise opta settings', async () => {
    initSettings();
    expect(window.opta_settings.subscription_id).toEqual(
      'db98cff9f9612c01bbf3435964748e95'
    );
  });

  it('should initialise football stylesheet', async () => {
    initStyleSheet('football');
    const element = document.head.querySelector(
      'link[href="https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css"]'
    );
    expect(element).toBeTruthy();
  });

  it('should initialise rugby stylesheet', async () => {
    initStyleSheet('rugby');
    const element = document.head.querySelector(
      'link[href="https://secure.widget.cloud.opta.net/v3/css/v3.rugby.opta-widgets.css"]'
    );
    expect(element).toBeTruthy();
  });

  it('should create the correct element', async () => {
    const element = initElement(
      'opta-widget',
      { sport: 'football' },
      initElement('opta-sub-widget')
    );

    expect(element.nodeName).toEqual('OPTA-WIDGET');
    expect(element.getAttribute('sport')).toEqual('football');
    expect(element.childNodes[0].nodeName).toEqual('OPTA-SUB-WIDGET');
  });
});
