const { today, fetchJSON } = require("./util");

function fetchEdition(edition, { api }) {
  return fetchJSON(`${api}/edition/${edition}?include=article`);
}

exports.getEditionData = async function getEditionData(options) {
  console.log(`Fetching edition (${options.edition})…`);

  const edition = await fetchEdition(options.edition, options);
  const ids = edition.cpi_modules.map(article => article.identifier);
  const title = `${edition.title} (${edition.cpi_updatetext})`;

  console.log(`Received edition ${title}`);

  return { ids, title };
};

exports.getPastSixDaysData = async function getPastSixDaysData(options) {
  const date = today();
  console.log(`Fetching past six days data from ${date}`);
  const pastSixDays = await fetchJSON(`${options.api}/past-six-days`);
  console.log("Retrieving article data");
  const editions = await Promise.all(
    pastSixDays.map(day => fetchEdition(day.editiondate, options))
  );
  const ids = editions.reduce(
    (acc, edition) => [
      ...acc,
      ...edition.cpi_modules.map(article => article.identifier)
    ],
    []
  );
  const title = `Past six days from ${date}`;

  return { ids, title };
};
