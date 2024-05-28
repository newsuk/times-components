export const replaceNationalTeamDetails = (
  element: HTMLCollectionOf<Element> | undefined
) => {
  let count = 0;
  const replaceImages = setInterval(() => {
    if (count >= 5) {
      clearInterval(replaceImages);
    }
    count++;

    if (element && element.length > 0) {
      for (let optaFlagContainer of element) {
        const country = (optaFlagContainer as HTMLElement).innerText;

        if (country && country.includes('Third Place')) {
          (optaFlagContainer as HTMLElement).innerText = "TBD"
        }

        if (!optaFlagContainer.querySelector('img')) {
          const countryImg = document.createElement('img');
          countryImg.setAttribute(
            'src',
            `https://nuk-tnl-editorial-prod-staticassets.s3.eu-west-1.amazonaws.com/opta/euro-flags/${country}.svg`
          );
          countryImg.setAttribute('onerror', 'this.remove()');
          countryImg.classList.add('team-flag');

          optaFlagContainer.prepend(countryImg);
        }
      }
      clearInterval(replaceImages);
    }
  }, 500);
};
