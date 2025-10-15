export default defineEventHandler(async (event) => {
  const { id } = event.context.params!;

  const res = await fetch(
    `https://www.carqueryapi.com/api/0.3/?cmd=getModel&model=${id}`
  );

  const text = await res.text();
  const cleaned = text.replace(/^[^(]*\((.*)\);?$/, "$1");
  const data = JSON.parse(cleaned);

  return data;
});
