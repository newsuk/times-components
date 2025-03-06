const CircleArrow = () =>
  `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="allFixturesIcon">
    <rect x="0.859375" y="0.5" width="23" height="23" rx="11.5" />
    <path d="M15.7734 11.5254C15.7702 11.6263 15.7507 11.7191 15.7148 11.8037C15.6758 11.8883 15.6172 11.9697 15.5391 12.0479L11.7793 15.7246C11.6556 15.8483 11.5042 15.9102 11.3252 15.9102C11.2015 15.9102 11.0908 15.8809 10.9932 15.8223C10.8923 15.7637 10.8125 15.6839 10.7539 15.583C10.6921 15.4854 10.6611 15.3763 10.6611 15.2559C10.6611 15.0736 10.7295 14.9141 10.8662 14.7773L14.2109 11.5254L10.8662 8.27344C10.7295 8.13346 10.6611 7.97396 10.6611 7.79492C10.6611 7.67122 10.6921 7.56055 10.7539 7.46289C10.8125 7.36523 10.8923 7.28711 10.9932 7.22852C11.0908 7.16992 11.2015 7.14062 11.3252 7.14062C11.5042 7.14062 11.6556 7.20247 11.7793 7.32617L15.5391 11.0029C15.6204 11.0811 15.6807 11.1624 15.7197 11.2471C15.7555 11.335 15.7734 11.4277 15.7734 11.5254Z" />
  </svg>`;

export const addFixturesPageLink = (element: Element, pageUrl: string = '') => {
  const fixturesPageUrlWrapper = Object.assign(document.createElement('div'), {
    className: 'fixtures-page-link Opta-fixture'
  });

  const link = Object.assign(document.createElement('a'), {
    href: pageUrl
  });

  const linkText = Object.assign(document.createElement('span'), {
    textContent: 'Full Fixtures & Results'
  });

  link.appendChild(linkText);
  link.insertAdjacentHTML('beforeend', CircleArrow());

  fixturesPageUrlWrapper.appendChild(link);
  element.appendChild(fixturesPageUrlWrapper);
};
