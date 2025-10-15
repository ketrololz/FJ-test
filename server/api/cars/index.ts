export default defineEventHandler(async (event) => {
  const { make = "toyota", year = "2020" } = getQuery(event);

  const res = await fetch(
    `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&year=${year}`
  );

  const text = await res.text();
  const cleaned = text.replace(/^[^(]*\((.*)\);?$/, "$1");
  const data = JSON.parse(cleaned);

  return data.Trims;
});
