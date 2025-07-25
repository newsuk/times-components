export const cricketScript = `
  Opta.events.subscribe('widget.drawn', function (widget) {
    const placeholder = document.querySelector('.opta-placeholder');
    const container = Opta(widget.widget.wid + ' .Opta-scorecard');
    const hasEvent = !container[0].innerText.includes('No data found');
    if (hasEvent) {
      window.postMessage('enableButton', "*");
    }

    if (placeholder) {
      placeholder.style.display = 'none';
    }
  });
`;

export const footballRugbyScript = `
  Opta.events.subscribe('widget.drawn', function (widget) {
    const placeholder = document.querySelector('.opta-placeholder');

    Opta(widget.widget.wid + ' .Opta-Events').each(function (num, element) {
      const team = Opta(element);
      const hasEvent = team[0].innerHTML !== "";
      if (hasEvent) {
        window.postMessage('enableButton', "*");
      }
    });

    if (placeholder) {
      placeholder.style.display = 'none';
    }
  });
`;

export const hasMatchEvents = (isCricket?: boolean) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = isCricket ? cricketScript : footballRugbyScript;

  document.body.appendChild(script);
};
