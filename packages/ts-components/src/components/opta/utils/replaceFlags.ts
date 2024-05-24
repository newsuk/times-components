export const replaceFlags = async (
  element: HTMLCollectionOf<Element> | undefined
) => {
  const replaceImages = await setInterval(() => {
    if (element && element.length > 0) {
      for (let optaFlagContainer of element) {
        const country =
          optaFlagContainer && (optaFlagContainer as HTMLElement).innerText;

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
